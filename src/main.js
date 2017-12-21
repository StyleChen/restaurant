// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'iview/dist/styles/iview.css';
import '@/assets/styles/base.css';
import Vue from 'vue';
import Resource from 'vue-resource';
import iview from 'iview';
import Marquee from 'vue-marquee';
import store from './store/';


import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Resource);
Vue.use(iview);

Vue.component('vue-marquee', Marquee);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store,
});

router.beforeEach((to, from, next) => {
  iview.LoadingBar.start();
  next();
});

router.afterEach(() => {
  iview.LoadingBar.finish();
});
