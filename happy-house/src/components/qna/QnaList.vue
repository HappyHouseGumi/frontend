<template>
  <div>
    <QnaSearch @searchBtn="searchBtn" />

    <div class="qna-list-button-wrapper">
      <button v-if="isSearchedList" class="qna-list-btn" @click="moveQnaList">목록</button>
      <button class="qna-regist-btn" @click="moveRegistQna">1:1 문의</button>
    </div>
    <div class="qna-list-item-wrapper">
      <QnaListItem :questions="questions" />
    </div>

    <pagination-com :pageSetting="pageDataSetting(total, limit, block, this.page)" @paging="pagingMethod" />
  </div>
</template>

<script type="module">
import QnaSearch from "@/components/qna/QnaSearch.vue";
import QnaListItem from "@/components/qna/QnaListItem.vue";
import PaginationCom from "@/components/common/PaginationCom.vue";

// import { getQnaList, getQnaSearchList } from "@/api/qna";
import { getQnaPagingList } from "@/api/qna";

import { apiInstance } from "@/api/index";
const api = apiInstance();

import { mapState, mapMutations } from "vuex";
const qnaStore = "qnaStore";

export default {
  name: "QnaList",
  components: {
    QnaSearch,
    QnaListItem,
    PaginationCom,
  },
  data() {
    return {
      questions: [],
      isSearchedList: false,
      params: {
        pgno: 1,
        key: null,
        word: null,
      },
      total: 10,
      page: 1,
      limit: 10,
      block: 5,
    };
  },
  methods: {
    moveRegistQna() {
      this.$router.push({ path: "/qna/regist" });
    },
    moveQnaList() {
      this.$router.go();
    },
    // searchBtn(searchInput, selectedCategory) {
    //   getQnaSearchList(
    //     selectedCategory,
    //     searchInput,
    //     ({ data }) => {
    //       if (data.flag === "success") {
    //         this.questions = data.data;
    //         this.isSearchedList = true;
    //       } else {
    //         alert("검색어와 일치하는 항목이 없습니다.");
    //         this.isSearchedList = false;
    //       }
    //     },
    //     (error) => {
    //       console.log("QnA 검색결과 리스트 가져오기 오류 : " + error);
    //     }
    //   );
    // },

    ...mapMutations(qnaStore, { setQnaListData: "SET_QNA_LIST_DATA" }),

    searchBtn(searchInput, selectedCategory) {
      this.params.key = selectedCategory;
      this.params.word = searchInput;

      this.setQnaListData(this.params);

      const getQna = async (param) => {
        try {
          let data = await api.post(`/qna/count`, param);
          data = data.data;
          if (data.flag === "success") {
            this.total = data.data[0];
            this.isSearchedList = true;
          }
          data = await api.post(`/qna/list`, param);
          data = data.data;
          if (data.flag === "success") {
            this.questions = data.data;
          } else {
            this.questions = null;
          }
        } catch (error) {
          console.log("QnA 리스트 : ", error);
        }
      };

      getQna(this.params);
    },

    pagingMethod(page) {
      this.page = page;
      this.params.pgno = page;

      this.setQnaListData(this.params);

      getQnaPagingList(
        this.params,
        ({ data }) => {
          if (data.flag === "success") {
            this.questions = data.data;
            // console.log("페이지 이동 후!!!\nqna List 출력 :\n", this.questions);
          } else {
            console.log("QnA 리스트 검색으로 가져오기 오류: ", data.data[0].msg);
          }
        },
        (error) => {
          console.log("QnA 리스트 검색으로 가져오기 오류 : " + error);
        }
      );

      this.pageDataSetting(this.total, this.limit, this.block, page);
    },

    pageDataSetting(total, limit, block, page) {
      const totalPage = Math.ceil(total / limit);
      let currentPage = page;
      const first = currentPage > 1 ? parseInt(currentPage, 10) - parseInt(1, 10) : null;
      const end = totalPage !== currentPage ? parseInt(currentPage, 10) + parseInt(1, 10) : null;

      let startIndex = (Math.ceil(currentPage / block) - 1) * block + 1;
      let endIndex = startIndex + block > totalPage ? totalPage : startIndex + block - 1;
      let list = [];
      for (let index = startIndex; index <= endIndex; index++) {
        list.push(index);
      }
      return { first, end, list, currentPage };
    },
  },

  computed: {
    ...mapState(qnaStore, ["qnaListData"]),
  },

  created() {
    // getQnaList(
    //   ({ data }) => {
    //     if (data.flag === "success") this.questions = data.data;
    //   },
    //   (error) => {
    //     console.log("QnA 리스트 가져오기 오류 : " + error);
    //   }
    // );

    this.params.pgno = this.qnaListData.pgno;
    this.params.key = this.qnaListData.key;
    this.params.word = this.qnaListData.word;

    if (this.params.key != null && this.params.word) {
      this.isSearchedList = true;
    }

    const getQnA = async (param) => {
      try {
        let data = await api.post(`/qna/count`, param);
        data = data.data;
        if (data.flag === "success") {
          // console.log("QnA 리스트 개수 :", data.data);
          this.total = data.data[0];
        }
        data = await api.post(`/qna/list`, param);
        data = data.data;
        if (data.flag === "success") {
          this.questions = data.data;
          // console.log("QnA List 출력 :\n", this.questions);
        }
      } catch (error) {
        console.log("QnA 리스트 : ", error);
      }
    };

    getQnA(this.params);
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.qna-list-button-wrapper {
  float: right;
  display: flex;
  flex-direction: row;
  margin: 30px 0;
}

.qna-regist-btn,
.qna-list-btn {
  width: 110px;
  height: 40px;
  font-weight: bold;
  color: #007bff;
  border: 0;
  outline: 0;
  background: white;
  border: 1px solid #007bff;
  border-radius: 10px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.qna-regist-btn:hover,
.qna-list-btn:hover {
  color: white;
  background: #007bff;
}
.qna-list-btn {
  margin-right: 20px;
}

.qna-list-item-wrapper {
  margin-top: 50px;
  margin-bottom: 40px;
  width: 100%;
}
</style>
