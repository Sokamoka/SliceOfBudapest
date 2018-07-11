import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import AddItem from './views/AddItem.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/estate/:id',
      name: 'estate',
      component: About
    },
    {
      path: '/add',
      name: 'add',
      component: AddItem
    }
  ]
});
