import Vue from "vue";
import Vuex from "vuex";
import userStore from "@/store/modules/userStore";
import aptStore from "@/store/modules/aptStore";
import boardStore from "@/store/modules/boardStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { userStore, aptStore, boardStore },
});
