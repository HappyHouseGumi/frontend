<template>
  <div class="user-login-wrapper">
    <div class="user-login-types">
      <div>
        <span>로그인</span>
        <div id="naver_id_login"></div>
        <div class="divide-line"></div>
        <div class="user-login-personal-wrapper">
          <input placeholder="Email" type="email" v-model="user.email" />
          <input placeholder="Password" type="password" v-model="user.password" v-on:keyup.enter="loginUser" />
          <div class="custom-checkbox">
            <div class="checkbox-wrapper-19">
              <input v-if="isRememberEmail" checked type="checkbox" id="cbtest-19" @click="rememberEmail" />
              <input v-else type="checkbox" id="cbtest-19" @click="rememberEmail" />
              <label for="cbtest-19" class="check-box" />
            </div>
            <span>이메일 기억하기</span>
          </div>
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
      isRememberEmail: false,
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
  created() {
    const storeEmail = localStorage.getItem("storeEmail");

    if (storeEmail) {
      this.user.email = storeEmail;
      this.isRememberEmail = true;
    }
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

      if (this.isRememberEmail) {
        localStorage.setItem("storeEmail", this.user.email);
      }

      this.userLoginAction(this.user);
    },
    rememberEmail() {
      this.isRememberEmail = !this.isRememberEmail;
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
  height: 600px;
  border: 1px solid white;
  border-radius: 10px;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
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
  width: 230px;
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

.custom-checkbox {
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
}

.custom-checkbox > div {
  margin-right: 10px;
}

.checkbox-wrapper-19 {
  box-sizing: border-box;
  --background-color: #fff;
  --checkbox-height: 25px;
}

@-moz-keyframes dothabottomcheck-19 {
  0% {
    height: 0;
  }
  100% {
    height: calc(var(--checkbox-height) / 2);
  }
}

@-webkit-keyframes dothabottomcheck-19 {
  0% {
    height: 0;
  }
  100% {
    height: calc(var(--checkbox-height) / 2);
  }
}

@keyframes dothabottomcheck-19 {
  0% {
    height: 0;
  }
  100% {
    height: calc(var(--checkbox-height) / 2);
  }
}

@keyframes dothatopcheck-19 {
  0% {
    height: 0;
  }
  50% {
    height: 0;
  }
  100% {
    height: calc(var(--checkbox-height) * 1.2);
  }
}

@-webkit-keyframes dothatopcheck-19 {
  0% {
    height: 0;
  }
  50% {
    height: 0;
  }
  100% {
    height: calc(var(--checkbox-height) * 1.2);
  }
}

@-moz-keyframes dothatopcheck-19 {
  0% {
    height: 0;
  }
  50% {
    height: 0;
  }
  100% {
    height: calc(var(--checkbox-height) * 1.2);
  }
}

.checkbox-wrapper-19 input[type="checkbox"] {
  display: none;
}

.checkbox-wrapper-19 .check-box {
  height: var(--checkbox-height);
  width: var(--checkbox-height);
  background-color: transparent;
  border: calc(var(--checkbox-height) * 0.1) solid #000;
  border-radius: 5px;
  position: relative;
  display: inline-block;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -moz-transition: border-color ease 0.2s;
  -o-transition: border-color ease 0.2s;
  -webkit-transition: border-color ease 0.2s;
  transition: border-color ease 0.2s;
  cursor: pointer;
}
.checkbox-wrapper-19 .check-box::before,
.checkbox-wrapper-19 .check-box::after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  height: 0;
  width: calc(var(--checkbox-height) * 0.2);
  background-color: #34b93d;
  display: inline-block;
  -moz-transform-origin: left top;
  -ms-transform-origin: left top;
  -o-transform-origin: left top;
  -webkit-transform-origin: left top;
  transform-origin: left top;
  border-radius: 5px;
  content: " ";
  -webkit-transition: opacity ease 0.5;
  -moz-transition: opacity ease 0.5;
  transition: opacity ease 0.5;
}
.checkbox-wrapper-19 .check-box::before {
  top: calc(var(--checkbox-height) * 0.72);
  left: calc(var(--checkbox-height) * 0.41);
  box-shadow: 0 0 0 calc(var(--checkbox-height) * 0.05) var(--background-color);
  -moz-transform: rotate(-135deg);
  -ms-transform: rotate(-135deg);
  -o-transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  transform: rotate(-135deg);
}
.checkbox-wrapper-19 .check-box::after {
  top: calc(var(--checkbox-height) * 0.37);
  left: calc(var(--checkbox-height) * 0.05);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.checkbox-wrapper-19 input[type="checkbox"]:checked + .check-box,
.checkbox-wrapper-19 .check-box.checked {
  border-color: #34b93d;
}
.checkbox-wrapper-19 input[type="checkbox"]:checked + .check-box::after,
.checkbox-wrapper-19 .check-box.checked::after {
  height: calc(var(--checkbox-height) / 2);
  -moz-animation: dothabottomcheck-19 0.2s ease 0s forwards;
  -o-animation: dothabottomcheck-19 0.2s ease 0s forwards;
  -webkit-animation: dothabottomcheck-19 0.2s ease 0s forwards;
  animation: dothabottomcheck-19 0.2s ease 0s forwards;
}
.checkbox-wrapper-19 input[type="checkbox"]:checked + .check-box::before,
.checkbox-wrapper-19 .check-box.checked::before {
  height: calc(var(--checkbox-height) * 1.2);
  -moz-animation: dothatopcheck-19 0.4s ease 0s forwards;
  -o-animation: dothatopcheck-19 0.4s ease 0s forwards;
  -webkit-animation: dothatopcheck-19 0.4s ease 0s forwards;
  animation: dothatopcheck-19 0.4s ease 0s forwards;
}
</style>
