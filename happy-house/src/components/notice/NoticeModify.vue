<template>
  <div class="notice-modify-wrapper">
    <table>
      <colgroup>
        <col style="width: 185px" />
        <col style="width: auto" />
      </colgroup>
      <tbody>
        <tr>
          <th>
            <label>운영자</label>
          </th>
          <td>{{ notice.id }}</td>
        </tr>
        <tr>
          <th>
            <label>제목</label>
            <span class="essentail-mark">*</span>
          </th>
          <td>
            <input type="text" v-model="notice.title" />
          </td>
        </tr>
        <tr>
          <th>
            <label>내용</label>
            <span class="essentail-mark">*</span>
          </th>
          <td>
            <textarea v-model="notice.content"></textarea>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button class="notice-modify-done-btn" @click="modifyNotice">수정</button>
      <button class="notice-modify-cancel-btn" @click="moveDetailNotice">취소</button>
    </div>
  </div>
</template>

<script type="module">
import { getNoticeDetail, modifyNotice } from "@/api/notice";

export default {
  name: "NoticeModify",

  data() {
    return {
      notice: {},
      origin: {
        title: "",
        content: "",
      },
      sendingData: {},
    };
  },

  created() {
    getNoticeDetail(
      this.$route.params.id,
      ({ data }) => {
        if (data.flag === "success") {
          this.notice = data.data[0];
          // console.log(data.data[0]);
          this.origin.title = this.notice.title;
          this.origin.content = this.notice.content;
        }
      },
      (error) => {
        console.log("notice Modify 불러오기 오류 : " + error);
      }
    );
  },

  mounted() {},

  methods: {
    modifyNotice() {
      if (this.notice.title === "" || this.notice.content === "") {
        alert("빈칸을 모두 채워주세요.");
        return;
      }
      if (this.origin.title !== this.notice.title) {
        this.sendingData.title = this.notice.title;
      }
      if (this.origin.content !== this.notice.content) {
        this.sendingData.content = this.notice.content;
      }

      if (confirm("정말 수정하시겠습니까?")) {
        modifyNotice(
          this.notice.id,
          this.sendingData,
          ({ data }) => {
            if (data.flag === "success") {
              alert("글 수정 완료!!");
              this.moveDetailNotice();
            }
          },
          (error) => {
            console.log("notice 게시글 삭제 오류 : " + error);
          }
        );
      } else {
        // 수정 취소 시
        return;
      }
    },
    moveDetailNotice() {
      this.$router.push({ name: "noticedetail", params: { id: this.notice.id } });
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

.notice-modify-wrapper > div {
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

.notice-modify-done-btn {
  background: #3c90e2;
  margin-right: 20px;
}

.notice-modify-cancel-btn {
  background: rgb(138, 137, 137);
}
</style>
