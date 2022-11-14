<template>
  <div id="app">
    <HeaderNavbar />
    <router-view />
  </div>
</template>

<script type="module">
import HeaderNavbar from "@/components/common/HeaderNavbar.vue";

export default {
  name: "App",
  components: {
    HeaderNavbar,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
