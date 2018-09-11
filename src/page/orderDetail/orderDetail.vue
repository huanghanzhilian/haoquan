<template>
  <div class="orderDetail_container">
    <div class="order_topbox">
      <span class="order_topleft">{{detailsObject.orderStatus?'交易成功':'已进行转让折现'}}</span>
      <!-- <span class="order_topRight">查看卡密</span> -->
    </div>
    <div class="orderDetail_content">
      <div class="dopser_item">
        <div class="dopser_item_l">
          <img :src="detailsObject.roadcastImg">
        </div>
        <div class="dopser_item_r">
          <div class="dopser_item_r_l">
            <p class="item_title">{{detailsObject.describe}}</p>
            <p class="item_time">仅剩{{detailsObject.goldcoin}}天（有效期至：{{detailsObject.newTime}}）</p>
          </div>
          <div class="dopser_item_r_r">
          </div>
        </div>
      </div>
      <div class="orderDetail_describe">
        <div class="inner_line">
          <span class="title">支付金额：</span>
          <div class="content">{{detailsObject.goldcoin}}积分</div>
        </div>
        <div class="inner_line">
          <span class="title">订单编号：</span>
          <div class="content">{{detailsObject.number}}</div>
        </div>
        <div class="inner_line">
          <span class="title">下单时间：</span>
          <div class="content">{{detailsObject.newTime}}</div>
        </div>
      </div>
    </div>
    <div class="layout_buttom">
      <router-link tag="div" :to="{path:'/putForward',query:{id:detailsObject.id}}" class="btn">转让折现</router-link>
      <div class="btn" @click="goExchange">立即使用</div>

      <router-link tag="div" :to="{path:'/putStatus',query:{id:detailsObject.id}}" class="btn">转让详情</router-link>
    </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" :alertType="alertType" @closecont="closecont" @closeTip="closeTip" :alertTitle="alertTitle" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { getOrderDetail,getLayoutControl } from 'src/service/getData'
import alertTip from '../../components/common/alertTip'


export default {
  //数据
  data() {
    return {
      showAlert: false, //显示提示组件
      alertText: null, //提示的内容
      alertTitle: null, //提示title
      alertType:1,//弹窗类型

      //初始化获取数据
      detailsObject:{},
    }
  },
  //创建前
  beforeCreate() {

  },
  //创建完毕状态
  created() {
    this.id = this.$route.query.id;
    //this.openid = this.$route.query.openid;
    //this.productId = this.$route.query.productId;
  },

  //挂载前状态
  beforeMount() {

  },
  //挂载结束状态
  mounted() {
    this.initData();
  },
  //更新前状态
  beforeUpdate() {

  },
  //更新完成状态
  updated() {

  },
  //销毁前状态
  beforeDestroy() {

  },
  //销毁完成状态
  destroyed() {

  },
  //需要使用的模块
  components: {
    alertTip
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
    async initData() {
      //获取数据
      let res = await getOrderDetail(this.id);
      this.detailsObject = res.data
    },
    //确认
    async closeTip(){
        await getLayoutControl(this.id)
          .then(res=>{
            if(res.code==0){
              this.showAlert = false;
              alert('卡密页面')
            }
          })
    },
    closecont(){
        this.showAlert = false;
    },
    goExchange(){
      this.alertText = '点击“立即查看”后将不能进行转让折现操作，确认立即查看卡密？';
      this.alertType='2';
      this.showAlert = true;
    }
  },

  //监听
  watch: {

  }
}

</script>
<style lang="scss" scoped>
@import 'src/style/mixin';


.order_topbox {
  background-color: #fff;
  @include fj;
  padding: .2rem;
  margin-bottom: .15rem;
  .order_topRight {
    display: inline-block;
    padding: .02rem .08rem;
    border: solid 0.02rem #2dc6f0;
    background-color: #fff;
    border-radius: 4px;
    color: #2dc6f0;
  }
}

.orderDetail_content {
  background-color: #fff;
  padding: .2rem;
  .dopser_item {
    display: flex;
    font-size: .28rem;
    padding: .18rem;
    border-bottom: 0.025rem solid #f0f0f0;


    .dopser_item_l {
      /*position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;*/
      margin-right: .16rem;
      img {
        width: 2.6rem;
        height: 1.26rem;
        display: block;
      }
    }



    .dopser_item_r {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      /*padding: .3rem 0 .3rem 0;*/
      .dopser_item_r_r {
        width: 1rem;
      }
      .excha_go {
        display: inline-block;
        padding: .02rem .08rem;
        border: none;
        border-radius: 4px;
        background-color: #d5d5d5;
        color: #fff;
        &.on {
          display: inline-block;
          padding: .02rem .08rem;
          border: solid 0.02rem #446ee2;
          background-color: #fff;
          border-radius: 4px;
          color: #446ee2;
        }
      }
      .item_title {
        font-size: .32rem;
        margin-bottom: .1rem;
      }
      .item_time {
        color: #b2a7a2;
      }
    }
  }

  .orderDetail_describe {
    padding-top: .1rem;
    color: #697074;
    .inner_line {
      display: flex;
      padding: .08rem 0;
      .content {
        flex: 1;
      }
      .title {
        min-width: 1.42rem;
        text-align: right;
      }
    }
  }
}


.layout_buttom {
  background-color: #efefef;
  padding-top: .6rem;
  .btn {
    border: solid 0.025rem #999;
    margin: auto;
    width: 4rem;
    margin-bottom: .3rem;
    text-align: center;
    padding: .1rem;
    border-radius: .1rem;
    background-color: #fff;
  }
}

</style>
