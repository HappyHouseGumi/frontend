<template>
  <div class="content">
    <div class="wrapper">
      <router-link to="/chart">관심 랭킹</router-link>
      |
      <router-link to="/chart/statistics">지역별 평균 매매가</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppChart",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
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
}

.wrapper > a {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 50px 0;
  text-decoration: none;
  color: black;
}
</style>
