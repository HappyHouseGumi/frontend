import router from "@/router";
import { login, loginOauth } from "@/api/user";

const userStore = {
  namespaced: true,
  state: {
    isLoginStatus: false,
  },
  getters: {},
  mutations: {
    SET_IS_LOGIN_STATUS(state, isLoginStatus) {
      state.isLoginStatus = isLoginStatus;
    },
  },
  actions: {
    userLoginAction({ commit }, user) {
      login(
        user,
        ({ data }) => {
          if (data.flag === "success") {
            const accessToken = data.data[0]["access-token"];
            const base64Payload = atob(accessToken.split(".")[1]);
            const payload = JSON.parse(base64Payload.toString());
            const userId = payload.userId;

            const loginUser = {
              userId,
              accessToken,
            };

            commit("SET_IS_LOGIN_STATUS", true);
            localStorage.setItem("loginUser", JSON.stringify(loginUser));
            alert("로그인 성공!!");

            router.push("/");
            router.go();
          } else {
            alert("일치하는 회원 정보가 없습니다.");
            commit("SET_IS_LOGIN_STATUS", false);
          }
        },
        (error) => {
          console.log("로그인 오류 : " + error);
        }
      );
    },
    userLoginOauthAction({ commit }, token) {
      loginOauth(
        token,
        ({ data }) => {
          if (data.flag === "success") {
            const accessToken = data.data[0]["access-token"];
            const base64Payload = atob(accessToken.split(".")[1]);
            const payload = JSON.parse(base64Payload.toString());
            const userId = payload.userId;

            const loginUser = {
              userId,
              accessToken,
            };

            commit("SET_IS_LOGIN_STATUS", true);
            localStorage.setItem("loginUser", JSON.stringify(loginUser));

            router.push("/");
            router.go();
          } else {
            alert("일치하는 회원 정보가 없습니다.");
            commit("SET_IS_LOGIN_STATUS", false);
          }
        },
        (error) => {
          console.log("oauth 회원가입 오류 : " + error);
        }
      );
    },
  },
};

export default userStore;
