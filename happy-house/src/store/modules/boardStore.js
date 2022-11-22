// import Vuex from 'vuex';

// Vue.use(Vuex);

// const store = new Vuex.Store({
//     state: () => ({
//         feature: { property: value },
//     }),
//     modules: {},
//     mutations: {},
//     actions: {},
//     getters: {},
// });

const boardStore = {
  namespaced: true,
  state: () => ({
    boardListData: {
      pgno: null,
      key: null,
      word: null,
    },
  }),
  // modules: {},
  mutations: {
    SET_BOARD_PGNO(state, payload) {
      state.boardListData.pgno = payload;
    },
    SET_SEARCH_KEY(state, payload) {
      state.boardListData.key = payload;
    },
    SET_SEARCH_WORD(state, payload) {
      state.boardListData.word = payload;
    },
    SET_BOARD_LIST_DATA(state, payload) {
      state.boardListData.pgno = payload.pgno;
      state.boardListData.key = payload.key;
      state.boardListData.word = payload.word;
    },
  },
  // actions: {},
  getters: {
    GET_BOARD_PGNO(state) {
      return state.boardListData.pgno;
    },
    GET_SEARCH_KEY(state) {
      return state.boardListData.key;
    },
    GET_SEARCH_WORD(state) {
      return state.boardListData.word;
    },
    GET_BOARD_LIST_DATA(state) {
      return state.boardListData;
    },
  },
};

export default boardStore;
