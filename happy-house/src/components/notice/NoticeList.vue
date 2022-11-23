<template>
  <div>
    <NoticeSearch @searchParam="searchList" />
    <div v-if="loginId == 1">
      <!-- 관리자 계정일 시만 글 등록 가능 -->
      <button class="notice-regist-btn" @click="moveRegistNotice">글 등록하기</button>
    </div>
    <div class="notice-list-item-wrapper">
      <NoticeListItem :notices="notices" />
    </div>
    <PaginationCom :pageSetting="pageDataSetting(total, limit, block, this.page)" @paging="pagingMethod" />
  </div>
</template>

<script type="module">
import NoticeListItem from "@/components/notice/NoticeListItem.vue";
import NoticeSearch from "@/components/notice/NoticeSearch.vue";
import PaginationCom from "@/components/common/PaginationCom.vue";
import { getNoticeList } from "@/api/notice";

import { apiInstance } from "@/api/index";
const api = apiInstance();

import { mapState, mapMutations } from "vuex";
const noticeStore = "noticeStore";

export default {
  name: "NoticeList",
  components: {
    NoticeListItem,
    NoticeSearch,
    PaginationCom,
  },

  data() {
    return {
      notices: [],
      loginId: null,
      params: {
        pgno: 1,
        word: null,
      },
      total: 10,
      page: 1,
      limit: 10,
      block: 5,
    };
  },

  created() {
    if (localStorage.getItem("loginUser") != null) {
      const id = JSON.parse(localStorage.getItem("loginUser")).userId;
      this.loginId = id;
    }
    this.params.pgno = this.noticeListData.pgno;
    this.params.word = this.noticeListData.word;

    const getNotice = async (param) => {
      try {
        let data = await api.post(`/notice/count`, param);
        data = data.data;
        if (data.flag === "success") {
          this.total = data.data[0];
        }
        data = await api.post(`/notice/list`, param);
        data = data.data;
        if (data.flag === "success") {
          this.notices = data.data;
        }
      } catch (error) {
        console.log("Notice 리스트 : ", error);
      }
    };

    getNotice(this.params);
  },

  mounted() {},

  computed: {
    ...mapState(noticeStore, ["noticeListData"]),
  },

  methods: {
    ...mapMutations(noticeStore, { setNoticeListData: "SET_NOTICE_LIST_DATA" }),

    moveRegistNotice() {
      this.$router.push({ name: "noticeregist" });
    },

    searchList(searchparam) {
      this.params.word = searchparam.searchInput;

      this.setNoticeListData(this.params);

      const getNotice = async (param) => {
        try {
          let data = await api.post(`/notice/count`, param);
          data = data.data;
          if (data.flag === "success") {
            this.total = data.data[0];
          }
          data = await api.post(`/notice/list`, param);
          data = data.data;
          if (data.flag === "success") {
            this.notices = data.data;
          } else {
            this.notices = null;
          }
        } catch (error) {
          console.log("Notice 리스트 : ", error);
        }
      };

      getNotice(this.params);
    },

    pagingMethod(page) {
      this.page = page;
      this.params.pgno = page;

      this.setNoticeListData(this.params);

      getNoticeList(
        this.params,
        ({ data }) => {
          if (data.flag === "success") {
            this.notices = data.data;
          } else {
            console.log("Notice 리스트 검색으로 가져오기 오류: ", data.data[0].msg);
          }
        },
        (error) => {
          console.log("Notice 리스트 검색으로 가져오기 오류 : " + error);
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
};
</script>

<style scoped>
.notice-regist-btn {
  margin: 30px 0;
  float: right;
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

.notice-regist-btn:hover {
  color: white;
  background: #007bff;
}

.notice-list-item-wrapper {
  margin-top: 50px;
  margin-bottom: 30px;
  width: 100%;
  height: 600px;
}
</style>
