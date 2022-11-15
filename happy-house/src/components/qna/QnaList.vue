<template>
  <div>
    <QnaSearch />
    <button class="qna-regist-btn" @click="qnaRegist">질문 등록하기</button>
  </div>
</template>

<script type="module">
import QnaSearch from "@/components/qna/QnaSearch.vue";

export default {
  name: "QnaList",
  components: {
    QnaSearch,
  },
  methods: {
    qnaRegist() {
      this.$router.push({ path: "/qna/regist" });
    },
  },
};
</script>

<style scoped>
.qna-regist-btn {
  margin-top: 30px;
  float: right;
  width: 120px;
  height: 40px;
  font-weight: bold;
  color: white;
  border: 0;
  outline: 0;
  background: #3c90e2;
  border-radius: 5px;
}
</style>
