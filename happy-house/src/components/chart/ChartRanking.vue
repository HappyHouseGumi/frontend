<template>
  <div>
    <hr />
    <div class="title">📶 지역별 관심 지역 상위 랭킹 5순위 📶</div>
    <div class="div-layout" style="margin-bottom: 30px">
      <span class="chart-title">서울</span>
      <Bar
        style="margin: 0px 40px; height: 350px; width: 400px; flex: auto"
        :chart-options="chartOptions"
        :chart-data="chartData[0]"
      />
      <span class="chart-title">부산</span>
      <Bar
        style="margin: 0px 40px; height: 350px; width: 400px; flex: auto"
        :chart-options="chartOptions"
        :chart-data="chartData[1]"
      />
      <span class="chart-title">대구</span>
      <Bar
        style="margin: 0px 40px; height: 350px; width: 400px; flex: auto"
        :chart-options="chartOptions"
        :chart-data="chartData[2]"
      />
    </div>
    <div class="div-layout">
      <span class="chart-title">인천</span>
      <Bar
        style="margin: 0px 30px; height: 250px; width: 300px; flex: auto"
        :chart-options="chartOptions"
        :chart-data="chartData[3]"
      />
      <span class="chart-title">광주</span>
      <Bar
        style="margin: 0px 30px; height: 250px; width: 300px; flex: auto"
        :chart-options="chartOptions"
        :chart-data="chartData[4]"
      />
      <span class="chart-title">대전</span>
      <Bar
        style="margin: 0px 30px; height: 250px; width: 300px; flex: auto"
        :chart-options="chartOptions"
        :chart-data="chartData[5]"
      />
      <span class="chart-title">울산</span>
      <Bar
        style="margin: 0px 30px; height: 250px; width: 300px; flex: auto"
        :chart-options="chartOptions"
        :chart-data="chartData[6]"
      />
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

import { apiInstance } from "@/api/index";
const api = apiInstance();

export default {
  name: "ChartRanking",
  components: { Bar },
  data() {
    return {
      // 광역시 코드 :
      //      서울, 부산, 대구, 인천, 광주, 대전, 울산
      cityCode: [11, 26, 27, 28, 29, 30, 31],
      chartData: [
        // Seoul, Busan, Daegu, Incheon, Gwangju, Daejeon, Ulsan
        { city: ["Seoul"], labels: [], datasets: [{ data: [] }] },
        { city: ["Busan"], labels: [], datasets: [{ data: [] }] },
        { city: ["Daegu"], labels: [], datasets: [{ data: [] }] },
        { city: ["Incheon"], labels: [], datasets: [{ data: [] }] },
        { city: ["Gwangju"], labels: [], datasets: [{ data: [] }] },
        { city: ["Daejeon"], labels: [], datasets: [{ data: [] }] },
        { city: ["Ulsan"], labels: [], datasets: [{ data: [] }] },
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            display: false,
          },
          tooltip: {
            boxWidth: 10,
          },
        },
        scales: {
          x: {
            grid: {
              display: true,
            },
            ticks: {
              padding: 3,
            },
          },
          y: {
            grid: {
              drawBorder: false,
              color: "black",
              lineWidth: 1,
            },
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1,
              padding: 5,
            },
            beginAtZero: true,
          },
        },

        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1.5,
      },
    };
  },

  created() {
    const getRankingChart = async (citycode) => {
      try {
        for (let [index, code] of citycode.entries()) {
          let data = await api.get(`/interest/ranking/${code}`);
          data = data.data;
          if (data.flag === "success") {
            for (let likeData of data.data) {
              this.chartData[index].labels.push(likeData.gugunName);
              this.chartData[index].datasets[0].data.push(likeData.count);
            }
          } else {
            // console.log("서울 관심 지역 상위 리스트 5개 가져오기 오류: ", data.data[0].msg);
          }
        }
      } catch (error) {
        console.log("관심 지역 상위 리스트 5개 가져오기 오류 : " + error);
      }
    };

    getRankingChart(this.cityCode);

    window.scrollTo(0, 0);
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
.div-layout {
  margin-bottom: 100px;
  display: flex;
}
hr {
  width: 60%;
  height: 2px;
  background-color: #e9ecef;
  margin: auto;
  margin-bottom: 40px;
}
.title {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
}

.chart-title {
  font-weight: bold;
}
</style>
