<template>
  <div>
    <NoticeSearch @searchParam="searchList" />
    <div v-if="loginId != null">
      <button class="notice-regist-btn" @click="moveRegistNotice">글 등록하기</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>글번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일</th>
        </tr>
      </thead>
      <tbody>
        <notice-list-item v-for="(notice, index) in notices" :key="index" :notice="notice"></notice-list-item>
        <!-- :index="index" :pgno="pgno" -->
      </tbody>
    </table>
  </div>
</template>

<script type="module">
import NoticeListItem from "@/components/notice/NoticeListItem.vue";
import NoticeSearch from "@/components/notice/NoticeSearch.vue";
import { getNoticeList } from "@/api/notice";

export default {
  name: "NoticeList",
  components: {
    NoticeListItem,
    NoticeSearch,
  },

  data() {
    return {
      notices: [],
      loginId: null,
      params: {
        pgno: "1",
        word: null,
      },
      pgno: 1,
    };
  },

  created() {
    if (localStorage.getItem("loginUser") != null) {
      const id = JSON.parse(localStorage.getItem("loginUser")).userId;
      this.loginId = id;
    }

    getNoticeList(
      this.params,
      ({ data }) => {
        if (data.flag === "success") {
          this.notices = data.data;
          // console.log("notice List 출력 :\n", this.notices);
        }
      },
      (error) => {
        console.log("Notice 리스트 가져오기 오류 : " + error);
      }
    );
  },

  mounted() {},

  methods: {
    moveRegistNotice() {
      this.$router.push({ name: "noticeregist" });
    },
    searchList(searchparam) {
      this.params.key = searchparam.searchClass;
      this.params.word = searchparam.searchInput;

      getNoticeList(
        this.params,
        ({ data }) => {
          if (data.flag === "success") {
            this.notices = data.data;
            console.log("notice List 출력 :\n", this.notices);
          }
        },
        (error) => {
          console.log("Notice 리스트 검색으로 가져오기 오류 : " + error);
        }
      );
    },
  },
};
</script>

<style scoped>
.notice-regist-btn {
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
  text-align: center;
}

th {
  height: 55px;
  text-align: center;
  font-weight: bold;
  color: black;
  border-bottom: 1px solid #d8d8d8;
  background: #f9f9f9;
}

th > label:nth-child(1) {
  width: 10%;
  font-weight: normal;
  font-size: 0.8rem;
  margin-left: 5px;
}
</style>
