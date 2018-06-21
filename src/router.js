import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuesax from 'vuesax';
import Router from 'vue-router';
import 'vuesax/dist/vuesax.css';
import Home from './views/Home.vue';
import Request from './views/Request.vue';
import Profile from './views/Profile.vue';

Vue.use(Router);
Vue.use(Vuesax);
Vue.use(VueAxios, axios);
window.Vue = Vue;

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/request',
      name: 'request',
      component: Request,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ],
});
