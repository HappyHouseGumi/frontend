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

    <div class="page">
      <ul class="pagination modal">
        <li><a href="#" class="first">첫 페이지</a></li>
        <li><a href="#" class="arrow-left">&lt;&lt;</a></li>
        <li v-for="index in 10" :key="index" class="num">
          <a>{{ index }}</a>
        </li>
        <!-- <li><a href="#" class="active-num">1</a></li>
        <li><a href="#" class="num">2</a></li>
        <li><a href="#" class="num">3</a></li>
        <li><a href="#" class="num">4</a></li>
        <li><a href="#" class="num">5</a></li> -->
        <li><a href="#" class="arrow-right">&gt;&gt;</a></li>
        <li><a href="#" class="last">끝 페이지</a></li>
      </ul>
    </div>
  </div>
</template>

<script type="module">
import BoardListItem from "@/components/board/BoardListItem.vue";
import BoardSearch from "@/components/board/BoardSearch.vue";
import { getBoardList, getBoardListCount } from "@/api/board";

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
      totalpgno: null,
      pgno: 1,
    };
  },

  created() {
    if (localStorage.getItem("loginUser") != null) {
      const id = JSON.parse(localStorage.getItem("loginUser")).userId;
      this.loginId = id;
    }

    getBoardListCount(
      this.params,
      ({ data }) => {
        if (data.flag === "success") {
          // console.log(data.data);
          this.totalpgno = data.data[0];
        } else {
          console.log("Board 리스트 개수 가져오기 오류: ", data.data[0].msg);
        }
      },
      (error) => {
        console.log("Board 리스트 개수 가져오기 오류 : " + error);
      }
    );

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
            //console.log("board List 출력 :\n", this.boards);
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

.page {
  text-align: center; /* div 사이즈 영역 안에서의 center */
  /* width: 70%; */
}

.pagination {
  list-style: none;
  display: inline-block;
  padding: 0;
  margin-top: 20px;
}

.pagination li {
  display: inline;
  text-align: center;
}

/* 숫자들에 대한 스타일 지정 */
.pagination a {
  float: left;
  display: block;
  font-size: 14px;
  text-decoration: none;
  padding: 5px 12px;
  color: #96a0ad;
  line-height: 1.5;
}

.first {
  margin-right: 15px;
}

.last {
  margin-left: 15px;
}

.first:hover,
.last:hover,
.left:hover,
.right:hover {
  color: #2e9cdf;
}

.pagination a.active {
  cursor: default;
  color: #ffffff;
}

.pagination a:active {
  outline: none;
}

.modal .num {
  margin-left: 3px;
  padding: 0;
  width: 30px;
  height: 30px;
  line-height: 30px;
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;
  border-radius: 100%;
}

.modal .num:hover {
  background-color: #2e9cdf;
  color: #ffffff;
}

.modal .num.active,
.modal .num:active {
  background-color: #2e9cdf;
  cursor: pointer;
}

/* .arrow-left {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
} */
</style>
