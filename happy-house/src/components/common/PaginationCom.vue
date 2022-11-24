<template>
  <div class="page" v-if="pageSetting.list.length">
    <ul class="pagination modal">
      <!-- <li><a href="#" class="first">첫 페이지</a></li> -->
      <li>
        <a
          href="#"
          class="arrow-left"
          v-if="pageSetting.first !== null"
          @click="pageSetting.first !== null ? sendPage(pageSetting.first) : ''"
          >&lt;&lt;</a
        >
      </li>
      <li v-for="page in pageSetting.list" :key="page" @click="sendPage(page)" class="num">
        <!-- :class="{ active: page === pageSetting.currentPage } -->
        <a>{{ page }}</a>
      </li>
      <li>
        <a
          href="#"
          class="arrow-right"
          v-if="pageSetting.end !== null"
          @click="pageSetting.end !== null ? sendPage(pageSetting.end) : ''"
          >&gt;&gt;</a
        >
      </li>
      <!-- <li><a href="#" class="last">끝 페이지</a></li> -->
    </ul>
  </div>
</template>

<script>
// import { ChevronsLeftIcon, ChevronsRightIcon } from "vue-feather-icons";

export default {
  name: "PaginationCom",
  props: ["pageSetting"],

  // components: {
  //   ChevronsLeftIcon,
  //   ChevronsRightIcon,
  // },
  methods: {
    sendPage(page) {
      this.$emit("paging", page);
    },
  },
};
</script>

<style scoped>
.page {
  text-align: center; /* div 사이즈 영역 안에서의 center */
  margin-bottom: 100px;
  /* width: 70%; */
}

.pagination {
  list-style: none;
  display: inline-block;
  padding: 0;
  margin-top: 20px;
}

.pagination li {
  display: inline;
  text-align: center;
}

/* 숫자들에 대한 스타일 지정 */
.pagination a {
  float: left;
  display: block;
  font-size: 14px;
  text-decoration: none;
  padding: 5px 12px;
  color: #96a0ad;
  line-height: 1.5;
}

.first {
  margin-right: 15px;
}

.last {
  margin-left: 15px;
}

.first:hover,
.last:hover,
.left:hover,
.right:hover {
  color: #2e9cdf;
}

.pagination a.active {
  cursor: default;
  color: #ffffff;
}

.pagination a:active {
  outline: none;
}

.modal .num {
  margin-left: 3px;
  padding: 0;
  width: 30px;
  height: 30px;
  line-height: 30px;
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;
  border-radius: 100%;
}

.modal .num:hover {
  background-color: #2e9cdf;
  color: #ffffff;
}

.modal .num.active,
.modal .num:active {
  background-color: #2e9cdf;
  cursor: pointer;
}
</style>
