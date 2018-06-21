import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
// Vue.prototype.API_URL = "http://localhost:8080";
Vue.prototype.API_URL = "https://shecodes-devel.herokuapp.com";
Vue.prototype.$eventHub = new Vue();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
