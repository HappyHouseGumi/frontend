<template>
  <div>
    댓글 작성자 ------ {{ changeComment.userId }} <br />
    댓글 작성일 ------ {{ changeComment.regDate }} <br />
    <div v-if="isModifyC">댓글 내용 ------ {{ changeComment.content }}</div>
    <div v-else>댓글 내용 ------ <input type="text" v-model="changeComment.content" /></div>
    <button v-if="isModifyB" @click="changeToggle">수정</button>
    <button v-else @click="modifyComment">수정하기</button>
    <button @click="deleteComment">삭제하기</button>
    <br />
  </div>
</template>

<script>
import { modifyComment, deleteComment } from "@/api/board";

export default {
  name: "BoardComment",
  props: {
    comment: Object,
  },

  data() {
    return {
      isModifyB: true,
      isModifyC: true,
      changeComment: {
        id: 0,
        userId: 0,
        content: "",
      },
    };
  },

  created() {
    this.changeComment = this.comment;
  },

  mounted() {},

  methods: {
    changeToggle() {
      this.isModifyC = false;
      this.isModifyB = false;
    },
    modifyComment() {
      this.isModifyC = true;
      this.isModifyB = true;
      console.log(this.changeComment);
      modifyComment(
        this.changeComment,
        ({ data }) => {
          if (data.flag === "success") {
            alert("댓글 수정 성공");
            this.$router.go();
          }
        },
        (error) => {
          console.log("댓글 수정 오류 : " + error);
        }
      );
    },
    deleteComment() {
      deleteComment(
        this.changeComment.id,
        ({ data }) => {
          if (data.flag === "success") {
            alert("댓글 삭제 성공");
            this.$router.go();
          }
        },
        (error) => {
          console.log("댓글 삭제 오류 : " + error);
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
