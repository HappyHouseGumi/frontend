<template>
  <div class="search-area">
    <div class="search">
      <input placeholder="제목을 입력해주세요." v-model="noticeListData.word" v-on:keyup.enter="searchBtn" />
      <button @click="searchBtn">검색</button>
    </div>
  </div>
</template>

<script type="module">
import { mapState } from "vuex";
const noticeStore = "noticeStore";

export default {
  name: "NoticeSearch",
  data() {
    return {};
  },

  computed: {
    ...mapState(noticeStore, ["noticeListData"]),
  },

  methods: {
    searchBtn() {
      if (this.noticeListData.word === "" || this.noticeListData.word === null) {
        alert("검색어를 입력해주세요!");
        return;
      }

      let searchParam = {};
      searchParam.searchInput = this.noticeListData.word;

      this.$emit("searchParam", searchParam);
    },
  },
};
</script>

<style scoped>
.search-area {
  width: 100%;
  height: 120px;
  padding: 30px 120px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #f8f8f8;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
}

.search {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  align-items: center;
}

.search > input {
  margin: 0 10px;
  width: 475px;
  height: 40px;
  padding: 0 10px;
  outline: none;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.search > button {
  width: 115px;
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

.search > button:hover {
  color: white;
  background: #007bff;
}
</style>
