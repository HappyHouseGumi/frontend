<template>
  <div class="apt-info-wrapper">
    <div class="apt-info-header-wrapper">
      <div>
        <button @click="moveTo" style="cursor: pointer">
          <font-awesome-icon icon="fa-solid fa-location-arrow" class="fa-lg" />
        </button>
        <button v-if="favor === false" style="color: #ffc10a" @click="favorPress">
          <font-awesome-icon icon="fa-regular fa-star" />
        </button>

        <button v-else style="color: #ffc10a" @click="favorPress">
          <font-awesome-icon icon="fa-solid fa-star" />
        </button>
        <span style="font-size: 15px; font-weight: bold">학교 : </span>
        <span style="font-size: 15px; color: #46bd7b; font-weight: bold" v-if="sc.length > 3">좋음 </span>
        <span style="font-size: 15px; color: #ff8c0a; font-weight: bold" v-else-if="sc.length > 1">보통 </span>
        <span style="font-size: 15px; color: #cd0000; font-weight: bold" v-else>나쁨 </span>
        <span style="font-weight: bold">/</span>
        <span style="font-size: 15px; font-weight: bold"> 카페 : </span>
        <span style="font-size: 15px; color: #46bd7b; font-weight: bold" v-if="ce.length > 12">좋음 </span>
        <span style="font-size: 15px; color: #ff8c0a; font-weight: bold" v-else-if="ce.length > 6">보통 </span>
        <span style="font-size: 15px; color: #cd0000; font-weight: bold" v-else>나쁨 </span>
        <span style="font-weight: bold">/</span>
        <span style="font-size: 15px; font-weight: bold"> 편의점 : </span>
        <span style="font-size: 15px; color: #46bd7b; font-weight: bold" v-if="cs.length > 10">좋음 </span>
        <span style="font-size: 15px; color: #ff8c0a; font-weight: bold" v-else-if="cs.length > 5">보통 </span>
        <span style="font-size: 15px; color: #cd0000; font-weight: bold" v-else>나쁨 </span>
      </div>
      <button @click="closeAptDealInfo">
        <font-awesome-icon icon="fa-solid fa-xmark" class="fa-lg" />
      </button>
    </div>
    <div style="border: 1px solid #f5f5f5; margin-bottom: 10px"></div>
    <div class="apt-info-contents-wrapper">
      <div id="roadview" style="width: 100%; height: 300px; margin-bottom: 30px; border-radius: 10px"></div>
      <div style="margin-bottom: 20px">
        <div style="margin-bottom: 10px">
          <span style="color: black; font-size: 18px; font-weight: 600; line-height: 22px">{{
            clickedMarker.addressName
          }}</span>
        </div>
        <div style="border: 1px solid #f5f5f5; margin-bottom: 10px"></div>
        <div>
          <div style="margin-bottom: 10px">
            <span style="color: #000000; font-size: 16px">최근 실거래가</span>
            <span style="color: #666; font-size: 12px; margin-left: 5px">{{ recentDeal.date }}</span>
          </div>
          <span style="color: #000000; font-size: 22px; font-weight: bold">{{ recentDeal.price }}</span>
        </div>
      </div>
      <div class="chart-wrapper" style="margin-bottom: 20px">
        <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData" />
      </div>
      <table>
        <thead>
          <tr>
            <th>거래 일자</th>
            <th>거래 층수</th>
            <th>거래 가격</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(info, index) in paginatedData" :key="index">
            <td>{{ info.dealYear }}년 {{ info.dealMonth }}월 {{ info.dealDay }}일</td>
            <td>{{ info.floor }}층</td>
            <td>{{ info.dealAmount }}만원</td>
          </tr>
        </tbody>
      </table>
      <div class="btn-cover">
        <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">이전</button>
        <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
        <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">다음</button>
      </div>
      <div style="border: 1px solid #f5f5f5; margin-top: 20px; margin-bottom: 20px"></div>
      <div v-if="hasBoard">
        <span style="font-weight: bold; font-size: 1.1rem">지역 관련 게시글</span>
        <table style="margin-top: 20px">
          <thead style="background: #008c8c">
            <tr>
              <th>제목</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(board, index) in boards" :key="index" @click="(el) => showModal(el, board)">
              <td>
                {{ board.title }}
              </td>
              <td>{{ board.nickName }}</td>
            </tr>
            <AptBoardModal v-if="isShowModal" @close="isShowModal = false" :modalInfo="modalInfo" />
          </tbody>
        </table>
        <div style="border: 1px solid #f5f5f5; margin-top: 20px; margin-bottom: 20px"></div>
      </div>
    </div>
  </div>
</template>

<script type="module">
import { mapState, mapGetters } from "vuex";
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import { getBoardListByArea } from "@/api/board";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";
import AptBoardModal from "@/components/apt/AptBoardModal.vue";

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement);

const aptStore = "aptStore";

