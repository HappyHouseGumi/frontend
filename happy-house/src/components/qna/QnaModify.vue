<template>
  <div class="qna-modify-wrapper">
    <table>
      <colgroup>
        <col style="width: 185px" />
        <col style="width: auto" />
      </colgroup>
      <tbody>
        <tr>
          <th>
            <label>이름</label>
          </th>
          <td>{{ question.userName }}</td>
        </tr>
        <tr>
          <th>
            <label>비밀번호</label>
          </th>
          <td>{{ question.password }}</td>
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
      <button class="qna-modify-done-btn" @click="modifyQna">수정</button>
      <button class="qna-modify-cancel-btn" @click="cancelModifyBtn">취소</button>
    </div>
  </div>
</template>

<script>
import { getQnaDetail, modifyQna } from "@/api/qna";

export default {
  name: "QnaModify",
  data() {
    return {
      question: {},
      origin: {
        title: "",
        content: "",
      },
      sendingData: {},
    };
  },
  created() {
    getQnaDetail(
      this.$route.params.id,
      ({ data }) => {
        if (data.flag === "success") {
          this.question = data.data[0];
          this.origin.title = this.question.title;
          this.origin.content = this.question.content;
        }
      },
      (error) => {
        console.log("QnaModify의 QnA 상세보기 오류 : " + error);
      }
    );
  },
  methods: {
    modifyQna() {
      if (this.origin.title !== this.question.title) {
        this.sendingData.title = this.question.title;
      }
      if (this.origin.content !== this.question.content) {
        this.sendingData.content = this.question.content;
      }

      modifyQna(
        this.question.id,
        this.sendingData,
        ({ data }) => {
          if (data.flag === "success") {
            alert("글 수정 완료!!");
            this.$router.push({ name: "qnadetail", params: { id: this.question.id } });
          }
        },
        (error) => console.log("QnA 수정 오류 : " + error)
      );
    },
    cancelModifyBtn() {
      this.$router.push({ name: "qnadetail", params: { id: this.question.id } });
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

.qna-modify-wrapper > div {
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

.qna-modify-done-btn {
  background: #3c90e2;
  margin-right: 20px;
}

.qna-modify-cancel-btn {
  background: rgb(138, 137, 137);
}
</style>
