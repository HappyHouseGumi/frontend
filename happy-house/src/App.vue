<template>
  <div id="app">
    <TheNavbar />
    <router-view />
    <TheFooter />
  </div>
</template>

<script type="module">
import TheNavbar from "@/components/common/TheNavbar.vue";
import TheFooter from "@/components/common/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheNavbar,
    TheFooter,
  },
};
</script>

<style scoped>
/* 브라우저 기본 CSS 제거 */
* {
  margin: 0;
  padding: 0;
}

#app {
  /* footer 하단 고정 */
  height: 100vh;
}
</style>
