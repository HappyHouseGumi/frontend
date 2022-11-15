<template>
  <div class="content">
    <div class="wrapper">
      <span>QnA</span>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppQna",
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

.wrapper > span {
  font-size: 3rem;
  font-weight: bold;
  margin: 50px 0;
}
</style>
