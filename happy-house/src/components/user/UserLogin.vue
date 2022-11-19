<template>
  <div class="user-login-wrapper">
    <div class="user-login-types">
      <div>
        <span>로그인</span>
        <div id="naver_id_login"></div>
        <div class="divide-line"></div>
        <div class="user-login-personal-wrapper">
          <input placeholder="Email" type="email" v-model="user.email" />
          <input placeholder="Password" type="password" v-model="user.password" />
          <button @click="loginUser">로그인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="module">
import { mapState, mapActions } from "vuex";

const userStore = "userStore";

export default {
  name: "UserLogin",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    const naver_id_login = new window.naver_id_login("sTS2XWnrv1VAaHN25n9w", "http://localhost:8080/user/oauthjoin");
    const state = naver_id_login.getUniqState();
    naver_id_login.setButton("green", 3, 50);
    naver_id_login.setState(state);
    naver_id_login.init_naver_id_login();
  },
  computed: {
    ...mapState(userStore, ["isLoginStatus"]),
  },
  methods: {
    ...mapActions(userStore, ["userLoginAction"]),
    loginUser() {
      if (this.user.email === "" || this.user.password === "") {
        alert("빈칸을 모두 입력해주세요.");
        return;
      }

      const regex =
        // eslint-disable-next-line
        /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

      if (this.user.email === "" || !regex.test(this.user.email)) {
        alert("이메일 형식으로 입력해주세요.");
        return;
      }

      this.userLoginAction(this.user);
    },
  },
};
</script>

<style scoped>
.user-login-wrapper {
  background: white;
  display: flex;
  align-items: center;
}

.user-login-types {
  margin: 0 auto;
}

.user-login-types > div {
  margin-top: 100px;
  margin-bottom: 150px;
  width: 500px;
  height: 500px;
  border: 1px solid white;
  border-radius: 10px;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-login-types > div > span {
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 20px;
}

.divide-line {
  width: 400px;
  height: 2px;
  background: #999999;
  margin-bottom: 40px;
}

.user-login-types > div > button {
  width: 350px;
  height: 50px;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  background: #1ec800;
  margin-bottom: 30px;
}

.user-login-personal-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-login-personal-wrapper > input {
  width: 350px;
  height: 40px;
  padding: 0 10px;
  margin-bottom: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  outline: none;
}

.user-login-personal-wrapper > button {
  width: 350px;
  height: 50px;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  background: #3c90e2;
}

#naver_id_login {
  margin-bottom: 20px;
}
</style>
