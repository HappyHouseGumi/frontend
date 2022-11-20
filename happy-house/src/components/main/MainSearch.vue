<template>
  <div class="content">
    <div class="main">
      <div class="search-area">
        <div class="search">
          <input placeholder="지역명을 검색해주세요." />
          <button><font-awesome-icon icon="fa-solid fa-magnifying-glass" class="fa-2x" /></button>
        </div>
        <div class="search-result">
          <MainSearchResultItem v-for="(t, index) in test" :key="index" :loc="t" />
        </div>
      </div>
      <div class="bg"></div>
    </div>
  </div>
</template>

<script type="module">
import MainSearchResultItem from "@/components/main/MainSearchResultItem.vue";

export default {
  name: "MainSearch",
  components: {
    MainSearchResultItem,
  },
  data() {
    return {
      test: [
        "달서구 진천동",
        "달서구 상인동",
        "달성구 송현동",
        "달서구 용산동",
        "달서구 진천동",
        "달서구 상인동",
        "달성구 송현동",
        "달서구 용산동",
      ],
    };
  },
};
</script>

<style scoped>
.content {
  position: relative;
  width: 100%;
  z-index: 0;
}

.main {
  background: #000;
  height: 720px;
  overflow: hidden;
  z-index: 2;
}

.bg {
  background: #000 url("@/assets/images/bg-main1.jpg") center no-repeat;
  background-size: cover;
  opacity: 0.3;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.search-area {
  position: relative;
  width: 850px;
  margin: 0 auto;
  padding-top: 150px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.search {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 750px;
  height: 70px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 35px;
}

.search > input {
  width: 580px;
  height: 100%;
  padding: 0 10px;
  background: none;
  border: none;
  outline: 0;
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
}

.search > input::placeholder {
  color: white;
  font-weight: bold;
}

.search > button {
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  font-weight: bold;
}

.search-result {
  margin-top: 10px;
  width: 600px;
  height: 250px;
  border-radius: 20px;
  background: #2e363e;
  overflow-y: scroll;
}

.search-result::-webkit-scrollbar {
  width: 8px;
}

.search-result::-webkit-scrollbar-thumb {
  height: 30%;
  background: #696c73;
  border-radius: 10px;
}

.search-result::-webkit-scrollbar-track {
  background: none;
}
</style>
