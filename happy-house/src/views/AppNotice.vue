<template>
  <div class="content">
    <div class="wrapper">
      <a @click="moveTonotice">공지사항</a>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
const noticeStore = "noticeStore";

export default {
  name: "AppNotice",

  methods: {
    ...mapMutations(noticeStore, { setNoticeListData: "SET_NOTICE_LIST_DATA" }),

    moveTonotice() {
      let sendData = {
        pgno: 1,
        word: null,
      };
      this.setNoticeListData(sendData);
      this.$router.go();
    },
  },
};
</script>

<style scoped>
.content {
  height: 100%;
}

.wrapper {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.wrapper > a {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 50px 0;
  text-decoration: none;
  color: black;
}
</style>
