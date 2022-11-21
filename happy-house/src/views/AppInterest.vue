<template>
  <div class="content-wrapper">
    <div class="content">
      <span>관심 지역</span>
      <InterestRegist />
      <InterestList />
    </div>
  </div>
</template>

<script type="module">
import InterestRegist from "@/components/interest/InterestRegist.vue";
import InterestList from "@/components/interest/InterestList.vue";

export default {
  name: "AppInterest",
  components: {
    InterestRegist,
    InterestList,
  },
};
</script>

<style scoped>
.content-wrapper {
  height: 100%;
}

.content {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content > span {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 50px 0;
  text-decoration: none;
  color: black;
}
</style>
