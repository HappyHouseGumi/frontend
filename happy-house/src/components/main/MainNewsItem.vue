<template>
  <div class="notice-item-wrapper">
    <a :href="news.href">{{ news.title }}</a>
  </div>
</template>

<script>
export default {
  name: "MainNewsItem",
  props: {
    news: {},
  },
  created() {
    if (this.news) {
      if (JSON.stringify(this.news.title.length) > 30) {
        // eslint-disable-next-line
        this.news.title = this.news.title.substr(0, 28) + "...";
      }
    }
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
