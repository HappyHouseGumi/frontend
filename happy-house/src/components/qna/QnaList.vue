<template>
  <div>
    <QnaSearch @searchBtn="searchBtn" />
    <button class="qna-regist-btn" @click="moveRegistQna">1:1 문의</button>
    <div class="qna-list-item-wrapper">
      <QnaListItem :questions="questions" />
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
  width: 110px;
  height: 40px;
  font-weight: bold;
  color: #007bff;
  border: 0;
  outline: 0;
  background: white;
  border: 1px solid #007bff;
  border-radius: 10px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.qna-regist-btn:hover {
  color: white;
  background: #007bff;
}

.qna-list-item-wrapper {
  margin-top: 50px;
  margin-bottom: 130px;
  width: 100%;
}
</style>
