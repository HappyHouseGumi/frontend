<template>
  <div class="content">
    <div class="main">
      <div class="search-area">
        <div class="search">
          <input placeholder="주소를 검색해주세요." v-model="inputLocation" />
          <button @click="searchLocation">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="fa-2x" />
          </button>
        </div>
        <div v-if="isResultOpen" class="search-result">
          <MainSearchResultItem v-for="(loc, index) in resultLocations" :key="index" :loc="loc.address_name" />
        </div>
      </div>
      <div class="bg"></div>
    </div>
  </div>
</template>

<script type="module">
import MainSearchResultItem from "@/components/main/MainSearchResultItem.vue";
import { getKakaoLocation } from "@/api/kakao";

export default {
  name: "MainSearch",
  components: {
    MainSearchResultItem,
  },
  data() {
    return {
      isResultOpen: false,
      inputLocation: "",
      resultLocations: [],
    };
  },
  methods: {
    searchLocation() {
      if (this.inputLocation !== "") {
        getKakaoLocation(
          this.inputLocation,
          ({ data }) => {
            if (data.documents.length) {
              this.resultLocations = data.documents;
              this.isResultOpen = true;
            } else {
              this.isResultOpen = false;
            }
          },
          (error) => {
            console.log("kakao api 불러오기 오류 : " + error);
          }
        );
      }
    },
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
