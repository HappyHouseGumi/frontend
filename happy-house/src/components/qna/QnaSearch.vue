<template>
  <div class="search-area">
    <div class="search">
      <select>
        <option>제목</option>
        <option>이름</option>
      </select>
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
  border-radius: 10px;
  background: #f8f8f8;
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
}

.search > button {
  width: 115px;
  height: 40px;
  font-weight: bold;
  color: white;
  border: 0;
  outline: 0;
  background: #0069d9;
  border-radius: 10px;
}

.search > select {
  padding: 10px 10px;
  width: 100px;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  border: 1px solid #ddd;
}
</style>
