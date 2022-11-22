<template>
  <div class="search-area">
    <div class="search">
      <input placeholder="제목을 입력해주세요." v-model="searchInput" />
      <button @click="searchBtn">검색</button>
    </div>
  </div>
</template>

<script type="module">
export default {
  name: "NoticeSearch",
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
