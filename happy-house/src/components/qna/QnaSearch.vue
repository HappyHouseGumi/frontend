<template>
  <div class="search-area">
    <div class="search">
      <!-- <select v-model="selectedCategory"> -->
      <select v-model="qnaListData.key" class="selectSubject">
        <!-- <option disabled value="">선택</option> -->
        <option disabled value="null">선택</option>
        <option value="title">제목</option>
        <option value="userName">글쓴이</option>
      </select>
      <!-- <input v-model="searchInput" placeholder="검색어를 입력해주세요." /> -->
      <input v-model="qnaListData.word" placeholder="검색어를 입력해주세요." v-on:keyup.enter="searchBtn" />
      <button class="qna-search-btn" @click="searchBtn">검색</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const qnaStore = "qnaStore";

export default {
  name: "QnaSearch",
  data() {
    return {
      searchInput: "",
      selectedCategory: "",
    };
  },
  computed: {
    ...mapState(qnaStore, ["qnaListData"]),
  },
  methods: {
    // searchBtn() {
    //   if (this.searchInput === "") {
    //     alert("검색어를 입력해주세요!");
    //     return;
    //   }
    //   if (this.selectedCategory === "") {
    //     alert("검색 분류를 선택해주세요!");
    //     return;
    //   }

    //   this.$emit("searchBtn", this.searchInput, this.selectedCategory);
    // },

    searchBtn() {
      this.selectedCategory = this.qnaListData.key;
      this.searchInput = this.qnaListData.word;

      if (this.searchInput === "" || this.searchInput === null) {
        alert("검색어를 입력해주세요!");
        return;
      }
      if (this.selectedCategory === "" || this.selectedCategory === null) {
        alert("검색 분류를 선택해주세요!");
        return;
      }

      this.$emit("searchBtn", this.searchInput, this.selectedCategory);
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

.qna-search-btn {
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

.qna-search-btn:hover {
  color: white;
  background: #007bff;
}

.search > select {
  padding: 0 10px;
  height: 40px;
  width: 100px;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  border: 1px solid #ddd;
}
/* .selectSubject {
  padding: 0 10px;
  outline: none;
  width: 110px;
  height: 40px;
  border: 1px solid #ddd;
  background-size: 20px;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
}

.selectSubject option {
  background: #fff;
  color: black;
  padding: 3px 0;
} */
</style>
