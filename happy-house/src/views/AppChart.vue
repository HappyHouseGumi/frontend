<template>
  <div class="content">
    <div class="wrapper">
      <router-link to="/chart">관심 랭킹</router-link>
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
  width: 1000px;
  margin: 0 auto;
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
