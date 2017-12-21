import Vue from 'vue';
// import router from '@/router';
import apis from '@/apis';
import * as types from '../mutation-types';

export default {
  namespaced: true,
  state: {
    tablelist: [],
    c_table_id: 0,
    c_table_number: '',
    c_table_name: '',
    adult_num: 1,
    child_num: 1,
    people_info: {},
  },
  getters: {
    params_open: state => ({ ro_tableid: state.c_table_id, ro_mealAnum: state.adult_num, ro_mealBnum: state.child_num }),
    params_edit: state => ({ ro_number: state.c_table_number, ro_mealAnum: state.adult_num, ro_mealBnum: state.child_num }),
    hasSelected: state => state.tablelist.some(table => table.checked),
    free_tablenames: state => state.tablelist.filter(table => !table.ro_number).map(table => ({ label: table.rtn_tablename, value: table.rtn_id })),
  },
  mutations: {
    [types.RECEIVE_TABLE_LIST](state, payload) {
      state.tablelist = payload;
    },
    [types.RECEIVE_PEOPLE_INFO](state, payload) {
      state.people_info = payload;
    },
    [types.CHANGE_TABLE_CHECKED_STATE](state, id) {
      state.tablelist.forEach((table) => {
        table.checked = false;
      });
      state.tablelist.filter(table => table.rtn_id === id)[0].checked = true;
      state.c_table_id = id;
      state.c_table_number = state.tablelist.filter(table => table.rtn_id === id)[0].ro_number;
      state.c_table_name = state.tablelist.filter(table => table.rtn_id === id)[0].rtn_tablename;
      state.adult_num = state.tablelist.filter(table => table.rtn_id === id)[0].ro_mealAnum;
      state.child_num = state.tablelist.filter(table => table.rtn_id === id)[0].ro_mealBnum;
    },
    [types.CHANGE_PEOPLE_NUM](state, [key, num]) {
      if (num >= 0) {
        state[key] = num;
      }
    },
  },
  actions: {
    // 获取桌子列表
    fetchTableList({ commit, state }, params) {
      Vue.http.post(apis.w_table_list, params)
        .then(res => res.json())
        .then((res) => {
          commit(types.RECEIVE_TABLE_LIST, res.result.map(table => Object.assign(table, { checked: false })));
        });
    },
    // 获取餐桌人数详情
    fetchPeopleInfo({ commit }, params) {
      Vue.http.post(apis.w_table_people_number, params)
      .then(res => res.json())
      .then((res) => {
        commit(types.RECEIVE_PEOPLE_INFO, res.result[0]);
      });
    },
    // 开桌
    openTable({ commit }, [params, $Message]) {
      Vue.http.post(apis.w_open_table, params)
        .then(res => res.json())
        .then((res) => {
          if (res.result) {
            commit(types.CLOSE_MODAL, null, { root: true });
            commit(types.CHANGE_SPIN, false, { root: true });
          }
        })
        .catch(() => {
          $Message.error('开桌失败');
        });
    },
    // 退桌
    retreatTable({ commit }, [params, $Message]) {
      Vue.http.post(apis.w_retreat_table, params)
        .then(res => res.json())
        .then((res) => {
          if (res.result) {
            commit(types.CLOSE_MODAL, null, { root: true });
            commit(types.CHANGE_SPIN, false, { root: true });
          }
        })
        .catch(() => {
          $Message.error('退桌失败');
        });
    },
    // 修改人数
    editPeopleNumber({ commit }, [params, $Message]) {
      Vue.http.post(apis.w_edit_people_number, params)
        .then(res => res.json())
        .then((res) => {
          if (res.result) {
            commit(types.CLOSE_MODAL, null, { root: true });
            commit(types.CHANGE_SPIN, false, { root: true });
          }
        })
        .catch(() => {
          $Message.error('修改失败');
        });
    },
    // 换桌
    editTable({ commit }, [params, $Message]) {
      Vue.http.post(apis.w_edit_table, params)
        .then(res => res.json())
        .then((res) => {
          if (res.result) {
            commit(types.CLOSE_MODAL, null, { root: true });
            commit(types.CHANGE_SPIN, false, { root: true });
          }
        })
        .catch(() => {
          $Message.error('换桌失败');
        });
    },
    // 买单
    async pay(context, [params, $Message]) {
      let code;
      await Vue.http.post(apis.pay, params)
        .then(res => res.json())
        .then((res) => {
          if (res.result) {
            context.commit(types.CHANGE_SPIN, false, { root: true });
            code = 4;
          } else {
            $Message.error('支付失败');
            code = 3;
          }
        })
        .catch(() => {
          $Message.error('支付失败');
        });
      return code;
    },
  },
};
