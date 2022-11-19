<template>
  <div>
    게시글 아이디 ------ {{ board.id }}, <br />
    사용자 아이디 ------ {{ board.userId }}, <br />
    게시글 분류 ------ <input type="text" v-model="board.subject" />, <br />
    게시글 제목 ------ <input type="text" v-model="board.title" />, <br />
    게시글 내용 ------ <input type="text" v-model="board.content" />, <br />

    <button @click="modifyBoard">수정</button>
    <button @click="moveDetailBoard">취소</button>
  </div>
</template>

<script>
import { getBoardDetail, modifyBoard } from "@/api/board";

export default {
  name: "BoardModify",

  data() {
    return {
      board: {},
    };
  },

  created() {
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
  },

  mounted() {},

  methods: {
    modifyBoard() {
      if (confirm("정말 수정하시겠습니까?")) {
        modifyBoard(
          this.board,
          ({ data }) => {
            if (data.flag === "success") {
              alert("글 수정 완료!!");
              this.moveDetailBoard();
            }
          },
          (error) => {
            console.log("Board 게시글 삭제 오류 : " + error);
          }
        );
      } else {
        // 수정 취소 시
      }
    },
    moveDetailBoard() {
      this.$router.push({ name: "boarddetail", params: { id: this.board.id } });
    },
  },
};
</script>

<style lang="scss" scoped></style>
