import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoginStatus: false,
  },
  getters: {},
  mutations: {
    SET_IS_LOGIN_STATUS(state, isLoginStatus) {
      state.isLoginStatus = isLoginStatus;
    },
  },
  actions: {},
  modules: {},
});
