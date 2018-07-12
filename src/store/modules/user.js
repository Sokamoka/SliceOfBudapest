import auth from '@/auth';

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    user: state => state.user,
    isLogged: state => state.user !== null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    setCurrentUser: ({ commit }) => {
      commit('setUser', auth.user());
    }
  }
};
