<template>
  <header>
    <div>
      <router-link to="/" class="logo navbar-menus">HappyHouse</router-link>
    </div>
    <div>
      <router-link to="/apt" class="navbar-menus">실거래가조회</router-link>
      <router-link to="/interest" class="navbar-menus">관심지역</router-link>
      <router-link to="/notice" class="navbar-menus">공지사항</router-link>
      <router-link to="/board" class="navbar-menus">자유게시판</router-link>
      <span v-if="isLoginStatus">
        <router-link to="/like" class="navbar-menus">관심글</router-link>
      </span>
    </div>
    <div v-if="!isLoginStatus">
      <router-link to="/user/login" class="navbar-menus">로그인</router-link>
      <router-link to="/user/join" class="navbar-menus">회원가입</router-link>
    </div>
    <div v-else>
      <a class="navbar-menus" @click="logout">로그아웃</a>
      <router-link to="/user/mypage" class="navbar-menus">마이페이지</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "TheNavbar",
  data() {
    return {
      isLoginStatus: false,
      userName: "",
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("loginUser");
      this.isLoginStatus = false;
      this.$router.push("/");
    },
  },
  created() {
    const loginUser = localStorage.getItem("loginUser");

    if (loginUser) {
      this.isLoginStatus = true;
    } else this.isLoginStatus = false;
  },
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  border-bottom: 1px solid #eee;
  background: white;
}

header > div {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.navbar-menus {
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  color: black;
  margin-right: 20px;
}

.navbar-menus:hover {
  color: gray;
}

.logo {
  font-size: 1.5rem;
  color: #0a58ca;
}

.logo:hover {
  color: #3c90e2;
}
</style>
