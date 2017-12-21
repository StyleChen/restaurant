<template>
  <div class="app">
    <div class="login-whole">
      <div class="theme">
        <div class="logo">吉米呷呷生态养生荟管理后台</div>
        <div id="error">{{error_message}}</div>
      </div>

      <form class="tab-conter" @submit.prevent="onSubmits" v-bind:class="[current]">
        <p class="home" @click="change('home')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#wode"></use>
          </svg>
          <input name="ra_username" placeholder="请输入您的账号" id="ra_username" class="name" data-valid="true" required v-model="name">
        </p>
        <p class="news" @click="change('news')">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#lock"></use>
          </svg>
          <input name="password" placeholder="请输入密码" type="password" id="password" data-valid="true" required v-model="pwd">
        </p>
        <div style="text-align: center;padding: 20px 0px 35px 0px;">
          <button type="submit" class="btn" id="btn" style="font-size:16px;">登录</button>
        </div>
      </form>
    </div>
    <footer class="footer"><small>创企科技有限公司 版权所有 <br/>
      © 2015-2016 dreamhiway.com, All Rights Reserved 闽ICP备15011711号</small></footer>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      name: '',
      pwd: '',
      current: 'home',
    };
  },

  computed: {
    ...mapState('user', [
      'error_message',
    ]),
  },

  created() {
    console.log('hhhhh');
  },

  methods: {
    ...mapActions('user', [
      'userLogin',
    ]),
    change(cur) {
      this.current = cur;
    },
    onSubmits() {
      // 判断账号密码的
      this.userLogin({
        ra_username: this.name,
        password: this.pwd,
      });
    },
  },
};
</script>

<style>
/*输入框选中样式*/

.tab-conter.home > p.home,
.tab-conter.news > p.news {
  background: #e8e9ee url(../assets/img/red.png) no-repeat !important;
}

/*输入框选中样式结束*/
.app {
  position: relative;
  height: 100%;
  background: url(../assets/img/bg.png) no-repeat;
}

.tab-conter > p {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.login-whole {
  position: absolute;
  top: 21%;
  left: 50%;
  width: 540px;
  background: #ffffff;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 5px 0 rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 5px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 5px 0 rgba(0, 0, 0, 0.2);
  transform: translateX(-50%);
}

.login-whole .theme {
  font-size: 30px;
  color: #333;
  position: relative;
}

.login-whole .theme .logo {
  background-position: 60px 33px;
  text-align: center;
  width: 100%;
  line-height: 120px;
}

.login-whole form p {
  padding: 15px 15px;
  margin: 0px;
}

.login-whole form p {
  text-align: center;
}

.login-whole form .reg {
  color: red;
  text-align: left;
  margin-left: 80px;
  font-size: 14px;
}

.login-whole form .verification {
  padding: 15px 52px;
  margin: 0px;
}

.login-whole form .verification input {
  width: 265px;
  text-align: left;
  margin-left: 10px;
}

.login-whole form .verification span {
  width: 125px;
  height: 50px;
  display: block;
  float: right;
}

.login-whole p input {
  width: 80%;
  height: 50px;
  padding-left: 15px;
  font-size: 14px;
  color: #151515;
  border: 1px solid #ddd;
  outline: none;
}

.login-whole p button {
  width: 130px;
  height: 45px;
  border: none;
  background: #d7000f;
  color: white;
  border-radius: 5px;
  margin-bottom: 15px;
}

.login-whole p a {
  font-size: 12px;
  line-height: 70px;
  margin-left: 10px;
}

#error {
  font-size: 16px;
  color: red;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  font-weight: 600;
}

.btn {
  min-width: calc(140 / 14 * 1em);
  height: calc(45 / 14 * 1em);
  padding: 0 calc(10 / 14 * 1em);
  border: 1px solid #ea5820;
  border-radius: 3px;
  background-color: #ea5820;
  color: white;
}

.icon {
   width: calc(24 / 16 * 1rem);
   height: calc(24 / 16 * 1rem);
   vertical-align: -0.15em;
   fill: #bbb;
   overflow: hidden;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: calc(80 / 16 * 1em);
  background-color: #f0f0f0;
}
</style>
