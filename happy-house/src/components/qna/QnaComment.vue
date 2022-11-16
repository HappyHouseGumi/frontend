<template>
  <div class="comment-wrapper">
    <div class="comment-header-wrapper">
      <span>관리자</span> |
      <span>{{ comment.regDate }}</span>
    </div>
    <div class="comment-content-wrapper"><b>A.</b> {{ comment.content }}</div>
  </div>
</template>

<script>
export default {
  name: "QnaComment",
  props: {
    comment: Object,
  },
};
</script>

<style scoped>
.comment-wrapper {
  width: 100%;
  border-top: 1px solid #e3e7eb;
  padding: 20px;
}

.comment-header-wrapper > span {
  color: #666;
  font-size: 0.9rem;
  font-weight: bold;
}

.comment-content-wrapper {
  margin-top: 5px;
}
</style>
