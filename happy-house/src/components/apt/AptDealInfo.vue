<template>
  <div class="apt-info-wrapper">
    <div class="apt-info-header-wrapper">
      <span>{{ clickedMarker.addressName }}</span>
      <button @click="closeAptDealInfo"><font-awesome-icon icon="fa-solid fa-xmark" class="fa-2x" /></button>
    </div>
    <div class="divide-line"></div>
    <div class="apt-info-contents-wrapper">
      <font-awesome-icon icon="fa-solid fa-house" class="fa-3x" />
      <div v-for="(info, index) in aptDealInfo" :key="index" class="apt-info-content">
        <div class="apt-info-drop-down">
          <div class="apt-info-drop-down-selected" @click="(e) => showInfoDetail(e)">
            <span
              ><font-awesome-icon icon="fa-solid fa-caret-down" /> {{ info.dealYear }}년 {{ info.dealMonth }}월
              {{ info.dealDay }}일 거래내역</span
            >
          </div>
          <div class="apt-info-drop-down-options">
            <ul class="hidden">
              <li>
                <i><b>거래 층수</b></i> {{ info.floor }}층
              </li>
              <li>
                <i><b>거래 금액</b></i> {{ info.dealAmount }}만원
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="module">
import { getAptDealInfo } from "@/api/apt";

export default {
  name: "AptDealInfo",
  props: {
    clickedMarker: {},
  },
  data() {
    return {
      aptDealInfo: [],
    };
  },
  methods: {
    closeAptDealInfo() {
      this.$emit("closeAptDealInfo");
    },
    showInfoDetail(e) {
      if (e.path[2].childNodes[1].childNodes[0].classList[0] === "hidden") {
        e.path[2].childNodes[1].childNodes[0].classList.remove("hidden");
        e.path[2].childNodes[1].childNodes[0].classList.add("show");
      } else {
        e.path[2].childNodes[1].childNodes[0].classList.remove("show");
        e.path[2].childNodes[1].childNodes[0].classList.add("hidden");
      }
    },
  },
  created() {
    // 서버에 clickedMarkerCode 넘겨서 아파트 정보 받아오기
    getAptDealInfo(
      this.clickedMarker.code,
      ({ data }) => {
        if (data.flag === "success") {
          this.aptDealInfo = data.data;
        }
      },
      (error) => {
        console.log("아파트 거래정보 불러오기 오류 : " + error);
      }
    );
  },
};
</script>

<style scoped>
.apt-info-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.apt-info-header-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.apt-info-header-wrapper > span {
  font-weight: bold;
  font-size: 1.1rem;
}

.apt-info-header-wrapper > button {
  border: none;
  background: none;
}

.divide-line {
  border: 1px solid black;
  margin-bottom: 30px;
}

.apt-info-contents-wrapper {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.apt-info-content {
  margin-top: 30px;
}

.apt-info-drop-down {
  position: relative;
  margin-bottom: 45px;
}

.apt-info-drop-down-selected > span {
  display: block;
  padding: 15px 10px;
  border-bottom: 2px solid #999;
  border-radius: 2px;
  color: #363636;
  font-weight: bold;
  width: 75%;
  box-sizing: border-box;
  cursor: pointer;
  background: white;
}

.apt-info-drop-down-options > ul {
  list-style: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  border: none;
  background: white;
}

.apt-info-drop-down-options > ul > li {
  padding: 5px;
  display: block;
  color: #363636;
  box-sizing: border-box;
  padding: 5px 10px;
  z-index: 100;
}

.hidden {
  display: none;
}

.show {
  display: blck;
}
</style>
