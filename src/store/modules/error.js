const state = {
  onError: ''
};

const getters = {
  onError: state => state.onError
};

const mutations = {
  offError(state) {
    state.onError = '';
  }
};

const actions = {
  offError({ commit }) {
    commit('offError');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
