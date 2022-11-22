<template>
  <div class="search-area">
    <div class="search">
      <select v-model="boardListData.key" class="selectSubject">
        <option disabled value="">선택</option>
        <option value="subject">지역</option>
        <option value="title">제목</option>
      </select>
      <input placeholder="검색할 내용을 입력해주세요." v-model="boardListData.word" />
      <button @click="searchBtn">검색</button>
    </div>
  </div>
</template>

<script type="module">
import { mapState } from "vuex";

const boardStore = "boardStore";

export default {
  name: "BoardSearch",

  data() {
    return {
      searchClass: "subject",
      searchInput: "",
    };
  },

  computed: {
    ...mapState(boardStore, ["boardListData"]),
  },

  methods: {
    searchBtn() {
      this.searchClass = this.boardListData.key;
      this.searchInput = this.boardListData.word;

      if (this.searchClass === "") {
        alert("검색할 지역을 선택해주세요!");
        return;
      }
      if (this.searchInput === "") {
        alert("검색어를 입력해주세요!");
        return;
      }

      let searchParam = {};
      searchParam.searchClass = this.searchClass;
      searchParam.searchInput = this.searchInput;

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
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
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
  font-size: 0.9rem;
}

.search > button {
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

.search > button:hover {
  color: white;
  background: #007bff;
}

.selectSubject {
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
}
</style>
