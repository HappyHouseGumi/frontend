const aptStore = {
  namespaced: true,
  state: {
    searchedLocation: {
      x: "",
      y: "",
      level: "",
    },
    dealList: [],
  },
  getters: {
    GET_LOC(state) {
      return state.searchedLocation;
    },
    GET_DEAL(state) {
      return state.dealList;
    },
  },
  mutations: {
    SET_SEARCHED_LOCATION(state, searchedLocation) {
      state.searchedLocation.x = searchedLocation.x;
      state.searchedLocation.y = searchedLocation.y;
      state.searchedLocation.level = searchedLocation.level;
    },
    RESET_SEARCHED_LOCATION(state) {
      state.searchedLocation.x = 36.2683;
      state.searchedLocation.y = 127.6358;
      state.searchedLocation.level = 12;
    },

    SET_DEAL_LIST(state, dealList) {
      state.dealList = dealList;
    },
  },
  actions: {},
};

export default aptStore;
