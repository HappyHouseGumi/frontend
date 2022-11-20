<template>
  <div class="notice-detail-wrapper">
    <!-- 질문 상세 영역 -->
    <div class="detail-wrapper">
      <!-- 질문 제목 작성자 작성일시 -->
      <div class="detail-header-wrapper">
        <span>{{ notice.title }}</span>
        <div>
          <span>운영자</span> | <span>{{ notice.regDate }}</span>
        </div>
      </div>
      <!-- 질문 내용 -->
      <div class="detail-content-wrapper">{{ notice.content }}</div>
    </div>
    <!-- 수정 삭제 영역 -->
    <div class="notice-modify-delete-wrapper">
      <div v-if="loginId != null && loginId === notice.userId">
        <!-- <div v-if="isWriter"> -->
        <button class="notice-modify-btn" @click="moveModifyNotice">수정</button>
        <button class="notice-delete-btn" @click="deleteNotice">삭제</button>
        <button class="notice-list-btn" @click="moveListNotice">목록</button>
      </div>
      <div v-else>
        <button class="notice-list-btn" @click="moveListNotice">목록</button>
      </div>
    </div>
  </div>
</template>

<script type="module">
import { getNoticeDetail, deleteNotice } from "@/api/notice";

export default {
  name: "NoticeDetail",

  data() {
    return {
      notice: {},
      loginId: null,
    };
  },

  created() {
    if (localStorage.getItem("loginUser") != null) {
      const id = JSON.parse(localStorage.getItem("loginUser")).userId;
      this.loginId = id;
    }

    getNoticeDetail(
      this.$route.params.id,
      ({ data }) => {
        if (data.flag === "success") {
          this.notice = data.data[0];
          // console.log(data.data[0]);
        }
      },
      (error) => {
        console.log("notice 상세보기 오류 : " + error);
      }
    );
  },

  mounted() {},

  methods: {
    moveModifyNotice() {
      this.$router.push({
        name: "noticemodify",
        params: { id: this.notice.id },
      });
    },
    deleteNotice() {
      if (confirm("정말 삭제하시겠습니까?")) {
        // 확인 (예) 버튼 클릭 시
        deleteNotice(
          this.notice.id,
          ({ data }) => {
            if (data.flag === "success") {
              alert("글 삭제 성공");
              this.moveListNotice();
            }
          },
          (error) => {
            console.log("notice 공지사항 삭제 오류 : " + error);
          }
        );
      } else {
        // 취소 (아니요) 버튼 클릭 시
      }
    },
    moveListNotice() {
      this.$router.push({ name: "noticelist" });
    },
  },
};
</script>

<style scoped>
.notice-detail-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.detail-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.detail-header-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 25px 30px;
  border-top: 2px solid #222222;
  border-bottom: 1px solid #e5e5e5;
  background: #fafafa;
}

.detail-header-wrapper > span {
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.detail-header-wrapper > div > span {
  color: #666;
  font-size: 0.9rem;
  font-weight: bold;
}

.detail-content-wrapper {
  width: 100%;
  padding: 25px 40px;
  color: #4f5a66;
  font-size: 0.9rem;
  border-bottom: 1px solid #e3e7eb;
}

.notice-modify-delete-wrapper {
  width: 100%;
  margin-top: 30px;
  text-align: right;
}

.notice-modify-delete-wrapper > div > button {
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
}

.notice-modify-delete-wrapper > div > input {
  margin-right: 10px;
  border: 1px solid darkgray;
  padding: 5px;
  outline: none;
  border-radius: 5px;
  font-size: 0.9rem;
}

.notice-modify-btn {
  background: #3c90e2;
  margin-right: 10px;
}

.notice-delete-btn {
  background: #c82333;
  margin-right: 10px;
}

.notice-list-btn {
  background: #218838;
}

.notice-comments-wrapper {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
}

.notice-comments-write-wrapper {
  width: 100%;
  padding: 20px;
  background: #fafafa;
  border: 1px solid #e3e7eb;
}

.notice-comments-write-wrapper > textarea {
  width: 100%;
  height: 150px;
  border: 1px solid #e3e7eb;
  padding: 15px;
  background: #fff;
  font-size: 0.9rem;
  outline: none;
  resize: none;
}

.notice-comments-write-wrapper > div {
  text-align: right;
}

.notice-comments-write-wrapper > div > button {
  background: #3c90e2;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
}

.notice-comments-show-wrapper {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 100px;
}
</style>
