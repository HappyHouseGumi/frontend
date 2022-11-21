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
        pgno: "1",
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
          console.log("Like List 출력 :\n", this.likes);
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
