<template>
  <div>
    <like-search @searchParam="searchList" />
    <table>
      <thead>
        <tr>
          <th>글번호</th>
          <th>지역</th>
          <th>제목</th>
          <th>작성자</th>
        </tr>
      </thead>
      <tbody>
        <like-list-item v-for="(like, index) in likes" :key="index" :like="like"></like-list-item>
        <!-- :index="index" :pgno="pgno" -->
      </tbody>
    </table>
  </div>
</template>

<script type="module">
import LikeListItem from "@/components/like/LikeListItem.vue";
import LikeSearch from "@/components/like/LikeSearch.vue";
import { getLikeList } from "@/api/like";

export default {
  name: "LikeList",
  components: {
    LikeListItem,
    LikeSearch,
  },

  data() {
    return {
      likes: [],
      loginId: null,
      params: {
        pgno: 1,
        key: null,
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

    getLikeList(
      this.params,
      ({ data }) => {
        if (data.flag === "success") {
          this.likes = data.data;
          // console.log("Like List 출력 :\n", this.likes);
        } else {
          console.log("Like 리스트 가져오기 오류: ", data.data[0].msg);
        }
      },
      (error) => {
        console.log("Like 리스트 가져오기 오류 : " + error);
      }
    );
  },

  mounted() {},

  methods: {
    searchList(searchparam) {
      this.params.key = searchparam.searchClass;
      this.params.word = searchparam.searchInput;

      getLikeList(
        this.params,
        ({ data }) => {
          if (data.flag === "success") {
            this.likes = data.data;
            // console.log("like List 출력 :\n", this.likes);
          } else {
            console.log("like 리스트 검색으로 가져오기 오류: ", data.data[0].msg);
          }
        },
        (error) => {
          console.log("like 리스트 검색으로 가져오기 오류 : " + error);
        }
      );
    },
  },
};
</script>

<style scoped>
.like-regist-btn {
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
