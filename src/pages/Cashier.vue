<template>
  <div class="cashier">
    <top-header :username="userInfo.ra_realname" :type="userInfo.ra_type" :logout="userLogout" :num="action_list.length" :on-click="SHOW_ACTION_WINDOW" />
    <div class="page__body">
      <router-view></router-view>
      <asider basePath="/cashier" />
      <div class="content__wrapper" @click="() => {global.action_window ? CLOSE_ACTION_WINDOW() : null}">
        <action-tip :list="action_list" :on-click="closeAction" :active="global.action_window" />
        <!-- 弹出窗口 -->
        <modal v-if="$route.path === '/cashier'" type="small" :title="modalType" :reload="is_reload" :refresh.sync="isRefresh" :step.sync="step" :time.sync="ro_timeinterval" :dis.sync="ro_discount" :price.sync="ro_disprice" :price2.sync="ro_disprice_2">
          <!-- -------------------------------------- -->
          <div class="spin__wrapper" v-show="global.spin">
            <Spin size="large" fix></Spin>
          </div>
          <!-- 开桌 -->
          <div v-if="modalType === '开桌'">
            <number-selector label="成人及1.3米以上儿童" name="adult" :number="{value: adult_num, type: 'adult_num'}" />
            <number-selector label="1.1-1.3米儿童" name="child" :number="{value: child_num, type: 'child_num'}" />
            <div class="btn__wrapper">
              <base-button text="确认" color="#ea5820" :handleClick="() => {
                  if (adult_num === 0 && child_num === 0) {
                    $Message.warning('请选择人数');
                  } else {
                    CHANGE_SPIN(true);
                    openTable([params_open,$Message,$Spin]);
                  }
                }" />
              <base-button text="取消" color="#c4c4c4" :handleClick="()=>{this.step=1;CLOSE_MODAL()}" />
            </div>
          </div>
          <!-- 买单 第一步-->
          <div v-if="modalType === '买单' && step === 1">
            <h2 class="table__number">{{c_table_name}}</h2>
            <time class="started__time">开桌时间： {{people_info.ro_opentbaledate}}</time>
            <dl class="order__detail">
              <dt class="order__head">
                <span>套餐</span>
                <span>数量</span>
              </dt>
              <dd>
                <span>成人及1.3米以上儿童</span>
                <span>{{people_info.ro_mealAnum}}</span>
              </dd>
              <dd>
                <span>1.1-1.3米儿童</span>
                <span>{{people_info.ro_mealBnum}}</span>
              </dd>
              <dd class="label__container">
                选择用餐时段：
                <div class="selector__wrapper">
                  <Select v-model="ro_timeinterval" style="width:115px" size="large">
                    <Option v-for="item in ['午餐','晚餐']" :value="item" :key="item">{{ item }}</Option>
                  </Select>
                </div>
              </dd>
              <dd class="label__container">
                选择折扣优惠：
                <div class="selector__wrapper">
                  <Input v-model="ro_discount" placeholder="无折扣" style="width: 115px" number>
                    <span slot="append">折</span>
                  </Input>
                </div>
              </dd>
              <dd class="label__container">
                抵用券金额：
                <div class="selector__wrapper">
                  <Select v-model="ro_disprice" style="width:125px" size="large">
                    <Option v-for="item in [{label: '38元现金券', value: 38}]" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>x
                  <Input v-model="ro_disprice_2" placeholder="数量" style="width: 50px" number>
                  </Input>
                </div>
              </dd>
            </dl>
            <div class="btn__wrapper">
              <base-button text="确认" color="#ea5820" :handleClick="() => { ro_timeinterval ? step = 2 : $Message.warning('请填写完整'); }" />
              <base-button text="取消" color="#c4c4c4" :handleClick="()=>{this.step=1;CLOSE_MODAL()}" />
            </div>
          </div>
          <!-- 买单 第二步-->
          <div v-if="modalType === '买单' && step === 2">
            <h2 class="table__number">{{c_table_name}}</h2>
            <div class="order__money">￥{{lastPrice}}</div>
            <div class="order__lt">应付</div>
            <section class="order__pay">
              <Row :gutter="16" class-name="row">
                <Col span="8">
                <div class="pay__grid" @click="changePayMode" data-mode="会员卡支付">
                  <svg class="icon" aria-hidden="true" style="fill: #ea5820">
                    <use xlink:href="#icon-kaxinxi"></use>
                  </svg>
                  会员卡支付
                </div>
                </Col>
                <Col span="8">
                <div class="pay__grid" @click="changePayMode" data-mode="现金支付">
                  <svg class="icon" aria-hidden="true" style="fill: #f2b955">
                    <use xlink:href="#icon-xianjin"></use>
                  </svg>
                  现金支付
                </div>
                </Col>
                <Col span="8">
                <div class="pay__grid" @click="changePayMode" data-mode="刷卡支付">
                  <svg class="icon" aria-hidden="true" style="fill: #a0c3f3">
                    <use xlink:href="#icon-qiapian"></use>
                  </svg>
                  刷卡支付
                </div>
                </Col>
              </Row>
              <Row :gutter="16" class-name="row">
                <Col span="8">
                <div class="pay__grid" @click="changePayMode" data-mode="微信支付">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-weixin"></use>
                  </svg>
                  微信支付
                </div>
                </Col>
                <Col span="8">
                <div class="pay__grid" @click="changePayMode" data-mode="支付宝支付">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zhifubao"></use>
                  </svg>
                  支付宝支付
                </div>
                </Col>
              </Row>
            </section>
          </div>
          <!-- 买单 第三步-->
          <div v-if="modalType === '买单' && step === 3">
            <p class="alert__text">您是否确定已经{{pay_mode}}成功？</p>
            <div class="btn__wrapper">
              <base-button text="确认" color="#ea5820" :handleClick="payMoney" />
              <base-button text="取消" color="#c4c4c4" :handleClick="()=>{this.step=1;CLOSE_MODAL()}" />
            </div>
          </div>
          <!-- 买单 第四步-->
          <div v-if="modalType === '买单' && step === 4">
            <h2 class="table__number">支付成功</h2>
            <p class="pay__p">餐桌号码<span class="pay__span">{{c_table_name}}</span></p>
            <p class="pay__p">成功支付<span class="pay__span" style="color: var(--theme)">￥{{lastPrice}}</span></p>
            <p class="pay__p">支付方式<span class="pay__span">{{pay_mode}}</span></p>
            <Checkbox v-model="qingdan">是否打印清单</Checkbox>
            <div class="btn__wrapper">
              <base-button text="打印小票" color="#ea5820" icon="icon-fapiao" :handleClick="toPrintPage" />
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
        <!-- -------------------------------------- -->
        <section class="table-panel">
          <grid :handleClick="CHANGE_TABLE_CHECKED_STATE" :checked="table.checked" :tablename="table.rtn_tablename" :id="table.rtn_id" :number="table.ro_number" :mealAnum="table.ro_mealAnum" :mealBnum="table.ro_mealBnum " v-for="table in tablelist" :key="table.rtn_id" />
        </section>
        <nav class="action-bars">
          <button class="action-btn" @click="changeModal" :disabled="c_table_number || !hasSelected">开桌</button>
          <button class="action-btn" @click="(e) => { changeModal(e);fetchPeopleInfo({ ro_number: c_table_number });}" :disabled="!c_table_number || !hasSelected">买单</button>
          <button class="action-btn" @click="changeModal" :disabled="!c_table_number || !hasSelected">增减人数</button>
          <button class="action-btn" @click="changeModal" :disabled="!c_table_number || !hasSelected">退桌</button>
          <button class="action-btn" @click="changeModal" :disabled="!c_table_number || !hasSelected">换桌</button>
        </nav>
        <audio ref="audio"></audio>
        <iframe src="" frameborder="0" ref="iframe" style="display: none"></iframe>
        <iframe src="" frameborder="0" ref="iframe2" style="display: none"></iframe>
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
import actionTip from '@/components/ActionTip';
import WebSocket from '../utils/websocket';

