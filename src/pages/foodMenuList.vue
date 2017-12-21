<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <Row type="flex">
      <Col :span="spanLeft" class="layout-menu-left">
      <Menu active-name="1" theme="dark" width="auto">
        <div class="layout-logo-left"></div>
        <MenuItem name="1">
          <Icon type="ios-navigate" :size="iconSize"></Icon>
          <span class="layout-text">全部</span>
        </MenuItem>
        <MenuItem :name="index" v-for="(food, index) in foodMenuAll" :key="index" @click="toggle(index)">
          <Icon type="ios-keypad" :size="iconSize"></Icon>
          <span class="layout-text">{{food.typeName}}</span>
        </MenuItem>
      </Menu>
      </Col>
      <Col :span="spanRight">
      <div class="layout-header">
        <Button type="text" @click="toggleClick">
          <Icon type="navicon" size="32"></Icon>
        </Button>
      </div>
      <div class="layout-content">
        <div class="layout-content-main">
          <div v-for="(food, index) in foodMenu"  :key="`food${index}`">
            <dl class="foodListWrap" v-for="item in food.productList" :key="item.rf_id">
              <dt>
                <img :src="item.rf_imgae" alt="">
                <p>{{item.rf_name}}</p>
              </dt>
              <dd>
                <Input v-model="item.num">
                  <button slot="prepend" class="countWidth" @click="() => { --item.num }" :disabled="item.num === 0"> - </button>
                  <button slot="append" class="countWidth" @click="() => { ++item.num }"> + </button>
                </Input>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  import apis from '@/apis';

  export default {
    name: 'food-menu-list',
    data() {
      return {
        spanLeft: 5,
        spanRight: 19,
        foodMenu: [],
        foodMenuAll: [],
        num: '',
      };
    },
    computed: {
      iconSize() {
        return this.spanLeft === 5 ? 14 : 24;
      },
    },
    methods: {
      toggleClick() {
        if (this.spanLeft === 5) {
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.spanLeft = 5;
          this.spanRight = 19;
        }
      },
    },
    mounted() {
      this.$http.post(apis.FoodList, { rft_show: 2 })
        .then(res => res.json())
        .then((res) => {
          if (res.success) {
            this.foodMenu = res.result;
            this.foodMenuAll = res.result;
          }
        })
        .catch(res => this.$Message.error(res.msg));
    },
  };
</script>

<style>
  .foodListWrap .ivu-input-group-append,
  .foodListWrap .ivu-input-group-prepend{
    padding: 0;
  }
</style>
<style scoped>
  .foodListWrap {
    width: 150px;
    float: left;
    margin: 5px;
  }
  img {
    width: 100%;
    height: 100px;
  }
  .foodListWrap dt {
    position: relative;
  }
  .foodListWrap dd {
    margin-top: 5px;
  }
  .foodListWrap dt p {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20px;
    line-height: 20px;
    background: rgba(0, 0, 0, 0.5);
    color: #FFFFFF;
    text-align: center;
  }
  .countWidth {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: none;
    background: transparent;
    outline: none;
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
    overflow: hidden;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #464c5b;
    min-height: calc(100vh - 2px);
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .layout-ceiling-main a{
    color: #9ba7b5;
  }
  .layout-hide-text .layout-text{
    display: none;
  }
  .ivu-col{
    transition: width .2s ease-in-out;
  }
</style>
