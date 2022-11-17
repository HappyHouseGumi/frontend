<template>
  <div class="user-login-wrapper">
    <div class="user-login-types">
      <div>
        <span>로그인</span>
        <button>네이버로 로그인</button>
        <div class="divide-line"></div>
        <div class="user-login-personal-wrapper">
          <input placeholder="ID" type="text" v-model="user.account" />
          <input placeholder="Password" type="password" v-model="user.password" />
          <button @click="loginUser">로그인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="module">
import http from "@/api/http.js";

export default {
  name: "UserLogin",
  data() {
    return {
      user: {
        account: "",
        password: "",
      },
    };
  },
  methods: {
    loginUser() {
      if (this.user.account === "" || this.user.password === "") {
        alert("빈칸을 모두 입력해주세요.");
        return;
      }

      http.post("/user/login", this.user).then(({ data }) => {
        if (data.flag === "success") {
          const accessToken = data.data[0]["access-token"];
          const base64Payload = atob(accessToken.split(".")[1]);
          const payload = JSON.parse(base64Payload.toString());
          const userId = payload.userId;

          const loginUser = {
            userId,
            accessToken,
          };

          localStorage.setItem("loginUser", JSON.stringify(loginUser));

          this.$router.push("/");
        } else {
          alert("일치하는 회원 정보가 없습니다.");
          return;
        }
      });
    },
  },
};
</script>

<style scoped>
.user-login-wrapper {
  height: 100%;
  background: #ddd;
  display: flex;
  align-items: center;
}

.user-login-types {
  margin: 0 auto;
  width: 500px;
  height: 500px;
  border: 1px solid white;
  border-radius: 10px;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.user-login-types > div {
  height: 100%;
  padding: 30px 20px;
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
  background: #19ce60;
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
</style>
