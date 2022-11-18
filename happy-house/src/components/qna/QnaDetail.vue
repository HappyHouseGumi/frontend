<template>
  <div class="qna-detail-wrapper">
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
    <div class="qna-modify-delete-wrapper">
      <div v-if="isWriter">
        <button class="qna-modify-btn" @click="moveModifyQna">수정</button>
        <button class="qna-delete-btn" @click="deleteQna">삭제</button>
      </div>
      <div v-else>
        <input type="password" v-model="password" placeholder="비밀번호 확인" />
        <button class="check-writer-btn" @click="checkWriter">확인</button>
      </div>
    </div>
    <!-- 답글 영역 -->
    <div class="qna-comments-wrapper">
      <!-- 답글 쓰는 영역 : 관리자만 보이게 하기 -->
      <div class="qna-comments-write-wrapper">
        <textarea placeholder="답글을 입력하세요." v-model="comment.content" />
        <div><button @click="registComment">답글 등록</button></div>
      </div>
      <!-- 답글 보여주는 영역 -->
      <div class="qna-comments-show-wrapper">
        <QnaComment
          v-for="(comment, index) in originComments"
          :key="index"
          :idx="index"
          :comment="comment"
          @changData="changData"
        />
      </div>
    </div>
  </div>
</template>

<script type="module">
import QnaComment from "@/components/qna/QnaComment.vue";
// import http from "@/api/index.js";
import { deleteQna, registQnaComment, getQnaDetail, getQnaComment } from "@/api/qna";

export default {
  name: "QnaDetail",
  components: {
    QnaComment,
  },
  data() {
    return {
      password: "",
      isWriter: false,
      question: {},
      comment: {
        content: "",
        qnaId: this.$route.params.id,
        userId: 4, // 임시 데이터
      },
      originComments: [], // 서버로부터 받는 댓글 리스트
    };
  },
  methods: {
    checkWriter() {
      if (this.password === this.question.password) {
        this.isWriter = true;
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    },
    moveModifyQna() {
      this.$router.push({
        name: "qnamodify",
        params: { id: this.question.id },
      });
    },
    deleteQna() {
      if (confirm("정말 삭제하시겠습니까?")) {
        deleteQna(
          this.question.id,
          ({ data }) => {
            if (data.flag === "success") {
              alert("글 삭제 완료!!");
              this.$router.push({ path: "/qna/list" });
            }
          },
          (error) => {
            console.log("QnA 삭제 오류 : " + error);
          }
        );
        // http.delete(`/qna/${this.question.id}`).then(({ data }) => {
        //   if (data.flag === "success") {
        //     alert("글 삭제 완료!!");
        //     this.$router.push({ path: "/qna/list" });
        //   } else {
        //     // 추후
        //   }
        // });
      } else return;
    },
    registComment() {
      registQnaComment(
        this.comment,
        ({ data }) => {
          if (data.flag === "success") {
            alert("댓글 작성 완료!!");
            this.originComments = data.data;
            this.comment.content = "";
          }
        },
        (error) => console.log("QnA comment 등록 오류 : " + error)
      );
      // http.post("/qnacomment", this.comment).then(({ data }) => {
      //   if (data.flag === "success") {
      //     alert("댓글 작성 완료!!");
      //     this.originComments = data.data;
      //     this.comment.content = "";
      //   }
      // });
    },
    changData(idx, content) {
      this.originComments[idx].content = content.content;
    },
  },
  created() {
    getQnaDetail(
      this.$route.params.id,
      ({ data }) => {
        if (data.flag === "success") {
          this.question = data.data[0];
        }
      },
      (error) => {
        console.log("QnA 상세보기 오류 : " + error);
      }
    );
    // http.get(`/qna/${this.$route.params.id}`).then(({ data }) => {
    //   if (data.flag === "success") {
    //     this.question = data.data[0];
    //   } else {
    //     // 추후
    //   }
    // });

    getQnaComment(
      this.$route.params.id,
      ({ data }) => {
        if (data.flag === "success") {
          this.originComments = data.data;
        }
      },
      (error) => {
        console.log("QnA comment 불러오기 오류 : " + error);
      }
    );
    // http.get(`/qnacomment/${this.$route.params.id}`).then(({ data }) => {
    //   if (data.flag === "success") {
    //     this.originComments = data.data;
    //   }
    // });
  },
};
</script>

<style scoped>
.qna-detail-wrapper {
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

.qna-modify-delete-wrapper {
  width: 100%;
  margin-top: 30px;
  text-align: right;
}

.qna-modify-delete-wrapper > div > button {
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
}

.qna-modify-delete-wrapper > div > input {
  margin-right: 10px;
  border: 1px solid #666;
  padding: 5px;
  outline: none;
  border-radius: 5px;
}

.qna-modify-btn {
  background: #3c90e2;
  margin-right: 10px;
}

.qna-delete-btn {
  background: #c82333;
}

.check-writer-btn {
  background: #218838;
}

.qna-comments-wrapper {
  width: 100%;
  margin-top: 50px;
}

.qna-comments-write-wrapper {
  width: 100%;
  padding: 20px;
  background: #fafafa;
  border: 1px solid #e3e7eb;
}

.qna-comments-write-wrapper > textarea {
  width: 100%;
  height: 150px;
  border: 1px solid #e3e7eb;
  padding: 15px;
  background: #fff;
  font-size: 0.9rem;
  outline: none;
  resize: none;
}

.qna-comments-write-wrapper > div {
  text-align: right;
}

.qna-comments-write-wrapper > div > button {
  background: #3c90e2;
  color: white;
  font-weight: bold;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
}

.qna-comments-show-wrapper {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 100px;
}
</style>
