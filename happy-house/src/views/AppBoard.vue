<template>
  <div class="content">
    <div class="wrapper">
      <!-- <router-link to="/board/list">Board</router-link> -->
      <a @click="moveToboard">Board</a>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

const boardStore = "boardStore";

export default {
  name: "AppBoard",
  methods: {
    ...mapMutations(boardStore, { setBoardListData: "SET_BOARD_LIST_DATA" }),

    moveToboard() {
      let sendData = {
        pgno: 1,
        key: null,
        word: null,
      };
      this.setBoardListData(sendData);
      // this.SET_BOARD_LIST_DATA(sendData);
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
  font-size: 3rem;
  font-weight: bold;
  margin: 50px 0;
  text-decoration: none;
  color: black;
}
</style>
