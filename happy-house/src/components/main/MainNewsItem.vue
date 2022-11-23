<template>
  <div class="notice-item-wrapper">
    <a :href="news.href">{{news.title}}</a>
  </div>
</template>

<script>
export default {
  name: "MainNewsItem",
  props: {
    news: {},
  },
};
</script>

<style scoped>
.notice-item-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.notice-item-wrapper > a {
  text-decoration: none;
  color: black;
}

.notice-item-wrapper > a:hover {
  color: gray;
}
</style>
