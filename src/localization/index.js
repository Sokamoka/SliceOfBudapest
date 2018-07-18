import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VeeValidate from 'vee-validate';

import hu from './languages/hu';
import en from './languages/en';

import validatorHU from './languages/validator_hu';
import validatorEN from './languages/validator_en';

const messages = {
  hu,
  en
};

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'hu',
  messages
});

// VeeValidate dictionary
const dictionary = {
  en: validatorEN,
  hu: validatorHU
};

Vue.use(VeeValidate, { locale: 'hu', dictionary });
