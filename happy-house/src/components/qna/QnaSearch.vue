<template>
  <div class="search-area">
    <div class="search">
      <input placeholder="제목을 검색해주세요." v-model="searchInput" />
      <button @click="searchBtn">검색</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "QnaSearch",
  data() {
    return {
      searchInput: "",
    };
  },
  methods: {
    searchBtn() {
      if (this.searchInput === "") {
        alert("검색어를 입력해주세요!");
        return;
      }
      this.$emit("searchBtn", this.searchInput);
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
</style>
