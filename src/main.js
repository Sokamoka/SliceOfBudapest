import Vue from 'vue';
import App from './App.vue';
import VueClazyLoad from 'vue-clazy-load';
import { router } from './router';
import { i18n } from './localization';
import store from '@/store';
import './assets/styles/main.scss';

/* eslint-disable */
import firebase from './firebase/firebase';
import auth from './firebase/auth';
/* eslint-enable */

import Toasted from 'vue-toasted';
Vue.use(Toasted, {
  position: 'top-center'
});

Vue.use(VueClazyLoad);

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app');
