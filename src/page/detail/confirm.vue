<template>
  <div class="confirm_container">
    <div class="confirm_container_main">
      <div class="content_wrap">
        <ul class="list_item_wrap">
          <li class="list_item">
            <div class="item_left">沃尔玛超市代金券</div>
            <div class="item_right">x2</div>
          </li>
          <li class="list_item">
            <div class="item_left"></div>
            <div class="item_right" v-if="purchaseType==1">10000积分</div>
            <div class="item_right" v-if="purchaseType==2">¥196.00</div>
            <div class="item_right" v-if="purchaseType==3">10000积分+¥196.00</div>
          </li>
        </ul>

        <!-- 积分 -->
        <ul class="list_item_wrap" v-if="purchaseType==1">
          <li class="list_item">
            <div class="item_left">使用积分</div>
            <div class="item_right active">10000积分</div>
          </li>
        </ul>
        <!-- 积分 -->
        <!-- 现金 -->
        <ul class="list_item_wrap" v-if="purchaseType==2">
          <li class="list_item" @click="toggleDialogue">
            <div class="item_left">使用优惠券</div>
            <div class="item_right">
              <div class="icon_wrap">
                <span class="text_dep">{{ticket.title}}</span>
                <i class="iconfont icon-go icon_styles"></i>
              </div>
            </div>
          </li>
          <li class="list_item">
            <div class="item_left">积分抵扣
              <span class="text_dep">共1000积分，可抵扣10元</span>
            </div>
            <div class="item_right">
              <mt-switch v-model="values"></mt-switch>
            </div>
          </li>
          <li class="list_item list_item_default" v-if="values">
            <div class="default">
              使用<span class="highlight">1960000</span>积分，抵扣196元
            </div>
          </li>
          <li class="list_item">
            <div class="item_left">还需支付</div>
            <div class="item_right active">¥196.00</div>
          </li>
          <li class="list_item" @click="selectpayList">
            <div class="item_left">支付方式</div>
            <div class="item_right active">
              <div class="img_wrap">
                <img :src="ticketwe.img" alt="">
              </div>
            </div>
          </li>
        </ul>
        <!-- 现金 -->

        <!-- 现金+积分 -->
        <ul class="list_item_wrap" v-if="purchaseType==3">
          <li class="list_item">
            <div class="item_left">使用积分</div>
            <div class="item_right active">
              <div class="icon_wrap">10000积分</div>
            </div>
          </li>
          <li class="list_item" @click="toggleDialogue">
            <div class="item_left">使用优惠券</div>
            <div class="item_right">
              <div class="icon_wrap">
                <span class="text_dep">{{ticket.title}}</span>
                <i class="iconfont icon-go icon_styles"></i>
              </div>
            </div>
          </li>
          <li class="list_item">
            <div class="item_left">还需支付</div>
            <div class="item_right active">¥196.00</div>
          </li>
          <li class="list_item" @click="selectpayList">
            <div class="item_left">支付方式</div>
            <div class="item_right active">
              <div class="img_wrap">
                <img :src="ticketwe.img" alt="">
              </div>
            </div>
          </li>
        </ul>
        <!-- 现金+积分 -->

      </div>
      <div class="confirm_wrap">
        <span class="confirm_btn active" @click="goExchange">确认</span>
      </div>
    </div>
    <ticket-list-picker ref="ticket_picker" title="选择优惠券" v-model="ticket" :options="tickets"></ticket-list-picker>
    <error-control v-if="errorObj.status" :errorObj="errorObj"></error-control>

    <pay-list-picker ref="ticket_pickerss" title="选择支付方式" v-model="ticketwe" :options="ticketswe"></pay-list-picker>
    <error-control v-if="errorObj.status" :errorObj="errorObj"></error-control>

  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { Toast, Switch } from 'mint-ui';

import { getActivityDetail, getLayoutControl } from 'src/service/getData'
import myInputNumber from 'src/components/common/my-input-number'
import errorControl from 'src/components/common/errorControl'
import ticketListPicker from './picker/ticketListPicker'
import payListPicker from './picker/payListPicker'

