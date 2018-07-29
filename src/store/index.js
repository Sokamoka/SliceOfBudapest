import Vue from 'vue';
import Vuex from 'vuex';

import { firebaseMutations } from 'vuexfire';

import auth from './modules/auth';
import user from './modules/user';
import error from './modules/error';
import properties from './modules/properties';
import property from './modules/add-property';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: { ...firebaseMutations },
  modules: {
    auth,
    user,
    error,
    properties,
    property
  }
});
