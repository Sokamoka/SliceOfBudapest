import firebase from '@/firebase/firebase';

const state = {
  user: {},
  isLoggedIn: localStorage.getItem('gate')
    ? localStorage.getItem('gate')
    : false
};

const getters = {
  user: state => state.user,
  isLoggedIn: state => state.isLoggedIn
};

const mutations = {
  setUser(state, user) {
    if (user) {
      state.user = user;
      state.isLoggedIn = true;
      localStorage.setItem('gate', true);
    } else {
      state.user = {};
      state.isLoggedIn = false;
      localStorage.removeItem('gate');
    }
  }
};

const actions = {
  async login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  },
  async logout() {
    await firebase.auth().signOut();
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
