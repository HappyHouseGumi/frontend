const qnaStore = {
  namespaced: true,
  state: () => ({
    qnaListData: {
      pgno: 1,
      key: null,
      word: null,
    },
  }),
  // modules: {},
  mutations: {
    SET_QNA_PGNO(state, payload) {
      state.qnaListData.pgno = payload;
    },
    SET_SEARCH_KEY(state, payload) {
      state.qnaListData.key = payload;
    },
    SET_SEARCH_WORD(state, payload) {
      state.qnaListData.word = payload;
    },
    SET_QNA_LIST_DATA(state, payload) {
      state.qnaListData.pgno = payload.pgno;
      state.qnaListData.key = payload.key;
      state.qnaListData.word = payload.word;
    },
  },
  // actions: {},
  getters: {
    GET_QNA_PGNO(state) {
      return state.qnaListData.pgno;
    },
    GET_SEARCH_KEY(state) {
      return state.qnaListData.key;
    },
    GET_SEARCH_WORD(state) {
      return state.qnaListData.word;
    },
    GET_QNA_LIST_DATA(state) {
      return state.qnaListData;
    },
  },
};

export default qnaStore;
