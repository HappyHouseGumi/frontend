<template>
  <div>
    게시글 아이디 ------ {{ board.id }}, <br />
    게시글 분류 ------ {{ board.subject }}, <br />
    게시글 제목 ------ {{ board.title }}, <br />
    게시글 내용 ------ {{ board.content }}, <br />
    사용자 닉네임 ------ {{ board.nickName }}, <br />
    게시글 등록일 ------ {{ board.regDate }}, <br />
    게시글 조회수 ------ {{ board.hit }}, <br />
    <div v-if="loginId != null && loginId === board.userId">
      <button @click="moveModifyBoard">수정</button>
      <button @click="deleteBoard">삭제</button>
    </div>
    <button @click="moveListBoard">목록</button>

    <br />--------------------------------------------<br />
    <div v-if="loginId != null">
      <textarea name="" id="" cols="30" rows="10" v-model="reply.content"></textarea>
      <button @click="registReply">댓글 등록</button>
    </div>

    <br />--------------------------------------------
    <board-comment v-for="(comment, index) in comments" :key="index" :comment="comment"></board-comment>
  </div>
</template>

<script>
import BoardComment from "./BoardComment.vue";
import { getBoardDetail, deleteBoard, getComment, writeComment } from "@/api/board";

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
  },
};
</script>

<style scoped></style>
