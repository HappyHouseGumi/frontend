<template>
  <div class="content">
    <div class="main">
      <div class="notice">
        <span>공지사항</span>
        <div class="divide-line"></div>
        <!-- 공지사항 최신 5가지 -->
        <div></div>
      </div>
      <div class="guide">
        <span>이용안내</span>
        <div class="divide-line"></div>
        <a><font-awesome-icon icon="fa-circle-arrow-right" class="fa-2x" /></a>
      </div>
      <div class="ask">
        <span>QnA</span>
        <div class="divide-line"></div>
        <router-link to="/qna"><font-awesome-icon icon="fa-circle-arrow-right" class="fa-2x" /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainContents",
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
  height: 210px;
  padding: 30px;
  border: 1px solid #eeeeee;
}

.guide,
.ask {
  width: 200px;
  height: 210px;
  padding: 30px;
  margin-left: 30px;
  border: 1px solid #eeeeee;
}
</style>
