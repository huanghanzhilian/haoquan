<template>
  <!-- 组件盒子 -->
  <div class="content_box">
    <div class="content_top">
      <div class="content_top_title">{{commoArray.listTitle}}</div>
      <router-link tag="span" to="goodsList" class="content_mone">更多&gt;&gt;</router-link>
    </div>
    <ul class="content_list_wrap">
      <router-link :to="{path: '/detail', query:{id:item.id}}" tag="li" class="content_list_item" v-for="item in commoArray.listData">
        <div class="item_imgBox">
          <img :src="item.roadcastImg" @error="imgError($event)" alt="">
        </div>
        <div class="item_title">
          <div class="item_name ellipsis">{{item.describe}}</div>
          <div class="item_describe"><span class="text_yellow" style="margin-right: .06rem">{{item.goldcoin}}</span>金币</div>
        </div>
        <div class="laber_wrap" v-if="item.laber">
          <div class="laber_text">{{item.laber}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
//引入存储
//import { setStore, getStore } from '@/config/mUtils'
import { indexOrderList } from 'src/service/getData'

export default {
  //数据
  data() {
    return {
    }
  },
  //需要使用的模块
  components: {

  },

  //父组件的参数书
  props: ['commoArray'],

  //需要引用的外部js方法
  mixins: [],

  //计算值 这里可以实时监听某个数据的变化
  computed: {

  },

  //方法
  methods: {
    async initData() {
      //获取数据
      await indexOrderList().then(res => {
        this.commoArray = res.data;
      })
    },
  },

  //监听
  watch: {

  },
  //创建完毕状态
  created() {
    //this.openid = this.$route.query.openid;
    //this.productId = this.$route.query.productId;
  },

  //挂载结束状态
  mounted() {
    //this.initData();
  },


}

</script>
<style lang="scss" scoped>
@import 'src/style/mixin';

/*商品列表 s */

.content_box {
  margin-bottom: .10rem;
  .content_top {
    line-height: .64rem;
    height: .64rem;
    position: relative;
    .content_top_title {
      @include center();
      font-size: .3rem;
      color: #333333;
      &:before {
        content: "";
        width: .6rem;
        height: .025rem;
        background-color: #999999;
        @include ct();
        left: -.68rem;
      }
      &:after {
        content: "";
        width: .6rem;
        height: .025rem;
        background-color: #999999;
        @include ct();
        right: -.68rem;
      }
    }
    .content_mone {
      @include ct();
      right: .22rem;
      font-size: .24rem;
      color: #999999;
    }
  }

  .content_list_wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    .laber_wrap{
      width: 1.65rem;
      height: 1.65rem;
      background-color: #ec4436;
      text-align: center;
      position: absolute;
      top: -.825rem;
      left: -.825rem;
      transform:rotate(-45deg);
      .laber_text{
        width: 100%;
        position: absolute;
        bottom: 0;
        line-height: .5rem;
        height: .5rem;
        font-size: .26rem;
        color: #fff;
      }
    }
    .content_list_item {
      width: 3.69rem;
      list-style: none;
      background-color: #fff;
      margin-right: .12rem;
      margin-bottom: .12rem;
      position: relative;
      overflow: hidden;
      &:nth-child(2n) {
        margin-right: 0;
      }

      .item_title {
        line-height: .48rem;
        padding:.1rem .18rem;
        .item_name {
          font-size: .3rem;
          color: #333333;
        }
        .item_describe {
          font-size: .29rem;
          color: #666666;
          .text_yellow{
            color:#F85A6A;
          }
        }
      }

      .item_imgBox {
        padding:.84rem .35rem;
        img {
          width: 100%;
          border-radius: .08rem;
          display: block;
        }
      }
    }
  }
}




/*商品列表 e */

</style>
