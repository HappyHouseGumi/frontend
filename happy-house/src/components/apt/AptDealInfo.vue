<template>
  <div class="apt-info-wrapper">
    <div class="apt-info-header-wrapper">
      <span>{{ clickedMarker.addressName }}</span>
      <button @click="closeAptDealInfo">
        <font-awesome-icon icon="fa-solid fa-xmark" class="fa-2x" />
      </button>
    </div>
    <div class="divide-line"></div>
    <div class="apt-info-contents-wrapper">
      <!-- <font-awesome-icon icon="fa-solid fa-house" class="fa-3x" /> -->
      <div id="roadview" style="width: 100%; height: 300px"></div>
      <table>
        <tr>
          <th>거래 일자</th>
          <th>거래 층수</th>
          <th>거래 가격</th>
        </tr>
        <tr v-for="(info, index) in paginatedData" :key="index">
          <td>
            {{ info.dealYear }}년 {{ info.dealMonth }}월 {{ info.dealDay }}일
          </td>
          <td>{{ info.floor }}층</td>
          <td>{{ info.dealAmount }}만원</td>
        </tr>
      </table>
      <div class="btn-cover">
        <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
          이전
        </button>
        <span class="page-count"
          >{{ pageNum + 1 }} / {{ pageCount }} 페이지</span
        >
        <button
          :disabled="pageNum >= pageCount - 1"
          @click="nextPage"
          class="page-btn">
          다음
        </button>
      </div>
      <!-- <div class="btn-cover">
        <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
          이전
        </button>
        <span class="page-count"
          >{{ pageNum + 1 }} / {{ pageCount }} 페이지</span
        >
        <button
          :disabled="pageNum >= pageCount - 1"
          @click="nextPage"
          class="page-btn">
          다음
        </button>
      </div> -->
      <!-- <div
        v-for="(info, index) in this.GET_DEAL"
        :key="index"
        class="apt-info-content">
        <div class="apt-info-drop-down">
          <div
            class="apt-info-drop-down-selected"
            @click="(e) => showInfoDetail(e)">
            <span
              ><font-awesome-icon icon="fa-solid fa-caret-down" />
              {{ info.dealYear }}년 {{ info.dealMonth }}월 {{ info.dealDay }}일
              거래내역</span
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
      </div> -->
    </div>
  </div>
</template>

<script type="module">
// import { getAptDealInfo } from "@/api/apt";
import { mapState, mapGetters } from "vuex";
const aptStore = "aptStore";
export default {
  name: "AptDealInfo",
  props: {
    clickedMarker: {},
  },
  computed: {
    ...mapState(aptStore, ["dealList"]),
    ...mapGetters(aptStore, ["GET_DEAL"]),
    pageCount() {
      let listLeng = this.GET_DEAL.length,
        listSize = this.pageSize,
        page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;

      /*
      아니면 page = Math.floor((listLeng - 1) / listSize) + 1;
      이런식으로 if 문 없이 고칠 수도 있다!
      */
      return page;
    },
    paginatedData() {
      const start = this.pageNum * this.pageSize,
        end = start + this.pageSize;

      return this.aptDealInfo.slice(start, end);
    },
  },
  watch: {
    GET_DEAL: function () {
      this.aptDealInfo = this.GET_DEAL;
      //this.pageSize = 0;
      this.pageNum = 0;
      var position = this.clickedMarker.pos;
      var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
      var roadview = new window.kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
      var roadviewClient = new window.kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
      roadviewClient.getNearestPanoId(position, 50, function (panoId) {
        roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
      });
    },
  },
  created() {},
  updated() {},

  mounted() {
    // var roadviewContainer = document.getElementById("roadview"); //로드뷰를 표시할 div
    // var roadview = new window.kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
    // var roadviewClient = new window.kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
    // var position = this.clickedMarker.pos;
    // console.log(position);
    // // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
    // roadviewClient.getNearestPanoId(position, 50, (panoId) => {
    //   roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
    // });
  },
  data() {
    return {
      pageNum: 0,
      aptDealInfo: [],
      roadview: null,
      roadviewContainer: null,
      roadviewClient: null,
      pageSize: 10,
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
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
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

table {
  width: 100%;
  border-collapse: collapse;
}
table th {
  font-size: 1.2rem;
}
table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}
table tr:first-of-type {
  border-top: 2px solid #404040;
}
table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}
.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}
.btn-cover .page-btn {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
}
.btn-cover .page-count {
  padding: 0 1rem;
}
</style>
