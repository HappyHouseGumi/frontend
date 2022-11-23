<template>
  <div>
    <LikeSearch @searchParam="searchList" />
    <div class="like-list-item-wrapper">
      <LikeListItem :likes="likes" />
    </div>
    <PaginationCom :pageSetting="pageDataSetting(total, limit, block, this.page)" @paging="pagingMethod" />
  </div>
</template>

<script type="module">
import LikeListItem from "@/components/like/LikeListItem.vue";
import LikeSearch from "@/components/like/LikeSearch.vue";
import PaginationCom from "@/components/common/PaginationCom.vue";
import { getLikeList } from "@/api/like";

import { apiInstance } from "@/api/index";
const api = apiInstance();

import { mapState, mapMutations } from "vuex";
const likeStore = "likeStore";

export default {
  name: "LikeList",
  components: {
    LikeListItem,
    LikeSearch,
    PaginationCom,
  },

  data() {
    return {
      likes: [],
      loginId: null,
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

  created() {
    if (localStorage.getItem("loginUser") != null) {
      const id = JSON.parse(localStorage.getItem("loginUser")).userId;
      this.loginId = id;
    }
    this.params.pgno = this.likeListData.pgno;
    this.params.key = this.likeListData.key;
    this.params.word = this.likeListData.word;

    const getLike = async (param) => {
      try {
        let data = await api.post(`/like/count`, param);
        data = data.data;
        if (data.flag === "success") {
          // console.log("Like 리스트 개수 :", data.data);
          this.total = data.data[0];
        }
        data = await api.post(`/like/list`, param);
        data = data.data;
        if (data.flag === "success") {
          this.likes = data.data;
          // console.log("Like List 출력 :\n", this.likes);
        }
      } catch (error) {
        console.log("Like 리스트 : ", error);
      }
    };

    getLike(this.params);
  },

  mounted() {},

  computed: {
    ...mapState(likeStore, ["likeListData"]),
  },

  methods: {
    ...mapMutations(likeStore, { setLikeListData: "SET_LIKE_LIST_DATA" }),

    searchList(searchparam) {
      this.params.key = searchparam.searchClass;
      this.params.word = searchparam.searchInput;

      this.setLikeListData(this.params);
      console.log(this.params);

      const getBaord = async (param) => {
        try {
          let data = await api.post(`/like/count`, param);
          console.log(param);
          data = data.data;
          if (data.flag === "success") {
            this.total = data.data[0];
          }
          data = await api.post(`/like/list`, param);
          data = data.data;
          if (data.flag === "success") {
            this.likes = data.data;
          } else {
            this.likes = null;
          }
        } catch (error) {
          console.log("Like Board 리스트 : ", error);
        }
      };

      getBaord(this.params);
    },

    pagingMethod(page) {
      this.page = page;
      this.params.pgno = page;

      this.setLikeListData(this.params);

      getLikeList(
        this.params,
        ({ data }) => {
          if (data.flag === "success") {
            this.likes = data.data;
            // console.log("페이지 이동 후!!!\nlike List 출력 :\n", this.likes);
          } else {
            console.log("Like 리스트 검색으로 가져오기 오류: ", data.data[0].msg);
          }
        },
        (error) => {
          console.log("Like 리스트 검색으로 가져오기 오류 : " + error);
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
.like-regist-btn {
  margin: 30px 0;
  float: right;
  width: 120px;
  height: 40px;
  font-weight: bold;
  color: white;
  border: 0;
  outline: 0;
  background: #3c90e2;
  border-radius: 5px;
}

.like-list-item-wrapper {
  margin-top: 50px;
  margin-bottom: 30px;
  width: 100%;
  height: 600px;
}
</style>
