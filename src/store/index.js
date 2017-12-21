import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './mutation-types';
import modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules,
  state: {
    global: {
      modal: false,
      action_window: false,
      spin: false,
    },
  },
  getters: {
    getFullName: state => state.firstName + state.lastName,
  },
  mutations: {
    [types.SHOW_MODAL](state) {
      state.global.modal = true;
    },
    [types.CLOSE_MODAL](state) {
      state.global.modal = false;
    },
    [types.SHOW_ACTION_WINDOW](state) {
      state.global.action_window = true;
    },
    [types.CLOSE_ACTION_WINDOW](state) {
      state.global.action_window = false;
    },
    [types.CHANGE_SPIN](state, bool) {
      state.global.spin = bool;
    },
  },
  actions: {
    incrementSuccess(context) {
      console.log(context);
      context.dispatch('print');
      alert('调用increment成功');
    },
    print() {
      console.log('print!!!');
    },
  },
});

export default store;
