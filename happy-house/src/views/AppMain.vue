<template>
  <div class="content">
    <div class="main">
      <div class="bg"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppMain",
};
</script>

<style scoped>
.content {
  position: relative;
  width: 100%;
}

.main {
  background: #000;
  height: 720px;
  overflow: hidden;
}

.bg {
  background: #000 url("@/assets/images/bg-main1.jpg") center no-repeat;
  background-size: cover;
  opacity: 0.5;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
