<template>
  <div>
    <span>광역시 지역별 관심 지역 상위 5개</span>
    <div>
      서울: {{ Seoul }}, <br />
      부산: {{ Busan }}, <br />
      대구: {{ Daegu }}, <br />
      인천: {{ Incheon }}, <br />
      광주: {{ Gwangju }}, <br />
      대전: {{ Daejeon }}, <br />
      울산: {{ Ulsan }}, <br />
    </div>
    <div>
      <canvas id="chart" width="50px" height="70px"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart, BarElement, BarController, LinearScale, CategoryScale } from "chart.js"; //👈 Chart 모듈 임포트
Chart.register(BarElement, BarController, LinearScale, CategoryScale); // 👈 chart.js 모듈 Chart 모듈에 등록

import { getRankingIntersts } from "@/api/chart";

export default {
  name: "ChartRanking",

  data() {
    return {
      // 광역시 코드 :
      //      서울, 부산, 대구, 인천, 광주, 대전, 울산
      cityCode: [11, 26, 27, 28, 29, 30, 31],
      Seoul: { labels: [], datasets: [{ data: [] }] },
      Busan: { labels: [], datasets: [{ data: [] }] },
      Daegu: {
        labels: [],
        datasets: [
          {
            data: [],
          },
        ],
      },
      Incheon: { labels: [], datasets: [{ data: [] }] },
      Gwangju: { labels: [], datasets: [{ data: [] }] },
      Daejeon: { labels: [], datasets: [{ data: [] }] },
      Ulsan: { labels: [], datasets: [{ data: [] }] },
      cssData: {
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
        borderWidth: 1,
      },
      myChart: null,
    };
  },

  created() {
    //     const getRankingChart = axios(code) => {
    //       try {
    // } catch (error) {
    // }
    //     };
    // getRankingChart(this.cityCode);

    // 서울
    getRankingIntersts(
      this.cityCode[0],
      ({ data }) => {
        if (data.flag === "success") {
          for (let seouls of data.data) {
            this.Seoul.labels.push(seouls.gugunName);
            this.Seoul.datasets[0].data.push(seouls.count);
          }
        } else {
          // console.log("서울 관심 지역 상위 리스트 5개 가져오기 오류: ", data.data[0].msg);
        }
      },
      (error) => {
        console.log("서울 관심 지역 상위 리스트 5개 가져오기 오류 : " + error);
      }
    );
    // 부산
    getRankingIntersts(
      this.cityCode[1],
      ({ data }) => {
        if (data.flag === "success") {
          for (let busans of data.data) {
            this.Busan.labels.push(busans.gugunName);
            this.Busan.datasets[0].data.push(busans.count);
          }
        } else {
          // console.log("부산 관심 지역 상위 리스트 5개 가져오기 오류: ", data.data[0].msg);
        }
      },
      (error) => {
        console.log("부산 관심 지역 상위 리스트 5개 가져오기 오류 : " + error);
      }
    );
    // 대구
    getRankingIntersts(
      this.cityCode[2],
      ({ data }) => {
        if (data.flag === "success") {
          for (let deaegus of data.data) {
            this.Daegu.labels.push(deaegus.gugunName);
            this.Daegu.datasets[0].data.push(deaegus.count);
            console.log();
          }
        } else {
          // console.log("대구 관심 지역 상위 리스트 5개 가져오기 오류: ", data.data[0].msg);
        }
      },
      (error) => {
        console.log("대구 관심 지역 상위 리스트 5개 가져오기 오류 : " + error);
      }
    );
    // 인천
    getRankingIntersts(
      this.cityCode[3],
      ({ data }) => {
        if (data.flag === "success") {
          for (let incheons of data.data) {
            this.Incheon.labels.push(incheons.gugunName);
            this.Incheon.datasets[0].data.push(incheons.count);
          }
        } else {
          // console.log("인천 관심 지역 상위 리스트 5개 가져오기 오류: ", data.data[0].msg);
        }
      },
      (error) => {
        console.log("인천 관심 지역 상위 리스트 5개 가져오기 오류 : " + error);
      }
    );
    // 광주
    getRankingIntersts(
      this.cityCode[4],
      ({ data }) => {
        if (data.flag === "success") {
          for (let gwangjus of data.data) {
            this.Gwangju.labels.push(gwangjus.gugunName);
            this.Gwangju.datasets[0].data.push(gwangjus.count);
          }
        } else {
          // console.log("광주 관심 지역 상위 리스트 5개 가져오기 오류: ", data.data[0].msg);
        }
      },
      (error) => {
        console.log("광주 관심 지역 상위 리스트 5개 가져오기 오류 : " + error);
      }
    );
    // 대전
    getRankingIntersts(
      this.cityCode[5],
      ({ data }) => {
        if (data.flag === "success") {
          for (let daejeons of data.data) {
            this.Daejeon.labels.push(daejeons.gugunName);
            this.Daejeon.datasets[0].data.push(daejeons.count);
          }
        } else {
          // console.log("대전 관심 지역 상위 리스트 5개 가져오기 오류: ", data.data[0].msg);
        }
      },
      (error) => {
        console.log("대전 관심 지역 상위 리스트 5개 가져오기 오류 : " + error);
      }
    );
    // 울산
    getRankingIntersts(
      this.cityCode[6],
      ({ data }) => {
        if (data.flag === "success") {
          for (let ulsans of data.data) {
            this.Ulsan.labels.push(ulsans.gugunName);
            this.Ulsan.datasets[0].data.push(ulsans.count);
          }
        } else {
          // console.log("울산 관심 지역 상위 리스트 5개 가져오기 오류: ", data.data[0].msg);
        }
      },
      (error) => {
        console.log("울산 관심 지역 상위 리스트 5개 가져오기 오류 : " + error);
      }
    );
  },

  mounted() {
    this.fillData();
  },

  methods: {
    fillData() {
      const ctx = document.getElementById("chart").getContext("2d");
      this.myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
          datasets: [
            {
              label: "# of Votes",
              data: [12, 19, 3, 5, 2],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          title: {
            display: true,
            text: "막대 차트 테스트",
          },
          scales: {
            x: {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "x축",
              },
            },

            y: {
              display: true,
              ticks: {
                autoSkip: false,
              },
              scaleLabel: {
                display: true,
                labelString: "y축",
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped></style>
