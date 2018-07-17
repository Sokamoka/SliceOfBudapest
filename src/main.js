import Vue from 'vue';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import { router } from './router';
import { i18n } from './localization';
import store from '@/store';

import auth from '@/auth';

import './assets/styles/main.scss';

Vue.config.productionTip = false;

Vue.use(VeeValidate);

new Vue({
  router,
  i18n,
  store,
  beforeCreate() {
    auth.init(this);
  },
  render: h => h(App)
}).$mount('#app');
