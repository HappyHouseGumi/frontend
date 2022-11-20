<template>
  <div class="search-result-wrapper">
    <span><font-awesome-icon icon="fa-solid fa-location-dot" class="fa-lg" /></span>
    <span>{{ loc }}</span>
  </div>
</template>

<script>
export default {
  name: "MainSearchResultItem",
  props: {
    loc: String,
  },
};
</script>

<style scoped>
.search-result-wrapper {
  width: 100%;
  height: 30px;
  padding: 25px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
}

.search-result-wrapper:hover {
  background: #272e35;
}

.search-result-wrapper > span:nth-child(1) {
  color: white;
  margin-right: 20px;
}

.search-result-wrapper > span:nth-child(2) {
  color: white;
  cursor: pointer;
}
</style>
