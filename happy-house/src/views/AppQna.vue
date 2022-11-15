<template>
  <div class="content">
    <div class="wrapper">
      <span>QnA</span>
      <QnaSearch />
      <button @click="registQna">질문 등록하기</button>
      <QnaList />
      <div>페이징</div>
    </div>
  </div>
</template>

<script type="module">
import QnaSearch from "@/components/qna/QnaSearch.vue";
import QnaList from "@/components/qna/QnaList.vue";

export default {
  name: "AppQna",
  components: {
    QnaSearch,
    QnaList,
  },
  methods: {
    registQna() {
      this.$router.push({ path: "/qna/regist" });
    },
  },
};
</script>

<style scoped>
.content {
  height: 100%;
}

.wrapper {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.wrapper > span {
  font-size: 3rem;
  font-weight: bold;
  margin: 50px 0;
}
</style>
