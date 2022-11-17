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
import http from "@/api/http.js";

export default {
  name: "QnaComment",
  props: {
    comment: Object,
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
      if (this.comment.content !== this.changedComment) {
        http.put(`/qnacomment/${this.comment.id}`, this.changedComment).then(({ data }) => {
          if (data.flag === "success") {
            alert("답글을 수정하였습니다.");
          }
        });
      }
    },
    deleteComment() {
      if (confirm("정말 삭제하시겠습니까?")) {
        http.delete(`/qnacomment/${this.comment.id}`).then(({ data }) => {
          if (data.flag === "success") {
            alert("답글을 삭제하였습니다.");
          }
        });
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