export default {
  name: "AptDealInfo",
  components: {
    LineChartGenerator,
    AptBoardModal,
  },
  data() {
    return {
      modalInfo: {},
      cs: [],
      ce: [],
      sc: [],
      isShowModal: false,
      pageNum: 0,
      aptDealInfo: [],
      roadview: null,
      roadviewContainer: null,
      roadviewClient: null,
      favor: null,
      boards: null,
      searchName: "",
      pageSize: 10,
      recentDeal: {
        date: "",
        price: "",
      },
      chartData: {
        labels: [],
        datasets: [
          {
            label: "연별 최근 거래 금액",
            backgroundColor: "#0069d9;",
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      hasBoard: false,
    };
  },
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
      this.pageNum = 0;
      var position = this.clickedMarker.pos;
      var roadviewContainer = document.getElementById("roadview");
      var roadview = new window.kakao.maps.Roadview(roadviewContainer);
      var roadviewClient = new window.kakao.maps.RoadviewClient();
      this.sc = this.clickedMarker.com["sc"].documents;
      this.ce = this.clickedMarker.com["ce"].documents;
      this.cs = this.clickedMarker.com["cs"].documents;

      if (!this.sc) {
        this.sc = [];
      }
      if (!this.ce) {
        this.ce = [];
      }
      if (!this.cs) {
        this.cs = [];
      }
      if (this.clickedMarker.favor) {
        this.favor = this.clickedMarker.favor;
      }
      roadviewClient.getNearestPanoId(position, 50, function (panoId) {
        if (panoId) roadview.setPanoId(panoId, position);
        else {
          position = new window.kakao.maps.LatLng(37.5013068, 127.0396597);
          roadviewClient.getNearestPanoId(position, 50, function (panoId) {
            roadview.setPanoId(panoId, position);
          });
        }
      });

      // 최근 실거래가
      const recentDeal = this.aptDealInfo.filter((el, index) => index === 0)[0];
      this.recentDeal.date = recentDeal.dealYear + "." + recentDeal.dealMonth + "." + recentDeal.dealDay;
      this.recentDeal.price = recentDeal.dealAmount + " 만원";
      // 차트
      const chartList = this.aptDealInfo
        .filter((arr, index, callback) => index === callback.findIndex((el) => el.dealYear === arr.dealYear))
        .sort((a, b) => a.dealYear - b.dealYear);

      this.chartData.labels = [];
      this.chartData.datasets[0].data = [];

      chartList.map((el) => {
        this.chartData.labels.push(el.dealYear);
        const dealAmount = el.dealAmount.split(",").join("");
        this.chartData.datasets[0].data.push(dealAmount);
      });
      this.searchName = this.clickedMarker.sidoName + " " + this.clickedMarker.gugunName;
      if (this.clickedMarker.sidoName === "세종특별자치시") {
        this.searchName = this.clickedMarker.sidoName;
      }

      getBoardListByArea(
        this.searchName,
        ({ data }) => {
          if (data.flag === "success") {
            this.hasBoard = true;
            this.boards = data.data;
          } else {
            this.hasBoard = false;
            this.boards = [];
          }
        },
        (error) => console.log(error)
      );
    },
  },
  created() {},
  updated() {},

  mounted() {},
  methods: {
    showModal(el, board) {
      this.isShowModal = true;
      this.modalInfo = board;
    },
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
    moveTo() {
      this.$emit("moveTo", this.clickedMarker.pos);
    },
    nextPage() {
      this.pageNum += 1;
    },
    prevPage() {
      this.pageNum -= 1;
    },
    favorPress() {
      this.$emit("favorPress", this.clickedMarker.code, this.clickedMarker.favor);
    },
  },
};
</script>

<style scoped>
.apt-info-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.apt-info-header-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.apt-info-header-wrapper button {
  border: none;
  background: none;
  font-size: 1.3rem;
}

.apt-info-header-wrapper > div > button {
  margin-right: 15px;
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
  font-size: 0.9em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
}

th {
  text-align: left;
  font-size: 0.9rem;
}

thead {
  font-weight: bold;
  color: #fff;
  background: #0069d9;
}

td,
th {
  padding: 10px 20px;
  vertical-align: middle;
}

td {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
}

a {
  color: #73685d;
}

@media all and (max-width: 768px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  th {
    text-align: right;
  }

  table {
    position: relative;
    padding-bottom: 0;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  thead {
    float: left;
    white-space: nowrap;
  }

  tbody {
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    white-space: nowrap;
  }

  tr {
    display: inline-block;
    vertical-align: top;
  }

  th {
    border-bottom: 1px solid #a39485;
  }

  td {
    border-bottom: 1px solid #e5e5e5;
  }
}

tr:hover td {
  cursor: pointer;
  background: #e7e5e5;
}

.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}

.btn-cover .page-btn {
  padding: 8px 15px;
  border-radius: 10px;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
}

.btn-cover .page-btn:hover {
  background: #e7e5e5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.btn-cover .page-count {
  margin: 0 10px;
  font-size: 0.9rem;
}
</style>
