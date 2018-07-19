import Vue from 'vue';
import Router from 'vue-router';
// import auth from '@/auth';
import { i18n } from './localization';
// import store from '@/store';

import Home from './views/Home.vue';
// import About from './views/About.vue';
import AddItem from './views/AddItem.vue';
import Property from './views/Property.vue';
import Dashboard from './views/Dashboard.vue';
import Auth from './views/Auth.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    alias: '/:locale'
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: Home
  // },
  {
    path: '/:locale/auth',
    name: 'auth',
    component: Auth,
    meta: { guestOnly: true }
  },
  {
    path: '/:locale/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requireAuth: true }
  },
  {
    path: '/:locale/add',
    name: 'add',
    component: AddItem,
    meta: { requireAuth: true }
  },
  {
    path: '/:locale/property/:id',
    name: 'property',
    component: Property,
    meta: { requireAuth: true }
  },
  {
    path: '/:locale/*',
    name: 'not-found',
    component: Home
  }
];

export const router = new Router({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  setLocale(to);
  // const currentUser = auth.user();
  // const currentUser = store.getters['user/user'];
  // const requireAuth = to.matched.some(record => record.meta.requireAuth);
  // const guestOnly = to.matched.some(record => record.meta.guestOnly);

  // console.log('Router - currentUser:', currentUser, to);

  // if (requireAuth && !currentUser)
  //   next({ name: 'auth', params: { locale: i18n.locale } });
  // // else if (guestOnly && currentUser) next('dashboard');
  // else next();
  next();
});

const setLocale = to => {
  let locale = '',
    localeUrlSegment = to.path.split('/'),
    currentLocale = i18n.locale;

  // Get locale from path
  localeUrlSegment.shift();
  locale = localeUrlSegment[0];

  // Locale fallback
  if (locale === '') locale = currentLocale;

  // Set locale
  i18n.locale = locale;
  to.params.locale = locale;
};
