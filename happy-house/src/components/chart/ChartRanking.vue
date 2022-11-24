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
        {
          city: ["Seoul"],
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [
                "rgba(115, 38, 52, 0.2)",
                "rgba(140, 38, 65, 0.2)",
                "rgba(250, 172, 196, 0.2)",
                "rgba(217, 180, 190, 0.2)",
                "rgba(242, 206, 216, 0.2)",
              ],
              borderColor: [
                "rgba(115, 38, 52, 1)",
                "rgba(140, 38, 65, 1)",
                "rgba(250, 172, 196, 1)",
                "rgba(217, 180, 190, 1)",
                "rgba(242, 206, 216, 1)",
              ],
              borderWidth: 1.5,
            },
          ],
        },
        {
          city: ["Busan"],
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [
                "rgba(64, 18, 14, 0.2)",
                "rgba(115, 44, 29, 0.2)",
                "rgba(115, 44, 29, 0.2)",
                "rgba(166, 104, 81, 0.2)",
                "rgba(166, 141, 96, 0.2)",
              ],
              borderColor: [
                "rgba(64, 18, 14, 1)",
                "rgba(115, 44, 29, 1)",
                "rgba(115, 44, 29, 1)",
                "rgba(166, 104, 81, 1)",
                "rgba(166, 141, 96, 1)",
              ],
              borderWidth: 1.5,
            },
          ],
        },
        {
          city: ["Daegu"],
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [
                "rgba(4, 41, 64, 0.2)",
                "rgba(0, 92, 83, 0.2)",
                "rgba(159, 193, 49, 0.2)",
                "rgba(219, 242, 39, 0.2)",
                "rgba(214, 213, 142, 0.2)",
              ],
              borderColor: [
                "rgba(4, 41, 64, 1)",
                "rgba(0, 92, 83, 1)",
                "rgba(159, 193, 49, 1)",
                "rgba(219, 242, 39, 1)",
                "rgba(214, 213, 142, 1)",
              ],
              borderWidth: 1.5,
            },
          ],
        },
        {
          city: ["Incheon"],
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [
                "rgba(5, 17, 242, 0.2)",
                "rgba(73, 81, 242, 0.2)",
                "rgba(153, 157, 242, 0.2)",
                "rgba(182, 185, 242, 0.2)",
                "rgba(206, 194, 249, 0.2)",
              ],
              borderColor: [
                "rgba(5, 17, 242, 1)",
                "rgba(73, 81, 242, 1)",
                "rgba(153, 157, 242, 1)",
                "rgba(182, 185, 242, 1)",
                "rgba(206, 194, 249, 1)",
              ],
              borderWidth: 1.5,
            },
          ],
        },
        {
          city: ["Gwangju"],
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [
                "rgba(218, 165, 32, 0.2)",
                "rgba(220, 182, 30, 0.2)",
                "rgba(255, 215, 0, 0.2)",
                "rgba(255, 222, 92, 0.2)",
                "rgba(242, 216, 114, 0.2)",
              ],
              borderColor: [
                "rgba(218, 165, 32, 1)",
                "rgba(220, 182, 30, 1)",
                "rgba(255, 215, 0, 1)",
                "rgba(255, 222, 92, 1)",
                "rgba(242, 216, 114, 1)",
              ],
              borderWidth: 1.5,
            },
          ],
        },
        {
          city: ["Daejeon"],
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [
                "rgba(77, 82, 92, 0.2)",
                "rgba(141, 149, 168, 0.2)",
                "rgba(163, 172, 194, 0.2)",
                "rgba(183, 194, 219, 0.2)",
                "rgba(195, 206, 232, 0.2)",
              ],
              borderColor: [
                "rgba(77, 82, 92, 1)",
                "rgba(141, 149, 168, 1)",
                "rgba(163, 172, 194, 1)",
                "rgba(183, 194, 219, 1)",
                "rgba(195, 206, 232, 1)",
              ],
              borderWidth: 1.5,
            },
          ],
        },
        {
          city: ["Ulsan"],
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: [
                "rgba(230, 105, 78, 0.2)",
                "rgba(240, 132, 81, 0.2)",
                "rgba(217, 146, 85, 0.2)",
                "rgba(240, 177, 81, 0.2)",
                "rgba(230, 185, 78, 0.2)",
              ],
              borderColor: [
                "rgba(230, 105, 78, 1)",
                "rgba(240, 132, 81, 1)",
                "rgba(217, 146, 85, 1)",
                "rgba(240, 177, 81, 1)",
                "rgba(230, 185, 78, 1)",
              ],
              borderWidth: 1.5,
            },
          ],
        },
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
              // color: "black",
              // lineWidth: 1,
            },
            min: 0,
            max: 10,
            ticks: {
              stepSize: 1,
              padding: 5,
            },
            beginAtZero: true,
          },
        },
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
