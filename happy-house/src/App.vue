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

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  box-sizing: border-box;
}

button,
a {
  cursor: pointer;
}

html {
  height: 100%;
}
</style>
