import Vue from 'vue';
import VueI18n from 'vue-i18n';

import hu from './languages/hu';
import en from './languages/en';

const messages = {
  hu,
  en
};

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'hu',
  messages
});