export default {
  //数据
  data() {
    return {
      img: require('src/images/pay-icons/gonghang.png'),
      //异常处理数据
      errorObj: {
        status: false,
        text: '出现异常',
        type: 1,
      },
      detailsObject: {}, //商品详情信息
      values: false,
      //选择优惠券
      ticket: { a: 1, title: '满100减5元券' },
      tickets: [{
          a: 1,
          title: '满100减5元券',
          time:'有效期至 2018-11-12 00:00'
        }, {
          a: 2,
          title: '满1000减500元券',
          time:'有效期至 2018-11-13 00:00'
        },
        {
          a: 3,
          title: '满10000减5000元券',
          time:'有效期至 2018-11-14 00:00'
        },
        {
          a: 0,
          title: '不使用优惠券',
          time:''
        }
      ],
      //选择支付方式
      ticketwe:{},
      ticketswe: [{
          a: 1,
          title: '微信支付',
          img:require('src/images/pay-icons/weixin.png')
        }, {
          a: 2,
          title: '工行支付',
          img:require('src/images/pay-icons/gonghang.png')
        }
      ],

      //购买类型
      purchaseType:2,
    }
  },
  //创建前
  beforeCreate() {

  },
  //创建完毕状态
  created() {
    this.id = this.$route.query.id;
    //this.productId = this.$route.query.productId;
  },

  //挂载前状态
  beforeMount() {

  },
  //挂载结束状态
  mounted() {
    this.initData();
  },


  //需要使用的模块
  components: {
    myInputNumber,
    errorControl,
    ticketListPicker,
    payListPicker
  },

  //父组件的参数书
  props: [],

  //需要引用的外部js方法
  mixins: [],

  //计算值 这里可以实时监听某个数据的变化
  computed: {

  },

  //方法
  methods: {
    ...mapMutations([
      'SET_LOADING'
    ]),
    async initData() {
      //获取数据
      let res = await getActivityDetail(this.id);
      if (res.res) {
        this.detailsObject = res.data;
        this.SET_LOADING(false);
      } else {
        this.errorObj.status = true;
        this.errorObj.text = res.message.mes;
        this.SET_LOADING(false);
      }
      this.ticketwe=this.ticketswe[0]
    },

    //确认
    async goExchange() {
      await getLayoutControl(this.id)
        .then(res => {
          if (res.res) {
            this.$router.push('/result');
          }
        })
    },
    //选择优惠券
    toggleDialogue() {
      this.$refs.ticket_picker.toggleDialogue();
    },

    //选择支付方式
    selectpayList() {
      this.$refs.ticket_pickerss.toggleDialogue();
    },

  },

  //监听
  watch: {

  }
}

</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.confirm_container {
  padding-bottom: 1.6rem;
}




/* 内容区域-列表 s */

.list_item_wrap {
  padding: .05rem .28rem;
  background-color: #fff;
  color: #333333;
  list-style: none;
  margin-bottom: .22rem;
  .list_item {
    height: 1rem;
    @include fj;
    align-items: center;
    border-bottom: solid .025rem #E0E0E0;
    &.list_item_default{
      display: block;
      .default{
        text-align: center;
        line-height: 1rem;
        color: #666666;
        font-size: .3rem;
        .highlight{
          display: inline-block;
          border: solid .025rem #E0E0E0;
          height: .56rem;
          line-height: .56rem;
          border-radius: .1rem;
          padding: 0 0.2rem;
          margin:0 .1rem;
          color: #F85A6A;
        }
      }
    }
    &:last-child {
      border-bottom: none;
    }
    .item_left {
      font-size: .32rem;
      .text_dep {
        margin-left: .2rem;
        font-size: .28rem;
        color: #999999;
      }
    }
    .item_right {
      font-size: .3rem;
      &.active {
        color: #F85A6A;
      }
      .icon_wrap {
        font-size: .28rem;
        .text_dep {
          color: #555555;
        }
        .icon_styles {
          color: #999999;
        }
      }
      .img_wrap {
        height: .6rem;
        img {
          width: auto;
          height: .6rem;
        }
      }
    }
  }
}




/* 内容区域-列表 e */


/* 底部按钮 s */

.confirm_wrap {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: #fff;
  padding: .15rem;
  text-align: center;
  box-shadow: 0 -0.02667rem 0.05333rem rgba(0, 0, 0, .1);
}

.confirm_btn {
  display: inline-block;
  width: 6.9rem;
  height: .88rem;
  line-height: .88rem;
  color: #fff;
  border-radius: .44rem;
  background-color: #ccc;
  &.active {
    background-color: #faa814;
  }
}




/* 底部按钮 e */

</style>