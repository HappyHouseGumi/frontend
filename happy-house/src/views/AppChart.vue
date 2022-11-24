<template>
  <div class="content">
    <div class="wrapper">
      <div>
        <a v-if="isRanking" style="font-weight: bold" @click="moveRanking">관심 랭킹</a>
        <a v-else style="font-weight: normal" @click="moveRanking">관심 랭킹</a>
        <span>/</span>
        <a v-if="isRanking" style="font-weight: normal" @click="moveAvg">지역별 평균 매매가</a>
        <a v-else style="font-weight: bold" @click="moveAvg">지역별 평균 매매가</a>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppChart",
  data() {
    return {
      isRanking: false,
    };
  },
  methods: {
    moveRanking() {
      this.isRanking = true;
      this.$router.push("/chart");
    },
    moveAvg() {
      this.isRanking = false;
      this.$router.push("/chart/statistics");
    },
  },
  created() {
    this.isRanking = true;
  },
};
</script>

<style scoped>
.content {
  height: 100%;
}

.wrapper {
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
}

.wrapper > div {
  margin-bottom: 40px;
}

.wrapper > div > span {
  font-size: 2rem;
  font-weight: bold;
  color: black;
  margin: 0 20px;
}

.wrapper > div > a {
  font-size: 2.5rem;
  font-weight: bold;
  text-decoration: none;
  color: black;
}
</style>
