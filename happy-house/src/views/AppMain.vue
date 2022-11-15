<template>
  <div>
    <MainSearch />
    <MainContents />
  </div>
</template>

<script type="module">
import MainSearch from "@/components/main/MainSearch.vue";
import MainContents from "@/components/main/MainContents.vue";

export default {
  name: "AppMain",
  components: {
    MainSearch,
    MainContents,
  },
};
</script>

<style></style>
