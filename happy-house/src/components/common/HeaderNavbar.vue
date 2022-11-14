<template>
  <b-nav class="wrapper">
    <div>
      <b-nav-item class="logo">HappyHouse</b-nav-item>
    </div>
    <div>
      <b-nav-item>실거래가조회</b-nav-item>
      <b-nav-item>관심지역</b-nav-item>
      <b-nav-item>공지사항</b-nav-item>
      <b-nav-item>자유게시판</b-nav-item>
    </div>
    <div>
      <b-nav-item>로그인</b-nav-item>
      <b-nav-item>회원가입</b-nav-item>
    </div>
  </b-nav>
</template>

<script>
export default {
  name: "HeaderNavbar",
  data() {
    return {};
  },
};
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 70px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid #eee;
}

.wrapper > div {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo > a {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
