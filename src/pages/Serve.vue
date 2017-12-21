<template>
  <div class="serve">
    <top-header :username="userInfo.ra_realname" :type="userInfo.ra_type" :logout="userLogout"/>
    <div class="page__body">
      <asider basePath="/serve"/>
      <div class="content__wrapper" :style="{height: screenHeight}">
        <!-- 弹出窗口 -->
        <modal type="small" :title="modalType">
          <div class="spin__wrapper" v-show="global.spin">
            <Spin size="large" fix></Spin>
          </div>
          <!-- 开桌 -->
          <div v-if="modalType === '开桌'">
            <number-selector label="成人及1.3米以上儿童" name="adult" :number="{value: adult_num, type: 'adult_num'}"/>
            <number-selector label="1.1-1.3米儿童" name="child" :number="{value: child_num, type: 'child_num'}"/>
            <div class="btn__wrapper">
              <base-button text="确认" color="#ea5820" :handleClick="() => {
                if (adult_num === 0 && child_num === 0) {
                  $Message.warning('请选择人数');
                } else {
                  CHANGE_SPIN(true);
                  openTable([params_open,$Message,$Spin]);
                }
              }"/>
              <base-button text="取消" color="#c4c4c4" :handleClick="CLOSE_MODAL"/>
            </div>
          </div>
          <!-- 增减人数 -->
          <div v-if="modalType === '增减人数'">
            <number-selector label="成人及1.3米以上儿童" name="adult" :number="{value: adult_num, type: 'adult_num'}"/>
            <number-selector label="1.1-1.3米儿童" name="child" :number="{value: child_num, type: 'child_num'}"/>
            <div class="btn__wrapper">
              <base-button text="确认" color="#ea5820" :handleClick="() => { CHANGE_SPIN(true);editPeopleNumber([params_edit,$Message,$Spin]); }"/>
              <base-button text="取消" color="#c4c4c4" :handleClick="CLOSE_MODAL"/>
            </div>
          </div>
          <!-- 退桌 -->
          <div v-if="modalType === '退桌'">
            <p class="alert__text">您是否确定退桌？</p>
            <div class="btn__wrapper">
              <base-button text="确认" color="#ea5820" :handleClick="() => { CHANGE_SPIN(true);retreatTable([{ ro_number: c_table_number, ro_tableid: c_table_id},$Message,$Spin]); }"/>
              <base-button text="取消" color="#c4c4c4" :handleClick="CLOSE_MODAL"/>
            </div>
          </div>
          <!-- 换桌 -->
          <div v-if="modalType === '换桌'">
            <div class="label__container">选择准备更改的桌号：
              <div class="selector__wrapper">
                <Select v-model="selected" style="width:100px" size="large">
                  <Option v-for="item in free_tablenames" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
            <div class="btn__wrapper">
              <base-button text="确认" color="#ea5820" :handleClick="() => { CHANGE_SPIN(true);editTable([{ ro_number: c_table_number, ro_tableid: selected, tableName: free_tablenames.filter(item => item.value === selected)[0].label, old_tablied: c_table_id },$Message,$Spin]); }"/>
              <base-button text="取消" color="#c4c4c4" :handleClick="CLOSE_MODAL"/>
            </div>
          </div>
        </modal>
        <section class="table-panel">
          <grid :handleClick="CHANGE_TABLE_CHECKED_STATE" :checked="table.checked" :tablename="table.rtn_tablename" :id="table.rtn_id" :number="table.ro_number" :mealAnum="table.ro_mealAnum" :mealBnum="table.ro_mealBnum "v-for="table in tablelist" :key="table.rtn_id" />
        </section>
        <nav class="action-bars">
          <button class="action-btn" @click="changeModal" :disabled="c_table_number || !hasSelected">开桌</button>
          <button class="action-btn" @click="changeModal" :disabled="!c_table_number || !hasSelected">增减人数</button>
          <button class="action-btn" @click="changeModal" :disabled="!c_table_number || !hasSelected">退桌</button>
          <button class="action-btn" @click="changeModal" :disabled="!c_table_number || !hasSelected">换桌</button>
          <button class="action-btn" @click="toMenu" :disabled="!c_table_number || !hasSelected">菜单</button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex';
import topHeader from '@/components/TopHeader';
import asider from '@/components/Asider';
import grid from '@/components/Grid';
import baseButton from '@/components/BaseButton';
import modal from '@/components/Modal';
import numberSelector from '@/components/NumberSelector';
import WebSocket from '../utils/websocket';


