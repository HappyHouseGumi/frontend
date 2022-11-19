<template>
  <div>
    <router-link :to="{ name: 'boardregist' }">글 등록</router-link>
    <table>
      <thead>
        <tr>
          <th>글번호</th>
          <th>분류</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일</th>
        </tr>
      </thead>
      <board-list-item v-for="(board, index) in boards" :key="index" :board="board"></board-list-item>
    </table>
  </div>
</template>

<script type="module">
import BoardListItem from "@/components/board/BoardListItem.vue";
import { getBoardList } from "@/api/board";

export default {
  name: "BoardList",
  components: {
    BoardListItem,
  },

  data() {
    return {
      boards: [],
      params: {
        pgno: "1",
      },
    };
  },

  created() {
    getBoardList(
      this.params,
      ({ data }) => {
        if (data.flag === "success") {
          this.boards = data.data;
          // console.log("board List 출력 :\n", this.boards);
        }
      },
      (error) => {
        console.log("Board 리스트 가져오기 오류 : " + error);
      }
    );
  },

  mounted() {},

  methods: {},
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
tr {
  display: table-row;
}

th {
  height: 55px;
  text-align: left;
  padding-left: 15px;
  font-weight: bold;
  color: #222;
  border-bottom: 1px solid #d8d8d8;
  background: #f9f9f9;
  line-height: 18px;
}

th > label:nth-child(2) {
  font-weight: normal;
  font-size: 0.8rem;
  margin-left: 5px;
}
</style>
