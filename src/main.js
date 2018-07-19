import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import { i18n } from './localization';
import store from '@/store';

// import auth from '@/auth';

import './assets/styles/main.scss';

/* eslint-disable */
import firebase from './firebase/firebase';
import auth from './firebase/auth';
/* eslint-enable */

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app');
