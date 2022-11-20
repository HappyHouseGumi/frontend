const aptStore = {
  namespaced: true,
  state: {
    searchedLocation: {
      x: "",
      y: "",
      level: "",
    },
  },
  getters: {
    GET_LOC(state) {
      return state.searchedLocation;
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
  },
  actions: {},
};

export default aptStore;
