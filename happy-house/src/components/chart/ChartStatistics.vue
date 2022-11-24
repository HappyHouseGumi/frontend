<template>
  <div class="line-chart-layout">
    <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData" :width="width" :height="height" />
  </div>
</template>

<script>
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   LinearScale,
//   CategoryScale,
//   PointElement,
// } from "chart.js";

// ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement);

import { apiInstance } from "@/api/index";
const api = apiInstance();

export default {
  name: "ChartStatistics",
  components: {
    LineChartGenerator,
  },
  props: {
    width: {
      type: Number,
      default: 1400,
    },
    height: {
      type: Number,
      default: 700,
    },
  },
  data() {
    return {
      cityName: [
        "서울특별시",
        "부산광역시",
        "대구광역시",
        "인천광역시",
        "광주광역시",
        "대전광역시",
        "울산광역시",
        // "강원도",
        // "경기도",
        // "경상남도",
        // "경상북도",
        // "세종특별자치시",
        // "전라남도",
        // "전라북도",
        // "제주특별자치도",
        // "충청남도",
        // "충청북도",
      ],
      chartData: {
        labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        datasets: [],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "지역별 데이터, 제외할 지역을 선택해주세요.",
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              fontSize: 20,
              fillStyle: "rgba(54, 162, 235, 1)",
              fontColor: "rgb(255, 99, 132)",
            },
            // onClick: function (e, legendItem) {
            //   console.log(legendItem);
            //   legendItem.fillStyle = "rgba(54, 162, 235, 1)";
            // },
          },

          datalabels: {
            display: false,
          },
          tooltip: {
            boxWidth: 10,
          },
        },
        backgroundColor: {},
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderWidth: 5,
      },
    };
  },
  created() {
    const getAvgDeal = async (cityname) => {
      try {
        for (let name of cityname) {
          let data = await api.post(`/data/avgDeal`, name);
          data = data.data;
          if (data.flag === "success") {
            let arrayData = {
              label: null,
              backgroundColor: "#f87979",
              data: [],
            };
            arrayData.label = data.data[0].sidoName;
            for (let figure of data.data) {
              arrayData.data.push(figure.dealAmount);
            }
            this.chartData.datasets.push(arrayData);
          } else {
            console.log("지역별 연도별 평균 매매가 가져오기 오류 : " + data.data[0].msg);
          }
        }
      } catch (error) {
        console.log("지역별 연도별 평균 매매가 가져오기 오류 : " + error);
      }
    };
    getAvgDeal(this.cityName);
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.line-chart-layout {
  margin: 0px 40px 100px;
  height: 700px;
  width: 1400px;
}
</style>
