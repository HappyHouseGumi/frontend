<template>
  <div class="search-area">
    <div class="search">
      <select v-model="searchClass" class="selectSubject">
        <option value="subject">지역</option>
        <option value="title">제목</option>
      </select>
      <input placeholder="검색할 내용을 입력해주세요." v-model="searchInput" />
      <button @click="searchBtn">검색</button>
    </div>
  </div>
</template>

<script type="module">
export default {
  name: "BoardSearch",
  data() {
    return {
      searchClass: "subject",
      searchInput: "",
    };
  },
  methods: {
    searchBtn() {
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
  background: #f8f8f8;
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
  font-weight: bold;
  outline: none;
  border: 1px solid #3c90e2;
}

.search > button {
  width: 115px;
  height: 40px;
  font-weight: bold;
  color: white;
  border: 0;
  outline: 0;
  background: #3c90e2;
  border-radius: 5px;
}

.selectSubject {
  width: 110px;
  height: 40px;
  border: 1px solid #3c90e2;
  background-size: 20px;
  padding: 5px 30px 5px 10px;
  border-radius: 4px;
  outline: 1;
  margin-right: 8px;
}
.selectSubject option {
  background: #fff;
  color: black;
  padding: 3px 0;
}
</style>
