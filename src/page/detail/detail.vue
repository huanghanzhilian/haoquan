<template>
  <div class="activityDetail_container">
    <div class="activityDetail_wrap" v-if="detailsObject.name">
      <div class="activity_top">
        <div class="activity_top_wrap">
          <img :src="detailsObject.roadcastImg">
          <div class="content">
            <div class="order_name_box">
              <div class="name">{{detailsObject.name}}</div>
              <div class="order_number">
                <span class="number1"><span class="fangda">{{detailsObject.newIntegral}}</span>积分</span>
                <span class="number2">￥{{detailsObject.originalIntegral}}</span>
              </div>
            </div>
            <div class="linese">
              <div class="linese_left">
                <!-- <i class="iconfont icon-riqi"></i> -->
                数量
              </div>
              <div class="linese_right">
                <my-input-number v-model="currCount"></my-input-number>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="activity_content">
        <div class="title">商品详情</div>
        <div class="richtext">
          <div class="describe">奥利奥（Oreo）Mini原味小饼干零食 55g（新老包装随机发货） </div>
          <div class="title2">使用流程</div>
          <ol class="text_list">
            <li class="text_item">手动阀手动阀手动阀手动阀<a href="#">酷我音乐</a>反浪费口水防空炮付款<a href="#">酷我音乐</a>卡金佛奥卡福叫法叫</li>
            <li class="text_item">gsggrrh发给我日日通过认为如果温热阀手动阀卡金佛奥卡福叫法叫</li>
            <li class="text_item">手dfdsafsafafrdhryr奥卡福叫法叫</li>
          </ol>
        </div>
      </div>

      <div class="confirm_wrap">
        <span class="confirm_btn" @click="goExchange" :class="{active:detailsObject.status}">{{detailsObject.status?'马上兑换':'已兑换'}}</span>
      </div>
    </div>


    <error-control v-if="errorObj.status" :errorObj="errorObj"></error-control>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { getActivityDetail,getLayoutControl } from 'src/service/getData'

import myInputNumber from 'src/components/common/my-input-number'
import errorControl from 'src/components/common/errorControl'


export default {
  //数据
  data() {
    return {
      //异常处理数据
      errorObj: {
        status: false,
        text: '出现异常',
        type: 1,
      },

      currCount:2,
      detailsObject: {}, //商品详情信息
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
    this.$bus.$emit('execute-setcolor')
    this.initData();
  },


  //需要使用的模块
  components: {
    myInputNumber,
    errorControl
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
    },

    //确认
    async goExchange(){
      await getLayoutControl(this.id)
      .then(res=>{
        if(res.res){
          this.$router.push('/confirm');
          //this.initData()
        }
      })
    },
  },

  //监听
  watch: {

  }
}

</script>
<style lang="scss" scoped>
@import 'src/style/mixin';

.activityDetail_container {
  padding-bottom: 1.6rem;
  background-color: #f3f3f3;
}

.activityDetail_wrap {}

.loading {
  background-color: #efefef;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999999;
  width: 100%;
  height: 100%;
  img{
    @include center();
    width: 2rem;
  }
}

/* 头部图 控制区 s */
.activity_top {
  .activity_top_wrap {
    background-color: #fff;
    margin-bottom: .18rem;
    img {
      width: 100%;
      height: 7.5rem;
      display: block;
    }
    .content {
      .order_name_box {
        padding: .2rem .28rem;
        border-bottom: solid .025rem #dedede;
        color: #333333;
        .name {
          font-size: .3rem;
          line-height: .5rem;
        }
        .order_number {
          font-size: .24rem;
          line-height: .42rem;
          .number1 {
            color: #666666;
            .fangda {
              color: #F85A6A;
              font-size: .3rem;
              margin-right: .08rem;
            }
          }
          .number2 {
            color: #999999;
            text-decoration: line-through;
          }
        }
      }

      .linese {
        @include fj;
        align-items: center;
        padding: .2rem .28rem;
        .linese_left {
          color: #666666;
        }
        .linese_right {
          
        }
      }
    }
  }
}
/* 头部图 控制区 e */


/* 富文本 s */
.activity_content {
  background-color: #fff;
  margin-bottom: .18rem;
  color: #10202f;
  .title {
    font-size: .3rem;
    padding: .28rem;
    border-bottom: solid .025rem #dedede;
    color: #666666;
  }
  .richtext{
    padding: .28rem;
  }
  .describe {
    margin-bottom: .18rem;
  }
  .text_list {
    line-height: .44rem;
    list-style-type: decimal;
    padding-left: .31rem;
    &.text_listOne {
      color: #6e767c;
    }
    a {
      color: #5871e1;
      text-decoration: underline;
    }
  }
}
/* 富文本 e */

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
