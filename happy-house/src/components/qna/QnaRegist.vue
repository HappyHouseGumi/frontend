<template>
  <div class="qna-regist-wrapper">
    <table>
      <colgroup>
        <col style="width: 185px" />
        <col style="width: auto" />
      </colgroup>
      <tbody>
        <tr>
          <th>
            <label>이름</label>
            <span class="essentail-mark">*</span>
          </th>
          <td>
            <input type="text" v-model="question.userName" />
          </td>
        </tr>
        <tr>
          <th>
            <label>비밀번호</label>
            <span class="essentail-mark">*</span>
          </th>
          <td>
            <input type="password" v-model="question.password" />
          </td>
        </tr>
        <tr>
          <th>
            <label>제목</label>
            <span class="essentail-mark">*</span>
          </th>
          <td>
            <input type="text" v-model="question.title" />
          </td>
        </tr>
        <tr>
          <th>
            <label>내용</label>
            <span class="essentail-mark">*</span>
          </th>
          <td>
            <textarea v-model="question.content" />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button class="regist-btn" @click="registQna">등록</button>
      <button class="cancel-btn" @click="cancelBtn">취소</button>
    </div>
  </div>
</template>

<script type="module">
import { registQna } from "@/api/qna";

export default {
  name: "QnaRegist",
  data() {
    return {
      question: {
        userName: "",
        password: "",
        title: "",
        content: "",
      },
    };
  },
  methods: {
    registQna() {
      if (
        this.question.userName === "" ||
        this.question.password === "" ||
        this.question.title === "" ||
        this.question.content === ""
      ) {
        alert("필수 항목을 채워주세요.");
        return;
      }
      if (this.question.userName.length > 6) {
        alert("이름은 최대 6글자까지 가능합니다.");
        return;
      }

      registQna(
        this.question,
        ({ data }) => {
          if (data.flag === "success") {
            this.$router.push({ path: "/qna/list" });
          }
        },
        (error) => {
          console.log("QnA 등록 오류 : " + error);
        }
      );
    },
    cancelBtn() {
      this.$router.push({ path: "/qna/list" });
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  table-layout: fixed;
  border-top: 2px solid #222;
  border-bottom: 1px solid #222;
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

.qna-regist-wrapper > div {
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
