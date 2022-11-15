<template>
  <footer>
    <div class="wrapper">
      <a href="https://github.com/HappyHouseGumi" target="_blank"
        ><b-icon icon="github" font-scale="1.5" variant="dark"></b-icon
      ></a>
      <a
        href="https://www.notion.so/ssafys/6d4a924e1b7543849596d770bf10f6f2"
        target="_blank"
        ><b-icon icon="journal" font-scale="1.5" variant="dark"></b-icon
      ></a>
      &copy; HappyHouse | 박소연 | 사공지은 | 성광현
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style scoped>
footer {
  /* 상시 고정 */
  width: 100%;
  height: 90px;
  position: fixed;
  bottom: 0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid #eee;

  /* 상시 고정 X */
  /* width: 100%;
  height: 90px;
  position: relative;
  transform: translateY(-100%); */
}

.wrapper {
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.wrapper > a {
  margin-right: 20px;
}
</style>
