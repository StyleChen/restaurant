import Vue from 'vue';
import router from '@/router';
import apis from '@/apis';
import * as types from '../mutation-types';

export default {
  namespaced: true,
  state: {
    ra_realname: '',
    ra_type: 0,
    webSocketUrl: '',
    error_message: '',
  },
  mutations: {
    [types.RECEIVE_USER_INFO](state, payload) {
      state.ra_realname = payload.ra_realname;
      state.ra_type = payload.ra_type;
      state.webSocketUrl = payload.webSocketUrl;
    },
    [types.USER_LOGIN_SUCCESS](state) {
      console.log('USER_LOGIN_SUCCESS');
      state.error_message = '';
    },
    [types.USER_LOGIN_FAILED](state) {
      console.log('USER_LOGIN_FAILDED');
      state.error_message = '用户名不存在或者密码错误';
    },
  },
  actions: {
    userLogin(context, params) {
      Vue.http.post(apis.login, params)
        .then(res => res.json())
        .then((res) => {
          if (res.result) {
            context.commit(types.RECEIVE_USER_INFO, res.result);
            sessionStorage.setItem('userInfo', JSON.stringify(res.result));
            context.commit(types.USER_LOGIN_SUCCESS);
            switch (res.result.ra_type) {
              case 1:
                location.href = '/admin/restaurant-back';
                break;
              case 2:
                location.href = '/waiter/restaurant/serve?type=all';
                break;
              default: location.href = '/waiter/restaurant/cashier?type=all';
            }
          } else {
            context.commit(types.USER_LOGIN_FAILED);
          }
        });
    },
    userLogout({ commit }) {
      Vue.http.get(apis.logout).then((res => res.json())).then((res) => {
        if (res.result) {
          commit(types.RECEIVE_USER_INFO, {});
          sessionStorage.removeItem('userInfo');
          router.push('/login');
        }
      });
    },
  },
};
