import Vue from 'vue';
import Router from 'vue-router';
import auth from '@/auth';

import Home from './views/Home.vue';
// import About from './views/About.vue';
// import AddItem from './views/AddItem.vue';
import Dashboard from './views/Dashboard.vue';
import Auth from './views/Auth.vue';

Vue.use(Router);

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    meta: { guestOnly: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requireAuth: true }
  },
  { path: '*', redirect: '/home' }
];

export const router = new Router({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  // console.log('TO:', to, from);
  const currentUser = auth.user();
  const requireAuth = to.matched.some(record => record.meta.requireAuth);
  const guestOnly = to.matched.some(record => record.meta.guestOnly);

  if (requireAuth && !currentUser) next('auth');
  else if (guestOnly && currentUser) next('dashboard');
  else next();
});
