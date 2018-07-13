import Vue from 'vue';
import Vuex from 'vuex';

import { firebaseMutations } from 'vuexfire';

import user from './modules/user';
import properties from './modules/properties';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: { ...firebaseMutations },
  modules: {
    user,
    properties
  }
});