export default {
  components: { topHeader, asider, grid, baseButton, modal, numberSelector, actionTip },
  data() {
    return {
      modalType: '',
      userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
      step: 1,
      ro_timeinterval: '',
      ro_discount: '',
      ro_disprice: '',
      ro_disprice_2: '',
      pay_mode: '',
      action_list: sessionStorage.getItem('action_list') ? JSON.parse(sessionStorage.getItem('action_list')) : [],
      is_reload: false,
      qingdan: false,
      selected: '',
      isRefresh: false,
    };
  },
  watch: {
    isRefresh(val) {
      if (val) {
        let tablestate;
        switch (this.$route.query.type) {
          case 'all': tablestate = ''; break;
          case 'started': tablestate = 1; break;
          case 'free': tablestate = 2; break;
          default: tablestate = 0;
        }
        this.fetchTableList({ state: tablestate });
        this.isRefresh = false;
        this.is_reload = false;
      }
    },
  },
  computed: {
    ...mapState('waiter', [
      'tablelist',
      'c_table_number',
      'c_table_name',
      'adult_num',
      'child_num',
      'people_info',
      'c_table_id',
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
    params_pay() {
      return {
        ro_number: this.c_table_number,
        ro_timeinterval: this.ro_timeinterval,
        ro_discount: this.ro_discount ? `${this.ro_discount}折` : '无',
        ro_disprice: this.ro_disprice * this.ro_disprice_2,
        ro_totalprice: this.totalPrice,
        ro_actualprice: this.lastPrice,
        ro_paytype: this.pay_mode,
        ro_mealAprice: this.ro_timeinterval === '午餐' ? 128 : 138,
        ro_mealBprice: 29,
        ro_tableid: this.c_table_id,
      };
    },
    totalPrice() {
      let onePrice;
      if (this.ro_timeinterval === '午餐') {
        onePrice = 128;
      } else {
        onePrice = 138;
      }
      return (this.adult_num * onePrice) + (this.child_num * 29);
    },
    lastPrice() {
      return !this.ro_discount ? this.totalPrice - (this.ro_disprice * this.ro_disprice_2) : Math.round((this.totalPrice - (this.child_num * 29)) * this.ro_discount * 0.1) + (this.child_num * 29);
    },
  },
  methods: {
    ...mapMutations([
      'SHOW_MODAL',
      'CLOSE_MODAL',
      'SHOW_ACTION_WINDOW',
      'CLOSE_ACTION_WINDOW',
      'CHANGE_SPIN',
    ]),
    ...mapMutations('waiter', [
      'CHANGE_TABLE_CHECKED_STATE',
    ]),
    ...mapActions('waiter', [
      'fetchTableList',
      'openTable',
      'editPeopleNumber',
      'fetchPeopleInfo',
      'pay',
      'retreatTable',
      'editTable',
    ]),
    ...mapActions('user', [
      'userLogout',
    ]),
    changeModal(event) {
      this.modalType = event.currentTarget.innerText;
      this.SHOW_MODAL();
    },
    closeAction(index) {
      this.action_list.splice(index, 1);
      sessionStorage.setItem('action_list', JSON.stringify(this.action_list));
    },
    changePayMode(e) {
      this.pay_mode = e.currentTarget.getAttribute('data-mode');
      this.step = 3;
    },
    async payMoney() {
      this.CHANGE_SPIN(true);
      this.step = await this.pay([this.params_pay, this.$Message, this.$Spin]);
    },
    toPrintPage() {
      this.$refs.iframe2.src = `/restaurant/Print/Receipt?ro_number=${this.c_table_number}&detail=${this.qingdan}`;
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
    const that = this;
    if (window.Timer !== 0) {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        that.$refs.iframe.src = '/Restaurant/Print/Kit';
      }, window.Timer * 60000);
    }
    WebSocket((event) => {
      const data = JSON.parse(event.data);
      switch (data.code) {
        case 1: this.$Message.info(data.msg);
          this.action_list.push(data.msg);
          sessionStorage.setItem('action_list', JSON.stringify(this.action_list));
          // this.$refs.audio.src = `//112.109.215.18:8101/test/restaurant/music/1_${data.tablename}_服务.mp3`;
          this.$refs.audio.src = `//cdn.dreamhiway.com/v16/restaurant/music/1_${data.tablename}_服务.mp3`;
          this.$refs.audio.play();
          break;
        case 2: this.$Message.info(data.msg);
          this.action_list.push(data.msg);
          sessionStorage.setItem('action_list', JSON.stringify(this.action_list));
          // this.$refs.audio.src = `//112.109.215.18:8101/test/restaurant/music/1_${data.tablename}_买单.mp3`;
          this.$refs.audio.src = `//cdn.dreamhiway.com/v16/restaurant/music/1_${data.tablename}_买单.mp3`;
          this.$refs.audio.play();
          break;
        case 3:
          if (window.Timer === 0) {
            this.$refs.iframe.src = '/Restaurant/Print/Kit';
          }
          break;
        case 4: this.$Message.success({ content: data.msg, onClose() { that.isRefresh = true; } }); break;
        case 5: this.$Message.success({ content: data.msg, onClose() { that.isRefresh = true; } }); break;
        case 6: this.$Message.success({ content: data.msg }); this.is_reload = true; break;
        case 7: this.$Message.success({ content: data.msg, onClose() { that.isRefresh = true; } }); break;
        case 9: this.$Message.success({ content: data.msg, onClose() { that.isRefresh = true; } }); break;
        case 10: this.$Message.success({ content: data.msg, onClose() { that.isRefresh = true; } }); break;
        default: break;
      }
      console.log(data);
    });
  },
};

</script>

<style>
.cashier {
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


.table__number {
  text-align: center;
  font-weight: normal;
  font-size: calc(18 / 16 * 1em);
}

.started__time {
  color: #999999;
  font-size: calc(14 / 16 * 1em);
}

.order__detail {
  margin: calc(18 / 14 * 1em) 0;
  font-size: calc(14 / 16 * 1em);
}

.order__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(40 / 14 * 1em);
  padding: 0 calc(15 / 14 * 1em);
  border-top: 1px solid #e8e8e8;
  background-color: #e8e9ee;
  font-weight: bold;
}

.order__detail>dd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(55 / 14 * 1em);
  padding: 0 calc(15 / 14 * 1em);
}

.order__money {
  margin-top: calc(18 / 30 * 1em);
  text-align: center;
  font-size: calc(30 / 16 * 1em);
  color: #ea5820;
}

.order__lt {
  text-align: center;
  font-size: calc(14 / 16 * 1em);
}

.order__pay {
  padding: calc(18 / 16 * 1em) calc(30 / 16 * 1em);
}

.pay__grid {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(110 / 14 * 1em);
  border-radius: 5px;
  background-color: #edeff1;
  font-size: calc(14 / 16 * 1em);
}

.pay__grid>.icon {
  height: calc(32 / 14 * 1em);
  width: calc(32 / 14 * 1em);
  margin-bottom: calc(10 / 14 * 1em);
}

.row {
  margin: calc(20 / 16 * 1em);
}

.pay__p {
  font-size: calc(14 / 16 * 1em);
  line-height: 2.5;
}

.pay__span {
  margin-left: 1.5em;
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
