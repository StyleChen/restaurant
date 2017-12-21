<template>
  <div class="page__bill">
    <div class="top__action">
      <form class="filter_input">
        <Button type="error" shape="circle" icon="ios-search" html-type="submit"></Button>
        <input type="text" class="filter_input_input" placeholder="请输入手机号" v-model="keyword">
      </form>
      <Button shape="circle" icon="ios-undo" @click="$router.back()"></Button>
    </div>
    <Table :columns="column" :data="data1" ></Table>
    <Page :total="totalPage" show-elevator class-name="pages" on-change="changePage"></Page>
  </div>
</template>

<script>
import apis from '@/apis';

export default {
  name: 'reserve',
  data() {
    const that = this;
    return {
      keyword: '',
      totalPage: 0,
      column: [
        {
          title: '手机号',
          key: 'rr_phone',
          align: 'center',
        },
        {
          title: '预约日期',
          key: 'date',
          align: 'center',
        },
        {
          title: '成人数量',
          key: 'rr_mealAnum',
          align: 'center',
        },
        {
          title: '儿童数量',
          key: 'rr_mealBnum',
          align: 'center',
        },
        {
          title: '状态',
          key: 'rr_state',
          align: 'center',
        },
        {
          title: '提交时间',
          key: 'rr_paytime',
          align: 'center',
        },
        {
          title: '操作',
          align: 'center',
          render(h, params) {
            return h('div', [
              h('Button', {
                props: {
                  type: 'warning',
                  // eslint-disable-next-line
                  disabled: params.row.rr_state === '已就餐' ? true : false,
                },
                on: {
                  click: () => {
                    that.$http.post(apis.ReserveEdit, { state: 1, rr_id: params.row.rr_id });
                  },
                },
              }, '确定就餐'),
            ]);
          },
        },
      ],
      data1: [],
    };
  },
  methods: {
    getList(keywords = '', pageIndexs = 1, pageSizes = 10, states = null) {
      this.$http.post(apis.ReserveList, { keyword: keywords, state: states, pageIndex: pageIndexs, pageSize: pageSizes })
        .then(res => res.json()).then((res) => {
          if (res.success) {
            this.data1 = [];
            const data = res.result.data;
            this.totalPage = res.result.total;
            data.map((item) => {
              const obj = item;
              obj.date = `${item.rr_date}  ${item.rr_time}`;
              this.data1.push(obj);
              return this.data1;
            });
          }
          return true;
        });
    },
    changePage(val) {
      this.getList(this.keyword, val);
    },
  },
  watch: {
    keyword(val) {
      this.getList(val);
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped>
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
    outline: none;
  }
  .pages {
    margin-top: 20px;
    float: right;
  }

</style>
<style>
  .ivu-page-item:hover {
    border-color: #f06f23;
  }
  .ivu-page-item-active {
    background-color: #f06f23;
    border-color: #f06f23;
  }
</style>
