<template>
  <div class="question-detail-wrapper">
    <!-- 질문 상세 영역 -->
    <div class="detail-wrapper">
      <!-- 질문 제목 작성자 작성일시 -->
      <div class="detail-header-wrapper">
        <span>{{ question.title }}</span>
        <div>
          <span>{{ question.userName }}</span> |
          <span>{{ question.regDate }}</span>
        </div>
      </div>
      <!-- 질문 내용 -->
      <div class="detail-content-wrapper">{{ question.content }}</div>
    </div>
    <!-- 수정 삭제 영역 -->
    <div class="question-modify-wrapper">
      <button class="question-modify-btn" @click="moveModifyQna">수정</button>
      <button class="question-delete-btn" @click="deleteQna">삭제</button>
    </div>
    <!-- 답글 영역 -->
    <div class="comments-wrapper">
      <!-- 답글 쓰는 영역 : 관리자만 보이게 하기 -->
      <div class="comments-write-wrapper">
        <textarea placeholder="답글을 입력하세요." />
        <div><button>답글 등록</button></div>
      </div>
      <!-- 답글 보여주는 영역 -->
      <div class="comments-show-wrapper">
        <QnaComment v-for="(comment, index) in comments" :key="index" :comment="comment" />
      </div>
    </div>
  </div>
</template>

<script type="module">
import QnaComment from "@/components/qna/QnaComment.vue";
import http from "@/api/http.js";

export default {
  name: "QnaDetail",
  components: {
    QnaComment,
  },
  data() {
    return {
      // 임시 데이터
      question: {},
      comments: [],
    };
  },
  methods: {
    moveModifyQna() {
      // 아이디 확인 필요
      this.$router.push({ name: "qnamodify" });
    },
    deleteQna() {
      // 아이디 확인 필요
      if (confirm("정말 삭제하시겠습니까?")) {
        // 서버에 삭제 요청
        this.$router.push({ path: "/qna/list" });
      } else return;
    },
  },
  created() {
    // 서버에서 deatil 정보 가져오기
    http.get(`qna/${this.$route.params.id}`).then(({ data }) => {
      if (data.flag === "success") {
        this.question = data.data[0];
      } else {
        // 추후
      }
    });
  },
};
</script>

<style scoped>
.question-detail-wrapper {
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

.question-modify-wrapper {
  width: 100%;
  margin-top: 30px;
  text-align: right;
}

.question-modify-wrapper > button {
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
}

.question-modify-btn {
  background: #3c90e2;
  margin-right: 10px;
}

.question-delete-btn {
  background: #c82333;
}

.comments-wrapper {
  width: 100%;
  margin-top: 50px;
}

.comments-write-wrapper {
  width: 100%;
  padding: 20px;
  background: #fafafa;
  border: 1px solid #e3e7eb;
}

.comments-write-wrapper > textarea {
  width: 100%;
  height: 150px;
  border: 1px solid #e3e7eb;
  padding: 15px;
  background: #fff;
  font-size: 0.9rem;
  outline: none;
  resize: none;
}

.comments-write-wrapper > div {
  text-align: right;
}

.comments-write-wrapper > div > button {
  background: #3c90e2;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
}

.comments-show-wrapper {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 100px;
}
</style>
