export default {
  state: {
    currentUser: null
  },
  getters: {
    currentUser: state => state.currentUser
  },
  mutations: {
    userStatus(state, user) {
      if (user) {
        state.currentUser = user;
      } else {
        state.currentUser = null;
      }
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('userStatus', user);
    }
  }
};