export default {
  components: { topHeader, asider, grid, baseButton, modal, numberSelector },
  data() {
    return {
      selected: '',
      modalType: '',
      screenHeight: `${(document.body.scrollHeight - 120)}px`,
      userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
    };
  },
  computed: {
    ...mapState('waiter', [
      'tablelist',
      'c_table_number',
      'c_table_id',
      'adult_num',
      'child_num',
    ]),
    ...mapState([
      'global',
    ]),
    ...mapGetters('waiter', [
      'params_open',
      'params_edit',
      'hasSelected',
      'free_tablenames',
    ]),
  },
  methods: {
    ...mapMutations([
      'SHOW_MODAL',
      'CLOSE_MODAL',
      'CHANGE_SPIN',
    ]),
    ...mapMutations('waiter', [
      'CHANGE_TABLE_CHECKED_STATE',
    ]),
    ...mapActions('waiter', [
      'fetchTableList',
      'openTable',
      'retreatTable',
      'editPeopleNumber',
      'editTable',
    ]),
    ...mapActions('user', [
      'userLogout',
    ]),
    changeModal(event) {
      this.modalType = event.currentTarget.innerText;
      this.SHOW_MODAL();
    },
    toMenu() {
      this.$router.history.push('/foodmenulist');
    },
  },
  created() {
    let tablestate;
    switch (this.$route.query.type) {
      case 'all': tablestate = ''; break;
      case 'started': tablestate = 1; break;
      case 'free': tablestate = 2; break;
      default: tablestate = 0;
    }
    this.fetchTableList({ state: tablestate });
  },
  beforeRouteUpdate(to, from, next) {
    let tablestate;
    switch (to.query.type) {
      case 'all': tablestate = ''; break;
      case 'started': tablestate = 1; break;
      case 'free': tablestate = 2; break;
      default: tablestate = 0;
    }
    this.fetchTableList({ state: tablestate });
    next();
  },
  mounted() {
    WebSocket((event) => {
      console.log(event.data);
      const data = JSON.parse(event.data);
      switch (data.code) {
        case 1: this.$Message.info(data.msg);
          this.$refs.audio.src = `//cdn.dreamhiway.com/v16/restaurant/music/1_${data.tablename}_服务.mp3`;
          this.$refs.audio.play();
          break;
        case 2: this.$Message.info(data.msg);
          this.$refs.audio.src = `//cdn.dreamhiway.com/v16/restaurant/music/1_${data.tablename}_买单.mp3`;
          this.$refs.audio.play();
          break;
        case 4: this.$Message.success({ content: data.msg, onClose() { location.reload(); } }); break;
        case 5: this.$Message.success({ content: data.msg, onClose() { location.reload(); } }); break;
        case 6: this.$Message.success({ content: data.msg, onClose() { location.reload(); } }); break;
        case 7: this.$Message.success({ content: data.msg, onClose() { location.reload(); } }); break;
        case 9: this.$Message.success({ content: data.msg, onClose() { location.reload(); } }); break;
        case 10: this.$Message.success({ content: data.msg, onClose() { location.reload(); } }); break;
        default: break;
      }
      console.log(data);
    });
  },
};

</script>

<style>
.serve {
  height: inherit;
}

.page__body {
  display: flex;
  height: calc(100% - 70 / 16 * 1em);
}

.content__wrapper {
  position: relative;
  display: block;
  width: 80%;
  padding: 0 calc(35 / 16 * 1em) 120px;
  /* height: 90vh; */
  overflow: scroll;
  overflow-y: scroll;
}

.table-panel {
  /* display: flex;
  flex-wrap: wrap; */
  display: block;
  overflow: hidden;
}

.action-bars {
  display: block;
  overflow: hidden;
  width: 100%;
  /* height: calc(90 / 16 * 1em); */
  background-color: white;
  border: solid 1px #e8e8e8;
  margin-top: 10px;
  position: fixed;
  left: 0;
  bottom: 0;
  text-align: center;
}

.action-btn {
  width: calc(150 / 16 * 1em);
  height: calc(60 / 16 * 1em);
  margin: 5px calc(10 / 16 * 1em);
  border-radius: 10px;
  background: linear-gradient(to top, #e3e3e3, #ffffff);
  border: solid 1px #e8e8e8;
  color: #ff7a18;
}

.action-btn:disabled {
  background: #f2f2f2;
  color: #999999;
}

.btn__wrapper {
  display: flex;
  justify-content: center;
  padding-top: calc(35 / 16 * 1em);
}

.btn__wrapper > .btn {
  margin: 0 calc(25 / 16 * 1em);
}

.alert__text {
  text-align: center;
}

.label__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.spin__wrapper {
  position: fixed;
  z-index: 99;
  top: 45px;
  left: 0;
  width: 100%;
  height: calc(100% - 45px);
}
</style>
