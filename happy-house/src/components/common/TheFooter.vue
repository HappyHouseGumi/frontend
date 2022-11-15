<template>
  <footer>
    <div class="wrapper">
      <a href="https://github.com/HappyHouseGumi" target="_blank"
        ><font-awesome-icon
          icon="fa-brands fa-github"
          class="fa-lg"
          style="color: black"
      /></a>
      <a
        href="https://www.notion.so/ssafys/6d4a924e1b7543849596d770bf10f6f2"
        target="_blank"
        ><font-awesome-icon
          icon="fa-solid fa-book"
          class="fa-lg"
          style="color: black"
      /></a>
      <span>&copy; HappyHouse | 박소연 | 사공지은 | 성광현</span>
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
  height: 80px;
  position: relative;
  transform: translateY(-100%);
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  border-top: 1px solid #eee;
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
  margin-right: 30px;
}

.wrapper > span {
  font-size: 0.9rem;
  font-weight: bold;
}
</style>
