<template>
  <div class="wrapper">
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
            <input type="text" />
          </td>
        </tr>
        <tr>
          <th>
            <label>비밀번호</label>
            <span class="essentail-mark">*</span>
          </th>
          <td>
            <input type="password" />
          </td>
        </tr>
        <tr>
          <th>
            <label>제목</label>
            <span class="essentail-mark">*</span>
          </th>
          <td>
            <input type="text" />
          </td>
        </tr>
        <tr>
          <th>
            <label>내용</label>
            <span class="essentail-mark">*</span>
          </th>
          <td>
            <textarea />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button class="regist-btn">등록</button>
      <button class="cancel-btn" @click="cancelBtn">취소</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "QnaRegist",
  methods: {
    cancelBtn() {
      this.$router.push({ path: "/qna/list" });
    },
  },
};
</script>

<style scoped>
.wrapper {
  margin: 30px 0 50px;
}

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
  padding: 5px 15px;
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
}

.essentail-mark {
  margin-left: 5px;
  color: #f71b1b;
  font-weight: bold;
}

button {
  margin-top: 30px;
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
