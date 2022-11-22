const noticeStore = {
  namespaced: true,
  state: () => ({
    noticeListData: {
      pgno: null,
      word: null,
    },
  }),
  // modules: {},
  mutations: {
    SET_NOTICE_PGNO(state, payload) {
      state.noticeListData.pgno = payload;
    },
    SET_SEARCH_WORD(state, payload) {
      state.noticeListData.word = payload;
    },
    SET_NOTICE_LIST_DATA(state, payload) {
      state.noticeListData.pgno = payload.pgno;
      state.noticeListData.word = payload.word;
    },
  },
  // actions: {},
  getters: {
    GET_NOTICE_PGNO(state) {
      return state.noticeListData.pgno;
    },
    GET_SEARCH_WORD(state) {
      return state.noticeListData.word;
    },
    GET_NOTICE_LIST_DATA(state) {
      return state.noticeListData;
    },
  },
};

export default noticeStore;
