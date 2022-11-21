<template>
  <div class="board-regist-wrapper">
    <table>
      <colgroup>
        <col style="width: 185px" />
        <col style="width: auto" />
      </colgroup>
      <tbody>
        <tr>
          <th>
            <label>분류</label>
            <span class="essentail-mark">*</span>
          </th>
          <td>
            <select v-model="selected1" @change="getBoardSubject" class="selectSubject">
              <option v-for="(list, index) in subject1" :key="index" :value="list.id">
                {{ list.sidoName }}
              </option>
            </select>
            <select v-model="selected2" class="selectSubject">
              <option v-for="(list, index) in subject2" :key="index" :value="list.gugunName">
                {{ list.gugunName }}
              </option>
            </select>
          </td>
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
            <textarea v-model="board.content" />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button class="regist-btn" @click="writeBoard">등록</button>
      <button class="cancel-btn" @click="moveListBoard">취소</button>
    </div>
  </div>
</template>

<script type="module">
import { writeBoard, getBoardSubject } from "@/api/board";

export default {
  name: "BoardRegist",

  data() {
    return {
      board: {
        userId: null,
        subject: "",
        title: "",
        content: "",
      },
      params: {
        pgno: "1",
      },
      subject1: [],
      subject2: [],
      selected1: 0,
      selected2: "",
      loginId: null,
    };
  },

  created() {
    if (localStorage.getItem("loginUser") != null) {
      const id = JSON.parse(localStorage.getItem("loginUser")).userId;
      this.loginId = id;
    } else {
      this.$router.push({ name: "boardlist" });
    }

    getBoardSubject(
      "sido",
      0,
      ({ data }) => {
        if (data.flag === "success") {
          this.subject1 = data.data;
        } else {
          console.log("말머리 불러오기 오류: ", data.data[0].msg);
        }
      },
      (error) => {
        console.log("말머리 불러오기 오류 : " + error);
      }
    );
  },

  mounted() {},

  methods: {
    writeBoard() {
      this.board.userId = this.loginId;
      this.board.subject = "".concat(this.subject2[0].sidoName, " ", this.selected2);
      // console.log(this.board);

      if (this.board.subject === "" || this.board.title === "" || this.board.content === "") {
        alert("빈칸을 모두 채워주세요.");
        return;
      }

      writeBoard(
        this.board,
        ({ data }) => {
          if (data.flag === "success") {
            alert("게시글 등록 성공");
            this.moveListBoard();
          } else {
            console.log("게시글 등록 오류: ", data.data[0].msg);
          }
        },
        (error) => {
          console.log("게시글 등록 오류 : " + error);
        }
      );
    },
    moveListBoard() {
      this.$router.push({ name: "boardlist" });
    },
    getBoardSubject() {
      getBoardSubject(
        "gugun",
        this.selected1,
        ({ data }) => {
          if (data.flag === "success") {
            this.subject2 = data.data;
          } else {
            console.log("말머리 불러오기 오류: ", data.data[0].msg);
          }
        },
        (error) => {
          console.log("말머리 불러오기 오류 : " + error);
        }
      );
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
.selectSubject {
  width: 110px;
  height: 32px;
  border: 1px solid #999;
  background-size: 20px;
  padding: 5px 30px 5px 10px;
  border-radius: 4px;
  outline: 1;
  margin-right: 8px;
}
.selectSubject option {
  background: #fff;
  color: black;
  padding: 3px 0;
}
.board-regist-wrapper > div {
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

.regist-btn {
  background: #3c90e2;
  margin-right: 20px;
}

.cancel-btn {
  background: rgb(138, 137, 137);
}
</style>
