<template>
  <div>
    <QnaSearch @searchBtn="searchBtn" />
    <button class="qna-regist-btn" @click="moveRegistQna">질문 등록하기</button>
    <div>
      <table>
        <QnaListItem v-for="(question, index) in questions" :key="index" :question="question" />
      </table>
    </div>
  </div>
</template>

<script type="module">
import QnaSearch from "@/components/qna/QnaSearch.vue";
import QnaListItem from "@/components/qna/QnaListItem.vue";
import { getQnaList, getQnaSearchList } from "@/api/qna";

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
    moveRegistQna() {
      this.$router.push({ path: "/qna/regist" });
    },

    searchBtn(searchInput) {
      getQnaSearchList(
        searchInput,
        ({ data }) => {
          if (data.flag === "success") this.questions = data.data;
          else alert("검색어와 일치하는 항목이 없습니다.");
        },
        (error) => {
          console.log("QnA 검색결과 리스트 가져오기 오류 : " + error);
        }
      );
    },
  },
  created() {
    getQnaList(
      ({ data }) => {
        if (data.flag === "success") this.questions = data.data;
      },
      (error) => {
        console.log("QnA 리스트 가져오기 오류 : " + error);
      }
    );
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
  margin-bottom: 150px;
  width: 100%;
  table-layout: fixed;
  border-top: 2px solid #222;
}
</style>
