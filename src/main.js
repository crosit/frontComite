/*!

=========================================================
* BootstrapVue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/bootstrap-vue-argon-dashboard
* Copyright 2020 chris Esparza (https://www.creative-tim.com)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';
import store from './store/store'
import axios from 'axios';
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

// router setup
import router from './routes/router';
// plugin setup
Vue.use(DashboardPlugin);
Vue.use(Toast);

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
Vue.prototype.$axios = axios;


store.commit('setUrl', 'http://localhost:3000/');
// console.log('API_URL: ' + store.state.url);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
});
