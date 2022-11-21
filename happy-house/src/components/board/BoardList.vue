<template>
  <div>
    <BoardSearch @searchParam="searchList" />
    <div v-if="loginId != null">
      <button class="board-regist-btn" @click="moveRegistBoard">글 등록하기</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>글번호</th>
          <th>지역</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일</th>
        </tr>
      </thead>
      <tbody>
        <board-list-item v-for="(board, index) in boards" :key="index" :board="board"></board-list-item>
        <!-- :index="index" :pgno="pgno" -->
      </tbody>
    </table>
  </div>
</template>

<script type="module">
import BoardListItem from "@/components/board/BoardListItem.vue";
import BoardSearch from "@/components/board/BoardSearch.vue";
import { getBoardList } from "@/api/board";

export default {
  name: "BoardList",
  components: {
    BoardListItem,
    BoardSearch,
  },

  data() {
    return {
      boards: [],
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

    getBoardList(
      this.params,
      ({ data }) => {
        if (data.flag === "success") {
          this.boards = data.data;
          // console.log("board List 출력 :\n", this.boards);
        } else {
          console.log("Board 리스트 가져오기 오류: ", data.data[0].msg);
        }
      },
      (error) => {
        console.log("Board 리스트 가져오기 오류 : " + error);
      }
    );
  },

  mounted() {},

  methods: {
    moveRegistBoard() {
      this.$router.push({ name: "boardregist" });
    },
    searchList(searchparam) {
      this.params.key = searchparam.searchClass;
      this.params.word = searchparam.searchInput;

      getBoardList(
        this.params,
        ({ data }) => {
          if (data.flag === "success") {
            this.boards = data.data;
            console.log("board List 출력 :\n", this.boards);
          } else {
            console.log("Board 리스트 검색으로 가져오기 오류: ", data.data[0].msg);
          }
        },
        (error) => {
          console.log("Board 리스트 검색으로 가져오기 오류 : " + error);
        }
      );
    },
  },
};
</script>

<style scoped>
.board-regist-btn {
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
