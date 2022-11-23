<template>
  <div class="notice-item-wrapper">
    <router-link :to="{ name: 'noticedetail', params: { id: notice.id } }">{{ notice.title }}</router-link>
    <span>{{ notice.regDate }}</span>
  </div>
</template>

<script>
export default {
  name: "MainNoticeItem",
  props: {
    notice: {},
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
