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
    getLocation(state) {
      return state.searchedLocation;
    },
  },
  mutations: {
    SET_SEARCHED_LOCATION(state, searchedLocation) {
      state.searchedLocation.x = searchedLocation.x;
      state.searchedLocation.y = searchedLocation.y;
      state.searchedLocation.level = searchedLocation.level;
    },
  },
  actions: {},
};

export default aptStore;
