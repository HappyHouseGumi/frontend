<template>
  <div class="comment-wrapper">
    <div>
      <div class="comment-header-wrapper">
        <span>{{ changeComment.nickName }}</span> |
        <span>{{ changeComment.regDate }}</span>
      </div>
      <div v-if="!isModifyStatus" class="comment-content-wrapper">
        <b>A.</b>
        <p v-html="changeComment.content"></p>
      </div>
      <div v-else class="comment-content-wrapper">
        <input class="comment-modify-input" :placeholder="`${changeComment.content}`" v-model="changeComment.content" />
      </div>
    </div>
    <div v-if="loginId != null && loginId === changeComment.userId" class="comment-right-wrapper">
      <button v-if="!isModifyStatus" class="comment-modify-btn" @click="moveModifyComment">
        <font-awesome-icon icon="fa-solid fa-pen" />
      </button>
      <button v-else class="comment-modify-btn" @click="modifyComment">
        <font-awesome-icon icon="fa-solid fa-check" />
      </button>
      <button @click="deleteComment">
        <font-awesome-icon icon="fa-solid fa-trash-can" />
      </button>
    </div>
  </div>
</template>

<script type="module">
import { modifyComment, deleteComment } from "@/api/board";

export default {
  name: "BoardComment",
  props: {
    comment: Object,
  },

  data() {
    return {
      isModifyStatus: false,
      changeComment: {
        id: 0,
        userId: "",
        nickName: "",
        content: "",
      },
      loginId: null,
    };
  },

  created() {
    this.changeComment = this.comment;

    if (localStorage.getItem("loginUser") != null) {
      const id = JSON.parse(localStorage.getItem("loginUser")).userId;
      this.loginId = id;
    }

    this.changeComment.content = this.changeComment.content.split("\n").join("<br />");
  },

  mounted() {},

  methods: {
    moveModifyComment() {
      this.isModifyStatus = !this.isModifyStatus;
    },
    modifyComment() {
      if (this.changeComment === "") {
        alert("답글을 작성해주세요.");
        return;
      }
      if (this.comment.content !== this.changedComment) {
        modifyComment(
          this.changeComment,
          ({ data }) => {
            if (data.flag === "success") {
              this.$emit("changData", this.idx, this.changeComment);
              this.isModifyStatus = false;
            } else {
              console.log("댓글 수정 오류: ", data.data[0].msg);
            }
          },
          (error) => {
            console.log("댓글 수정 오류 : " + error);
          }
        );
      }
    },
    deleteComment() {
      if (confirm("정말 삭제하시겠습니까?")) {
        deleteComment(
          this.changeComment.id,
          ({ data }) => {
            if (data.flag === "success") {
              this.$router.go();
            } else {
              console.log("댓글 삭제 오류: ", data.data[0].msg);
            }
          },
          (error) => {
            console.log("댓글 삭제 오류 : " + error);
          }
        );
      }
    },
  },
};
</script>

<style scoped>
.comment-wrapper {
  width: 100%;
  border-top: 1px solid #e3e7eb;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.comment-header-wrapper > span {
  color: #666;
  font-size: 0.9rem;
  font-weight: bold;
}

.comment-content-wrapper {
  margin-top: 5px;
}

.comment-modify-input {
  border-top: none;
  border-left: none;
  border-right: none;
  outline: none;
  font-size: 0.9rem;
  width: 400px;
}

.comment-right-wrapper > button {
  border: none;
  background: none;
}

.comment-modify-btn {
  margin-right: 10px;
}
</style>
