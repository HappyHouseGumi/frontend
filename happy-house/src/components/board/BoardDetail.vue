<template>
  <div class="board-detail-wrapper">
    <!-- 게시글 상세 영역 -->
    <div class="detail-wrapper">
      <!-- 게시글 제목 작성자 작성일시 -->
      <div class="detail-header-wrapper">
        <span>{{ board.title }}</span>
        <div>
          <span>{{ board.nickName }}</span> | <span>{{ board.regDate }}</span> |
          <span>{{ board.hit }}</span>
        </div>
        <button @click="registLike" class="board-delete-btn">좋아요</button>
      </div>
      <!-- 게시글 내용 -->
      <div class="detail-content-wrapper">{{ board.content }}</div>
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
import { registLike } from "@/api/like";

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
    };
  },

  created() {
    if (localStorage.getItem("loginUser") != null) {
      const id = JSON.parse(localStorage.getItem("loginUser")).userId;
      this.loginId = id;
    }

    getBoardDetail(
      this.$route.params.id,
      ({ data }) => {
        if (data.flag === "success") {
          this.board = data.data[0];
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
  },

  mounted() {},

  methods: {
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
              alert("글 삭제 성공");
              this.moveListBoard();
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
      this.$router.push({ name: "boardlist" });
    },
    registReply() {
      if (confirm("댓글을 등록하시겠습니까?")) {
        this.reply.boardId = this.board.id;
        this.reply.userId = this.loginId;
        writeComment(
          this.reply,
          ({ data }) => {
            if (data.flag === "success") {
              alert("댓글 등록 성공");
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
      } else {
        //
      }
    },
    changData(idx, content) {
      this.comments[idx].content = content.content;
    },
    registLike() {
      let sendinglike = {};
      sendinglike.boardId = this.board.id;
      sendinglike.userId = this.loginId;
      registLike(
        sendinglike,
        ({ data }) => {
          if (data.flag === "success") {
            alert("like board 등록 성공");
          } else {
            console.log("like board 등록 오류: ", data.data[0].msg);
          }
        },
        (error) => {
          console.log("like board 등록 오류 : " + error);
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

.detail-header-wrapper > span {
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.detail-header-wrapper > div > span {
  color: #666;
  font-size: 0.9rem;
  font-weight: bold;
}

.detail-content-wrapper {
  width: 100%;
  padding: 25px 40px;
  color: #4f5a66;
  font-size: 0.9rem;
  border-bottom: 1px solid #e3e7eb;
}

.board-modify-delete-wrapper {
  width: 100%;
  margin-top: 30px;
  text-align: right;
}

.board-modify-delete-wrapper > div > button {
  color: white;
  font-weight: bold;
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
  font-weight: bold;
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
</style>
