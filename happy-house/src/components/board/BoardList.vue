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
      </tbody>
    </table>

    <pagination-com :pageSetting="pageDataSetting(total, limit, block, this.page)" @paging="pagingMethod" />
  </div>
</template>

<script type="module">
import BoardListItem from "@/components/board/BoardListItem.vue";
import BoardSearch from "@/components/board/BoardSearch.vue";
import PaginationCom from "@/components/common/PaginationCom.vue";
// import { getBoardList, getBoardListCount } from "@/api/board";
import { getBoardList } from "@/api/board";

import { apiInstance } from "@/api/index";
const api = apiInstance();

// import { mapState, mapMutations, mapGetters } from "vuex";
import { mapState, mapMutations } from "vuex";
const boardStore = "boardStore";

export default {
  name: "BoardList",
  components: {
    BoardListItem,
    BoardSearch,
    PaginationCom,
  },

  data() {
    return {
      boards: [],
      loginId: null,
      params: {
        pgno: 1,
        key: null,
        word: null,
      },
      total: 10,
      page: 1,
      limit: 10,
      block: 5,
    };
  },

  created() {
    if (localStorage.getItem("loginUser") != null) {
      const id = JSON.parse(localStorage.getItem("loginUser")).userId;
      this.loginId = id;
    }
    this.params.pgno = this.boardListData.pgno;
    this.params.key = this.boardListData.key;
    this.params.word = this.boardListData.word;
    console.log(this.boardListData);

    const getBaord = async (param) => {
      try {
        let data = await api.post(`/board/count`, param);
        console.log(param);
        data = data.data;
        if (data.flag === "success") {
          // console.log("Board 리스트 개수 :", data.data);
          this.total = data.data[0];
        }
        data = await api.post(`/board/list`, param);
        data = data.data;
        if (data.flag === "success") {
          this.boards = data.data;
          // console.log("board List 출력 :\n", this.boards);
        }
      } catch (error) {
        console.log("Board 리스트 : ", error);
      }
    };

    getBaord(this.params);

    // getBoardListCount(
    //   this.params,
    //   ({ data }) => {
    //     if (data.flag === "success") {
    //       // console.log("Board 리스트 개수 :", data.data);
    //       this.total = data.data[0];
    //       getBoardList(
    //         this.params,
    //         ({ data }) => {
    //           if (data.flag === "success") {
    //             this.boards = data.data;
    //             // console.log("board List 출력 :\n", this.boards);
    //           } else {
    //             console.log("Board 리스트 가져오기 오류: ", data.data[0].msg);
    //           }
    //         },
    //         (error) => {
    //           console.log("Board 리스트 가져오기 오류 : " + error);
    //         }
    //       );
    //     } else {
    //       console.log("Board 리스트 개수 가져오기 오류: ", data.data[0].msg);
    //     }
    //   },
    //   (error) => {
    //     console.log("Board 리스트 개수 가져오기 오류 : " + error);
    //   }
    // );

    // getBoardListCount(
    //   this.params,
    //   ({ data }) => {
    //     if (data.flag === "success") {
    //       // console.log("Board 리스트 개수 :", data.data);
    //       this.total = data.data[0];
    //     } else {
    //       console.log("Board 리스트 개수 가져오기 오류: ", data.data[0].msg);
    //     }
    //   },
    //   (error) => {
    //     console.log("Board 리스트 개수 가져오기 오류 : " + error);
    //   }
    // );
    //
    // getBoardList(
    //   this.params,
    //   ({ data }) => {
    //     if (data.flag === "success") {
    //       this.boards = data.data;
    //       console.log("board List 출력 :\n", this.boards);
    //     } else {
    //       console.log("Board 리스트 가져오기 오류: ", data.data[0].msg);
    //     }
    //   },
    //   (error) => {
    //     console.log("Board 리스트 가져오기 오류 : " + error);
    //   }
    // );
  },

  mounted() {},

  computed: {
    ...mapState(boardStore, ["boardListData"]),
  },

  methods: {
    ...mapMutations(boardStore, ["SET_BOARD_LIST_DATA"]),
    // ...mapMutations(boardStore, { setBoardListData: "SET_BOARD_LIST_DATA" }),

    moveRegistBoard() {
      this.$router.push({ name: "boardregist" });
    },
    searchList(searchparam) {
      this.params.key = searchparam.searchClass;
      this.params.word = searchparam.searchInput;

      this.SET_BOARD_LIST_DATA(this.params);

      const getBaord = async (param) => {
        try {
          let data = await api.post(`/board/count`, param);
          console.log(param);
          data = data.data;
          if (data.flag === "success") {
            this.total = data.data[0];
          }
          data = await api.post(`/board/list`, param);
          data = data.data;
          if (data.flag === "success") {
            this.boards = data.data;
          }
        } catch (error) {
          console.log("Board 리스트 : ", error);
        }
      };

      getBaord(this.params);
    },

    pagingMethod(page) {
      this.page = page;
      this.params.pgno = page;

      this.SET_BOARD_LIST_DATA(this.params);
      // this.setBoardListData(this.params);

      getBoardList(
        this.params,
        ({ data }) => {
          if (data.flag === "success") {
            this.boards = data.data;
            // console.log("페이지 이동 후!!!\nboard List 출력 :\n", this.boards);
          } else {
            console.log("Board 리스트 검색으로 가져오기 오류: ", data.data[0].msg);
          }
        },
        (error) => {
          console.log("Board 리스트 검색으로 가져오기 오류 : " + error);
        }
      );
      // total은 페이지에 담길 전체 데이터의 개수를 의미
      // page는 현재 어느 페이지에 있는지를 나타내기 위한 값으로 디폴트는 첫 번째 페이지를 의미하는 1로 주었다.
      // limit은 한 페이지 당 나타날 데이터의 개수를 의미
      // block은 페이지 리스트에서 한 번에 보여질 페이지 개수를 의미
      this.pageDataSetting(this.total, this.limit, this.block, page);
    },

    pageDataSetting(total, limit, block, page) {
      const totalPage = Math.ceil(total / limit);
      let currentPage = page;
      const first = currentPage > 1 ? parseInt(currentPage, 10) - parseInt(1, 10) : null;
      const end = totalPage !== currentPage ? parseInt(currentPage, 10) + parseInt(1, 10) : null;

      let startIndex = (Math.ceil(currentPage / block) - 1) * block + 1;
      let endIndex = startIndex + block > totalPage ? totalPage : startIndex + block - 1;
      let list = [];
      for (let index = startIndex; index <= endIndex; index++) {
        list.push(index);
      }
      return { first, end, list, currentPage };
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
  margin-bottom: 20px;
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

/* .arrow-left {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
} */
</style>
