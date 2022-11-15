<template>
  <div class="content">
    <div class="main">
      <div class="notice">
        <p>공지사항</p>
        <div class="divide-line"></div>
        <!-- 공지사항 최신 5가지 -->
        <div></div>
      </div>
      <div class="guide">
        <p>이용안내</p>
        <div class="divide-line"></div>
        <a><font-awesome-icon icon="fa-circle-arrow-right" class="fa-2x" /></a>
      </div>
      <div class="ask">
        <p>1:1문의</p>
        <div class="divide-line"></div>
        <a><font-awesome-icon icon="fa-circle-arrow-right" class="fa-2x" /></a>
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

.main > div > p {
  font-size: 1.2rem;
  font-weight: bold;
}

.main > div > a {
  cursor: pointer;
}

.divide-line {
  width: 35px;
  height: 1px;
  background: #999999;
  margin-bottom: 1rem;
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
