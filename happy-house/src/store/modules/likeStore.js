const likeStore = {
  namespaced: true,
  state: () => ({
    likeListData: {
      pgno: null,
      key: null,
      word: null,
    },
  }),
  // modules: {},
  mutations: {
    SET_LIKE_PGNO(state, payload) {
      state.likeListData.pgno = payload;
    },
    SET_SEARCH_KEY(state, payload) {
      state.likeListData.key = payload;
    },
    SET_SEARCH_WORD(state, payload) {
      state.likeListData.word = payload;
    },
    SET_LIKE_LIST_DATA(state, payload) {
      state.likeListData.pgno = payload.pgno;
      state.likeListData.key = payload.key;
      state.likeListData.word = payload.word;
    },
  },
  // actions: {},
  getters: {
    GET_LIKE_PGNO(state) {
      return state.likeListData.pgno;
    },
    GET_SEARCH_KEY(state) {
      return state.likeListData.key;
    },
    GET_SEARCH_WORD(state) {
      return state.likeListData.word;
    },
    GET_LIKE_LIST_DATA(state) {
      return state.likeListData;
    },
  },
};

export default likeStore;
