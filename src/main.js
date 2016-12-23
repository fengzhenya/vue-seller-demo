// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from 'src/store/';
import routes from './router.js';
import App from './App';
import './assets/css/reset.css';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

router.afterEach((to, from) => {
  to.matched.some(record => {
    document.title = record.meta.name;
  });
});
