<template>
  <div class="board-modify-wrapper">
    <table>
      <colgroup>
        <col style="width: 185px" />
        <col style="width: auto" />
      </colgroup>
      <tbody>
        <tr>
          <th>
            <label>닉네임</label>
          </th>
          <td>{{ board.nickName }}</td>
        </tr>
        <tr>
          <th>
            <label>분류</label>
          </th>
          <td>{{ board.subject }}</td>
        </tr>
        <tr>
          <th>
            <label>제목</label>
            <span class="essentail-mark">*</span>
          </th>
          <td>
            <input type="text" v-model="board.title" />
          </td>
        </tr>
        <tr>
          <th>
            <label>내용</label>
            <span class="essentail-mark">*</span>
          </th>
          <td>
            <textarea v-model="board.content"></textarea>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button class="board-modify-done-btn" @click="modifyBoard">수정</button>
      <button class="board-modify-cancel-btn" @click="moveDetailBoard">취소</button>
    </div>
  </div>
</template>

<script type="module">
import { getBoardDetail, modifyBoard } from "@/api/board";

export default {
  name: "BoardModify",

  data() {
    return {
      board: {},
      origin: {
        title: "",
        content: "",
      },
      sendingData: {},
    };
  },

  created() {
    getBoardDetail(
      this.$route.params.id,
      ({ data }) => {
        if (data.flag === "success") {
          this.board = data.data[0];
          // console.log(data.data[0]);
          this.origin.title = this.board.title;
          this.origin.content = this.board.content;
        } else {
          console.log("Board Modify 불러오기 오류: ", data.data[0].msg);
        }
      },
      (error) => {
        console.log("Board Modify 불러오기 오류 : " + error);
      }
    );
  },

  mounted() {},

  methods: {
    modifyBoard() {
      if (this.origin.title !== this.board.title) {
        this.sendingData.title = this.board.title;
      }
      if (this.origin.content !== this.board.content) {
        this.sendingData.content = this.board.content;
      }

      if (confirm("정말 수정하시겠습니까?")) {
        modifyBoard(
          this.board.id,
          this.sendingData,
          ({ data }) => {
            if (data.flag === "success") {
              this.moveDetailBoard();
            } else {
              console.log("Board 게시글 삭제 오류: ", data.data[0].msg);
            }
          },
          (error) => {
            console.log("Board 게시글 삭제 오류 : " + error);
          }
        );
      } else {
        // 수정 취소 시
      }
    },
    moveDetailBoard() {
      this.$router.push({ name: "boarddetail", params: { id: this.board.id } });
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  table-layout: fixed;
  border-top: 2px solid #222;
}

colgroup {
  display: table-column-group;
}

tbody {
  display: table-row-group;
  vertical-align: middle;
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

td {
  height: 55px;
  padding: 10px 15px;
  color: #222;
  border-bottom: 1px solid #d8d8d8;
  border-left: 1px solid #d8d8d8;
}

td > input {
  width: 100%;
  height: 35px;
  padding: 0 10px;
  color: #666;
  border: 1px solid #cbcbcb;
  outline: 0;
}

td > textarea {
  width: 100%;
  height: 200px;
  padding: 5px 10px;
  color: #666;
  border: 1px solid #cbcbcb;
  vertical-align: middle;
  outline: 0;
  resize: none;
}

.essentail-mark {
  margin-left: 5px;
  color: #f71b1b;
  font-weight: bold;
}

.board-modify-wrapper > div {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

button {
  margin-top: 30px;
  margin-bottom: 100px;
  width: 120px;
  height: 40px;
  font-weight: bold;
  color: white;
  border: 0;
  outline: 0;
  border-radius: 5px;
}

.board-modify-done-btn {
  background: #3c90e2;
  margin-right: 20px;
}

.board-modify-cancel-btn {
  background: rgb(138, 137, 137);
}
</style>
