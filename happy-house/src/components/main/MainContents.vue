<template>
  <div class="content">
    <div class="main">
      <div class="notice">
        <span style="cursor: pointer" @mouseover="change">공지사항</span>
        <span> / </span>
        <span style="cursor: pointer" @mouseover="change">뉴스</span>
        <div class="divide-line"></div>
        <div class="main-notice-item-wrapper" v-if="isNotice === true">
          <MainNoticeItem
            v-for="(notice, index) in recentNotices"
            :key="index"
            :notice="notice"
          />
        </div>
        <div class="main-notice-item-wrapper" v-else>
          <MainNewsItem
            v-for="(news, index) in recentNews"
            :key="index"
            :news="news"
          />
        </div>
      </div>
      <div class="chart">
        <span>관심 차트</span>
        <div class="divide-line"></div>
        <a><font-awesome-icon icon="fa-circle-arrow-right" class="fa-2x" /></a>
      </div>
      <div class="guide">
        <span>이용안내</span>
        <div class="divide-line"></div>
        <a
          href="https://www.notion.so/ssafys/Happy-House-4ee60d7d35a7491485b62dc127c67ce8"
          target="_blank"
          ><font-awesome-icon icon="fa-circle-arrow-right" class="fa-2x"
        /></a>
      </div>
      <div class="ask">
        <span>QnA</span>
        <div class="divide-line"></div>
        <a @click="moveToqna"
          ><font-awesome-icon icon="fa-circle-arrow-right" class="fa-2x"
        /></a>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewsList } from "@/api/data";
import { getNoticeList } from "@/api/notice";
import MainNoticeItem from "@/components/main/MainNoticeItem.vue";
import MainNewsItem from "@/components/main/MainNewsItem.vue";

import { mapMutations } from "vuex";
const qnaStore = "qnaStore";

export default {
  name: "MainContents",
  components: {
    MainNoticeItem,
    MainNewsItem,
  },
  data() {
    return {
      recentNotices: [],
      recentNews: [],
      isNotice: true,
    };
  },
  methods: {
    ...mapMutations(qnaStore, { setQnaListData: "SET_QNA_LIST_DATA" }),

    moveToqna() {
      let sendingParam = {
        pgno: 1,
        key: null,
        word: null,
      };
      this.setQnaListData(sendingParam);

      this.$router.push({ name: "qna" });
    },
    change() {
      this.isNotice = !this.isNotice;
    },
  },
  created() {
    this.isNotice = true;
    getNoticeList(
      {},
      ({ data }) => {
        if (data.flag === "success") {
          let origin = data.data;
          origin = origin.slice(0, 5);
          this.recentNotices = origin;
        }
      },
      (error) => {
        console.log("공지사항 리스트 불러오기 오류 : " + error);
      }
    );

    getNewsList(
      ({ data }) => {
        if (data.flag === "success") {
          let origin = data.data;
          origin = origin.slice(0, 5);
          // console.log(origin)
          this.recentNews = origin;
        }
      },
      (error) => {
        console.log("공지사항 리스트 불러오기 오류 : " + error);
      }
    );
  },
};
</script>

<style scoped>
a {
  color: black;
  cursor: pointer;
}

.content {
  width: 100%;
  height: 500px;
}

.main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80%;
}

span {
  font-size: 1.2rem;
  font-weight: bold;
}

.divide-line {
  width: 40px;
  height: 1px;
  background: #999999;
  margin: 20px 0;
}

.notice {
  width: 525px;
  height: 270px;
  padding: 30px;
  border: 1px solid #eeeeee;
}

.chart,
.guide,
.ask {
  width: 200px;
  height: 270px;
  padding: 30px;
  margin-left: 30px;
  border: 1px solid #eeeeee;
}

.main-notice-item-wrapper {
  width: 100%;
}
</style>
