<template>
  <div class="page__bill">
    <div class="top__action">
      <form class="filter_input" @submit.prevent="search">
        <Button type="error" shape="circle" icon="ios-search" html-type="submit"></Button>
        <input type="text" class="filter_input_input" placeholder="请输入订单号" v-model="keyword">
      </form>
      <Button shape="circle" icon="ios-undo" @click="$router.back()"></Button>
    </div>
    <Table :columns="t_head" :data="data1" ></Table>
    <Page :total="total" show-elevator class-name="page" @on-change="pageChange"></Page>
    <modal type="small" title="退款" :refund.sync="refund">
      <div style="text-align: center">
        退款金额<Input v-model="refund" style="width: 120px; margin: 0 0.5em" size="large" number></Input>元
      </div>
      <div class="btn__wrapper">
        <base-button text="取消" color="#c4c4c4" :handleClick="CLOSE_MODAL"/>
        <base-button text="确认" color="#ea5820" :handleClick="handleRefund"/>
      </div>
    </modal>
    <iframe src="" frameborder="0" ref="iframe2" style="display: none"></iframe>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'; // eslint-disable-line
import modal from '@/components/Modal';
import baseButton from '@/components/BaseButton';
import apis from '@/apis';

export default {
  components: { modal, baseButton },
  data() {
    return {
      keyword: '',
      refund: '',
      c_rowId: '',
      total: 0,
      t_head: [
        {
          title: '订单号',
          key: 'ro_number',
          align: 'center',
        },
        {
          title: '买单时间',
          key: 'ro_opentbaledate',
          align: 'center',
        },
        {
          title: '就餐人数',
          key: 'people',
          align: 'center',
        },
        {
          title: '支付方式',
          key: 'ro_paytype',
          align: 'center',
        },
        {
          title: '就餐时段',
          key: 'ro_timeinterval',
          align: 'center',
        },
        {
          title: '优惠',
          key: 'ro_discount',
          align: 'center',
        },
        {
          title: '抵用券',
          key: 'ro_disprice',
          align: 'center',
        },
        {
          title: '实收金额',
          key: 'ro_actualprice',
          align: 'center',
          // eslint-disable-next-line
          render: (h, params) => {
            return h('div', [
              params.row.actualprice ? params.row.actualprice + '元' : null, // eslint-disable-line
              h('Poptip',
                {
                  props: {
                    trigger: 'hover',
                    title: `原收${params.row.ro_actualprice}元`,
                    content: `退款${params.row.ro_refundMoney}元`,
                  },
                },
                [
                  h('span', {
                    style: {
                      display: params.row.ro_refundMoney ? 'inline-block' : 'none',
                      width: '18px',
                      height: '18px',
                      marginLeft: '0.5em',
                      borderRadius: '3px',
                      backgroundColor: '#f2b955',
                      color: 'white',
                      // visibility: params.row.ro_refundMoney ? 'visible' : 'hidden',
                    },
                  }, '退'),
                ],
              ),
            ]);
          },
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          // eslint-disable-next-line
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  size: 'small',
                },
                style: {
                  marginRight: '5px',
                },
                on: {
                  click: () => {
                    this.c_rowId = params.row.rowId;
                    this.SHOW_MODAL();
                  },
                },
              }, '退款'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                },
                on: {
                  click: () => {
                    if (params.row.ro_paytype !== '未支付') {
                      this.toPrintPage(params.row.ro_number);
                    } else {
                      this.$Message.warning('该订单未至付，无法打印');
                    }
                  },
                },
              }, '打印小票'),
            ]);
          },
        },
      ],
      data1: [],
    };
  },
  methods: {
    ...mapMutations([
      'SHOW_MODAL',
      'CLOSE_MODAL',
      'CHANGE_SPIN',
    ]),
    handleRefund() {
      if (this.refund <= this.data1.filter(row => row.rowId === this.c_rowId)[0].ro_actualprice) {
        this.$http.post(apis.refund, {
          ro_number: this.data1.filter(row => row.rowId === this.c_rowId)[0].ro_number,
          ro_refundMoney: this.refund,
        }).then(res => res.json())
          .then((res) => {
            if (res.result) {
              this.$Message.success({
                content: '退款成功',
                onClose() {
                  location.reload();
                },
              });
            }
          });
      } else {
        this.$Message.error('退款金额过多，请重新输入');
      }
    },
    pageChange(page) {
      this.$http.post(apis.order_list, {
        keyword: this.keyword,
        pageIndex: page,
        pageSize: 10,
      }).then(res => res.json())
        .then((res) => {
          this.data1 = res.result.data.map(row => Object.assign(row, { people: `${row.ro_mealAnum}成人${row.ro_mealBnum}儿童` }));
          this.total = res.result.total;
        });
    },
    search() {
      this.$http.post(apis.order_list, {
        keyword: this.keyword,
        pageIndex: 1,
        pageSize: 10,
      }).then(res => res.json())
        .then((res) => {
          this.data1 = res.result.data.map(row => Object.assign(row, { people: `${row.ro_mealAnum}成人${row.ro_mealBnum}儿童` }));
          this.total = res.result.total;
        });
    },
    toPrintPage(number) {
      this.$refs.iframe2.src = `/restaurant/Print/Receipt?ro_number=${number}`;
    },
  },
  mounted() {
    this.$http.post(apis.order_list, {
      keyword: this.keyword,
      pageIndex: 1,
      pageSize: 10,
    }).then(res => res.json())
      .then((res) => {
        this.data1 = res.result.data.map(row => Object.assign(row, { people: `${row.ro_mealAnum}成人${row.ro_mealBnum}儿童` }));
        this.total = res.result.total;
      });
  },
};
</script>


<style>
.page__bill {
  position: absolute;
  width: 100%;
  height: calc(100% - 70px);
  padding: 0 50px;
  background-color: var(--grey-bg);
  z-index: 1;
}

.top__action {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
}

.filter_input {
  position: relative;
  width: 250px;
  height: 40px;
}

.filter_input .ivu-btn {
  position: absolute;
  height: 40px;
  width: 40px;
}

.filter_input_input {
  height: 100%;
  padding-left: 45px;
  border-radius: 50px;
  border: 1px solid var(--border);
  background-color: var(--grey-bg);
}

.page {
  margin-top: 2.5em;
  text-align: right;
}

.ivu-page-item-active {
  background-color: var(--theme);
  border-color: var(--theme);
}

</style>
