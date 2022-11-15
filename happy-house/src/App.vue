<template>
  <div id="app">
    <HeaderNavbar />
    <router-view />
    <TheFooter />
  </div>
</template>

<script type="module">
import HeaderNavbar from "@/components/common/HeaderNavbar.vue";
import TheFooter from "@/components/common/TheFooter.vue";

export default {
  name: "App",
  components: {
    HeaderNavbar,
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
</style>
