<template>
  <div>
    <QnaSearch />
    <button class="qna-regist-btn" @click="qnaRegist">질문 등록하기</button>
    <div class="questions-wrapper">
      <table>
        <QnaListItem
          v-for="(question, index) in questions"
          :key="index"
          :question="question"
        />
      </table>
    </div>
  </div>
</template>

<script type="module">
import QnaSearch from "@/components/qna/QnaSearch.vue";
import QnaListItem from "@/components/qna/QnaListItem.vue";

export default {
  name: "QnaList",
  components: {
    QnaSearch,
    QnaListItem,
  },
  data() {
    return {
      questions: [],
    };
  },
  methods: {
    qnaRegist() {
      this.$router.push({ path: "/qna/regist" });
    },
  },
  created() {
    // 서버에서 리스트 목록 가져오기
  },
};
</script>

<style scoped>
.qna-regist-btn {
  margin: 30px 0;
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

table {
  margin-bottom: 100px;
  width: 100%;
  table-layout: fixed;
  border-top: 2px solid #222;
  border-bottom: 1px solid #222;
}
</style>
