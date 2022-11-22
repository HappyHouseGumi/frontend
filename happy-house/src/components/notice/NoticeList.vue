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
        <NoticeListItem v-for="(notice, index) in notices" :key="index" :notice="notice" />
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
        pgno: 1,
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
        } else {
          console.log("Notice 리스트 가져오기 오류: ", data.data[0].msg);
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
          } else {
            console.log("Notice 리스트 검색으로 가져오기 오류: ", data.data[0].msg);
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

.notice-regist-btn:hover {
  color: white;
  background: #007bff;
}

table {
  font-size: 0.9em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
}

th {
  text-align: left;
  font-size: 1rem;
}

thead {
  font-weight: bold;
  color: #fff;
  background: #0069d9;
}

td,
th {
  padding: 15px 30px;
  vertical-align: middle;
}

td {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
}

a {
  color: #73685d;
  text-decoration: none;
}

@media all and (max-width: 768px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  th {
    text-align: right;
  }

  table {
    position: relative;
    padding-bottom: 0;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  thead {
    float: left;
    white-space: nowrap;
  }

  tbody {
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    white-space: nowrap;
  }

  tr {
    display: inline-block;
    vertical-align: top;
  }

  th {
    border-bottom: 1px solid #a39485;
  }

  td {
    border-bottom: 1px solid #e5e5e5;
  }
}

tr:hover td {
  cursor: pointer;
  background: #e7e5e5;
}
</style>
