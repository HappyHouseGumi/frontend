<template>
  <div class="comment-wrapper">
    <div>
      <div class="comment-header-wrapper">
        <span>관리자</span> |
        <span>{{ comment.regDate }}</span>
      </div>
      <div v-if="!isModifyStatus" class="comment-content-wrapper"><b>A.</b> {{ comment.content }}</div>
      <div v-else class="comment-content-wrapper">
        <input class="comment-modify-input" :placeholder="`${comment.content}`" v-model="changedComment.content" />
      </div>
    </div>
    <div v-if="isAdmin" class="comment-right-wrapper">
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
import { modifyQnaComment, deleteQnaComment } from "@/api/qna";

export default {
  name: "QnaComment",
  props: {
    comment: Object,
    idx: Number,
  },
  data() {
    return {
      isAdmin: true, // 임시 데이터
      isModifyStatus: false,
      changedComment: {
        content: "",
      },
    };
  },
  methods: {
    moveModifyComment() {
      this.isModifyStatus = !this.isModifyStatus;
    },
    modifyComment() {
      if (this.changedComment === "") {
        alert("답글을 작성해주세요.");
        return;
      }
      if (this.comment.content !== this.changedComment) {
        modifyQnaComment(
          this.comment.id,
          this.changedComment,
          ({ data }) => {
            if (data.flag === "success") {
              this.$emit("changData", this.idx, this.changedComment);
              this.isModifyStatus = false;
            }
          },
          (error) => {
            console.log("QnA 댓글 수정 오류 : " + error);
          }
        );
      }
    },
    deleteComment() {
      if (confirm("정말 삭제하시겠습니까?")) {
        deleteQnaComment(
          this.comment.id,
          ({ data }) => {
            if (data.flag === "success") {
              this.$router.go();
            }
          },
          (error) => {
            console.log("QnA 댓글 삭제 오류 : " + error);
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
