<template>
  <div class="board-detail-wrapper">
    <!-- 게시글 상세 영역 -->
    <div class="detail-wrapper">
      <!-- 게시글 제목 작성자 작성일시 -->
      <div class="detail-header-wrapper">
        <span>{{ board.title }}</span>
        <div>
          <div>
            <span>{{ board.nickName }}</span> | <span>{{ board.regDate }}</span> |
            <span>조회수 : {{ board.hit }}</span>
          </div>
          <div>
            <button v-if="!checkingLike" @click="registLike" class="board-like-btn">
              <font-awesome-icon icon="fa-regular fa-thumbs-up" class="fa-2x" />
            </button>
            <button v-else-if="checkingLike" @click="deleteLike" class="board-unlike-btn">
              <font-awesome-icon icon="fa-solid fa-thumbs-up" class="fa-2x" />
            </button>
            <span class="like-user-count" @click="(id) => getLikeUserFunc(board.id)"
              >{{ likeCount }}
              <div v-if="isLikeUserOpen" class="like-user-box">
                <span class="like-user-header">좋아요 목록</span>
                <span v-for="(user, index) in likeUser" :key="index" class="like-user-list">{{ user }}</span>
              </div>
            </span>
          </div>
        </div>
      </div>
      <!-- 게시글 내용 -->
      <div class="detail-content-wrapper"><p v-html="board.content"></p></div>
    </div>
    <!-- 수정 삭제 영역 -->
    <div class="board-modify-delete-wrapper">
      <div v-if="loginId != null && loginId === board.userId">
        <!-- <div v-if="isWriter"> -->
        <button class="board-modify-btn" @click="moveModifyBoard">수정</button>
        <button class="board-delete-btn" @click="deleteBoard">삭제</button>
        <button class="board-list-btn" @click="moveListBoard">목록</button>
      </div>
      <div v-else>
        <button class="board-list-btn" @click="moveListBoard">목록</button>
      </div>
    </div>
    <!-- 댓글 영역 -->
    <div class="board-comments-wrapper">
      <!-- 댓글 쓰는 영역 : 로그인한 사용자에게만 보이게 하기 -->
      <div class="board-comments-write-wrapper" v-if="loginId != null">
        <textarea placeholder="댓글을 입력하세요." v-model="reply.content"></textarea>
        <div><button @click="registReply">댓글 등록</button></div>
      </div>
      <!-- 댓글 보여주는 영역 -->
      <div class="board-comments-show-wrapper">
        <board-comment
          v-for="(comment, index) in comments"
          :key="index"
          :idx="index"
          :comment="comment"
          @changData="changData"
        />
      </div>
    </div>
  </div>
</template>

<script type="module">
import BoardComment from "./BoardComment.vue";
import { getBoardDetail, deleteBoard, getComment, writeComment } from "@/api/board";
import { registLike, deleteLike, getLikeUser, getCountLike } from "@/api/like";

import { apiInstance } from "@/api/index";
const api = apiInstance();

export default {
  name: "BoardDetail",
  components: {
    BoardComment,
  },

  data() {
    return {
      board: {},
      comments: [],
      reply: {
        boardId: null,
        userId: null,
        content: "",
      },
      loginId: null,
      sendinglike: {},
      checkingLike: null,
      likeCount: 0,
      likeUser: [],
      isLikeUserOpen: false,
    };
  },

  created() {
    if (localStorage.getItem("loginUser") != null) {
      const id = JSON.parse(localStorage.getItem("loginUser")).userId;
      this.loginId = id;
      this.sendinglike.userId = this.loginId;
      this.sendinglike.boardId = this.$route.params.id;
    }

    getBoardDetail(
      this.$route.params.id,
      ({ data }) => {
        if (data.flag === "success") {
          this.board = data.data[0];
          this.board.content = this.board.content.split("\n").join("<br />");
          // console.log(data.data[0]);
        } else {
          console.log("Board 상세보기 오류: ", data.data[0].msg);
        }
      },
      (error) => {
        console.log("Board 상세보기 오류 : " + error);
      }
    );

    getComment(
      this.$route.params.id,
      ({ data }) => {
        if (data.flag === "success") {
          this.comments = data.data;
          // console.log(data.data);
        } else {
          console.log("Comment 리스트 불러오기 오류: ", data.data[0].msg);
        }
      },
      (error) => {
        console.log("Comment 리스트 불러오기 오류 : " + error);
      }
    );

    const getLike = async (param) => {
      try {
        let data = await api.post(`/like/check`, param);
        data = data.data;
        if (data.flag === "success") {
          if (data.data[0] === 0) {
            // 좋아요 표시를 하지 않은 게시글
            this.checkingLike = false;
          } else {
            // 좋아요 표시를 한 게시글
            this.checkingLike = true;
          }
        } else {
          console.log("like board 존재 여부 확인 오류: ", data.data[0].msg);
        }

        data = await api.get(`/like/countBoard/${this.sendinglike.boardId}`);
        data = data.data;
        if (data.flag === "success") {
          this.likeCount = data.data[0];
        }
      } catch (error) {
        console.log("Board 리스트 : ", error);
      }
    };

    getLike(this.sendinglike);
  },
  methods: {
    getLikeUserFunc(id) {
      this.isLikeUserOpen = !this.isLikeUserOpen;

      if (this.isLikeUserOpen) {
        getLikeUser(
          id,
          ({ data }) => {
            if (data.flag === "success") {
              this.likeUser = data.data;
            }
          },
          (error) => {
            console.log("좋아요 유저 불러오기 오류 : " + error);
          }
        );
      }
    },
    moveModifyBoard() {
      this.$router.push({
        name: "boardmodify",
        params: { id: this.board.id },
      });
    },
    deleteBoard() {
      if (confirm("정말 삭제하시겠습니까?")) {
        // 확인 (예) 버튼 클릭 시
        deleteBoard(
          this.board.id,
          ({ data }) => {
            if (data.flag === "success") {
              this.$router.push({ name: "boardlist" });
            } else {
              console.log("Board 게시글 삭제 오류: ", data.data[0].msg);
            }
          },
          (error) => {
            console.log("Board 게시글 삭제 오류 : " + error);
          }
        );
      } else {
        // 취소 (아니요) 버튼 클릭 시
      }
    },
    moveListBoard() {
      if (this.$route.params.pass === "board") {
        this.$router.push({ name: "boardlist" });
      } else {
        this.$router.push({ name: "likelist" });
      }
    },
    registReply() {
      this.reply.boardId = this.board.id;
      this.reply.userId = this.loginId;

      writeComment(
        this.reply,
        ({ data }) => {
          if (data.flag === "success") {
            this.reply.content = "";
            this.$router.go();
          } else {
            console.log("댓글 등록 오류: ", data.data[0].msg);
          }
        },
        (error) => {
          console.log("댓글 등록 오류 : " + error);
        }
      );
    },
    changData(idx, content) {
      this.comments[idx].content = content.content;
    },
    registLike() {
      registLike(
        this.sendinglike,
        ({ data }) => {
          if (data.flag === "success") {
            getCountLike(
              this.sendinglike.boardId,
              ({ data }) => {
                if (data.flag === "success") {
                  this.likeCount = data.data[0];
                  this.checkingLike = true;
                }
              },
              (error) => {
                console.log("like 갯수 가져오기 오류 : " + error);
              }
            );
          } else {
            console.log("like board 등록 오류: ", data.data[0].msg);
          }
        },
        (error) => {
          console.log("like board 등록 오류 : " + error);
        }
      );
    },

    deleteLike() {
      deleteLike(
        this.sendinglike.boardId,
        this.sendinglike.userId,
        ({ data }) => {
          if (data.flag === "success") {
            getCountLike(
              this.sendinglike.boardId,
              ({ data }) => {
                if (data.flag === "success") {
                  this.likeCount = data.data[0];
                  this.checkingLike = false;
                }
              },
              (error) => {
                console.log("like 갯수 가져오기 오류 : " + error);
              }
            );
          } else {
            console.log("like board 해제 오류: ", data.data[0].msg);
          }
        },
        (error) => {
          console.log("like board 해제 오류 : " + error);
        }
      );
    },
  },
};
</script>

