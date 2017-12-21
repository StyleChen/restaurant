<template>
  <header class="header">
    <img src="../assets/img/logo.png" alt="">
    {{type === 2 ? '吉米呷呷生态养生荟服务员端' : '吉米呷呷生态养生荟收银端'}}
    <div class="user-area">
      <router-link class="bill" to="/cashier/reserve" v-if="type === 3">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fapiaogenzongicon"></use>
        </svg>预订
      </router-link>
      <router-link class="bill" to="/cashier/bill" v-if="type === 3">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-maidan"></use>
        </svg>已买单
      </router-link>
      <div class="tixing" v-if="type === 3">
        <svg class="icon" aria-hidden="true" @click="onClick">
          <use xlink:href="#icon-tixing"></use>
        </svg>
        <div class="num">{{num}}</div>
      </div>
      {{username}}<div class="logout" @click="logout">退出</div></div>
  </header>
</template>

<script>
export default {
  props: ['username', 'type', 'logout', 'num', 'onClick'],
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(70 / 24 * 1em);
  background-color: #f06f23;
  color: white;
  font-size: calc(24 / 16 * 1em);
}

.header > img {
  margin-right: calc(19 / 24 * 1em);
  vertical-align: middle;
}

.user-area {
  display: flex;
  flex: auto;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  margin-right: calc(47 / 12 * 1em);
  font-size: calc(12 / 24 * 1em);
}

.logout {
  width: 34px;
  height: 20px;
  margin-left: calc(15 / 12 * 1em);
  opacity: 0.4;
  border-radius: 5px;
  color: #ea5820;
  text-align: center;
  background-color: #ffffff;
}

.logout:hover {
  cursor: pointer;
  opacity: 1;
}

.icon {
  width: calc(30 / 12 * 1em);
  height: calc(30 / 12 * 1em);
  margin-right: calc(10 / 12 * 1em);
  fill: white;
}

.tixing {
  position: relative;
}

.tixing > .num {
  position: absolute;
  top: 0;
  right: 5px;
  width: calc(18 / 12 * 1em);
  height: calc(18 / 12 * 1em);
  border-radius: 50%;
  text-align: center;
  background: red;
}

.bill {
  display: flex;
  align-items: center;
  margin-right: 1em;
  height: inherit;
  width: 100px;
  justify-content: center;
}

.bill > svg {
  width: 25px;
  height: 25px;
}

.router-link-active {
  background: #ec6413
}
</style>
