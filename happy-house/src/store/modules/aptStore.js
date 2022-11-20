const aptStore = {
  namespaced: true,
  state: {
    searchedLocation: {
      x: "",
      y: "",
    },
  },
  getters: {},
  mutations: {
    SET_SEARCHED_LOCATION(state, searchedLocation) {
      state.searchedLocation.x = searchedLocation.x;
      state.searchedLocation.y = searchedLocation.y;
    },
  },
  actions: {},
};

export default aptStore;
