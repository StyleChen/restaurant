import Vue from 'vue';
import Router from 'vue-router';
import pages from '@/pages';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: 'waiter/restaurant',
  routes: [
    {
      path: '/',
      name: 'Hello',
      redirect: '/login',
    },
    {
      path: '/login',
      component: pages.Login,
    },
    {
      path: '/serve',
      component: pages.Serve,
    },
    {
      path: '/foodmenulist',
      component: pages.Foodmenulist,
    },
    {
      path: '/cashier',
      component: pages.Cashier,
      children: [
        {
          path: 'bill',
          component: pages.Bill,
        },
        {
          path: 'reserve',
          component: pages.Reserve,
        },
      ],
    },
  ],
});