<style scoped>
.board-detail-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.detail-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.detail-header-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 25px 30px;
  border-top: 2px solid #222222;
  border-bottom: 1px solid #e5e5e5;
  background: #fafafa;
}

.detail-header-wrapper > div {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}

.detail-header-wrapper > span {
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.detail-header-wrapper > div > div > span {
  color: #666;
  font-size: 0.9rem;
  font-weight: bold;
}

.detail-content-wrapper {
  width: 100%;
  height: 400px;
  padding: 25px 40px;
  color: #4f5a66;
  font-size: 0.9rem;
  border-bottom: 1px solid #e3e7eb;
  overflow-y: scroll;
}

.detail-content-wrapper::-webkit-scrollbar {
  width: 8px;
}

.detail-content-wrapper::-webkit-scrollbar-thumb {
  height: 30%;
  background: #696c73;
  border-radius: 10px;
}

.detail-content-wrapper::-webkit-scrollbar-track {
  background: none;
}

.board-modify-delete-wrapper {
  width: 100%;
  margin-top: 30px;
  text-align: right;
}

.board-modify-delete-wrapper > div > button {
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
}

.board-modify-delete-wrapper > div > input {
  margin-right: 10px;
  border: 1px solid darkgray;
  padding: 5px;
  outline: none;
  border-radius: 5px;
  font-size: 0.9rem;
}

.board-modify-btn {
  background: #3c90e2;
  margin-right: 10px;
}

.board-delete-btn {
  background: #c82333;
  margin-right: 10px;
}

.board-list-btn {
  background: #218838;
}

.board-comments-wrapper {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
}

.board-comments-write-wrapper {
  width: 100%;
  padding: 20px;
  background: #fafafa;
  border: 1px solid #e3e7eb;
}

.board-comments-write-wrapper > textarea {
  width: 100%;
  height: 150px;
  border: 1px solid #e3e7eb;
  padding: 15px;
  background: #fff;
  font-size: 0.9rem;
  outline: none;
  resize: none;
}

.board-comments-write-wrapper > div {
  text-align: right;
}

.board-comments-write-wrapper > div > button {
  background: #3c90e2;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
}

.board-comments-show-wrapper {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 100px;
}

.board-like-btn,
.board-unlike-btn {
  border: none;
  background: none;
}

.like-user-count {
  font-size: 1.2rem;
  margin-left: 20px;
  cursor: pointer;
  position: relative;
}

.like-user-box {
  position: absolute;
  top: 40px;
  width: 180px;
  height: 200px;
  background: white;
  border-radius: 5px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
}

.like-user-box::-webkit-scrollbar {
  width: 8px;
}

.like-user-box::-webkit-scrollbar-thumb {
  height: 30%;
  background: #696c73;
  border-radius: 10px;
}

.like-user-box::-webkit-scrollbar-track {
  background: none;
}

.like-user-header {
  font-size: 1.1rem;
  color: black;
  margin-bottom: 10px;
  background: linear-gradient(to top, yellow 50%, transparent 50%);
}
</style>
