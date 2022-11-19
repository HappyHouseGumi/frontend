<template>
  <header>
    <!-- a -> router-link -->
    <div>
      <router-link to="/" class="logo navbar-menus">HappyHouse</router-link>
    </div>
    <div>
      <a class="navbar-menus">실거래가조회</a>
      <a class="navbar-menus">관심지역</a>
      <a class="navbar-menus">공지사항</a>
      <!-- <a class="navbar-menus">자유게시판</a> -->
      <router-link to="/board" class="navbar-menus">자유게시판</router-link>
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
  /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5); */
  border-bottom: 1px solid #eee;
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
