<template>
  <div class="exchange_container">
    <!-- <header class="header">
      <form class="search_form">
        <div class="form_box">
          <i class="icon-sousuo iconfont"></i>
          <input type="search" name="search" placeholder="搜索名称" v-model="searchValue" class="search_input" @input="checkInput">
        </div>
        <input type="submit" value="搜索" name="submit" class="search_submit" @click.prevent="searchTarget('')">
      </form>
    </header> -->

    <ul class="content_list_wrap" v-load-more="loaderMore">
      <router-link :to="{path: '/detail', query:{id:item.id}}" tag="li" class="content_list_item" v-for="item in orderListArr">
        <div class="item_imgBox">
          <img :src="item.roadcastImg" @error="imgError($event)" alt="">
        </div>
        <div class="item_title">
          <div class="item_name ellipsis">{{item.describe}}</div>
          <div class="item_describe"><span class="text_yellow" style="margin-right: .06rem">{{item.goldcoin}}</span>金币</div>
        </div>
        <div class="laber_wrap" v-if="item.laber">
          <div class="laber_text" v-if="typeof(item.laber)=='string'">{{item.laber}}</div>
        </div>
      </router-link>
    </ul>

    <p v-if="orderLoading" class="empty_data">加载中...</p>
    <p v-if="touchend" class="empty_data">没有更多了</p>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { getProductList } from 'src/service/getData'
import { loadMore, getImgPath } from 'src/components/common/mixin'

export default {
  //数据
  data() {
    return {
      page: 1, //页数
      querySize: 8, //请求条数
      orderListArr: [], // 店铺列表数据
      touchend: false, //没有更多数据
      nothing: false, //无数据
      orderLoading: false, //显示加载动画
      preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
      /*搜索*/
      searchValue: '', // 搜索内容
      oldSearchValue:'',//旧值
      isInitSearchValue:true,//是否是初始化状态的搜索框

    }
  },

  //创建完毕状态
  created() {
    this.searchValue = this.$route.query.q;
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

  },
  //父组件的参数书
  props: [],
  //需要引用的外部js方法
  mixins: [loadMore, getImgPath],
  //计算值 这里可以实时监听某个数据的变化
  computed: {

  },
  //方法
  methods: {
    ...mapMutations([
      'SET_LOADING'
    ]),
    //执行搜索
    searchTarget(historyValue) {
      // if (historyValue) {
      //   //this.searchValue = historyValue;
      // } else if (!this.searchValue) {
      //   return
      // }
      if(this.oldSearchValue==this.searchValue){
        return
      }

      if(this.searchValue){
        this.$router.push('/list?q=' + this.searchValue);
      }else{
        this.$router.push('/list');
      }
      
      this.page=1
      this.initData()
      this.oldSearchValue=this.searchValue;


    },

    //搜索结束后，删除搜索内容直到为空时清空搜索结果，并显示历史记录
    checkInput() {
      if (this.searchValue === '') {
        //this.showHistory = true; //显示历史记录
        //this.restaurantList = []; //清空搜索结果
        //this.emptyResult = false; //隐藏搜索为空提示
      }
    },

    async initData() {
      //获取数据
      let res = await getProductList(this.page, this.querySize,this.searchValue);
      this.orderListArr = [...res.data.row];
      //如果当前页等于总页数 到底了
      if (res.data.pageAmount == res.data.pageNow) {
        this.touchend = true;
      }
      //数据为空
      if (res.data.row.length == 0) {
        this.nothing = true;
      } else {
        this.nothing = false;
      }
      this.SET_LOADING(false);
    },


    //到达底部加载更多数据
    async loaderMore() {
      if (this.touchend) {
        return
      }
      //防止重复请求
      if (this.preventRepeatReuqest) {
        return
      }
      this.orderLoading = true;
      this.preventRepeatReuqest = true;

      //数据的定位加20位
      this.page += 1;
      let res = await getProductList(this.page, this.querySize,this.searchValue);
      this.hideLoading();
      this.orderListArr = [...this.orderListArr, ...res.data.row];
      //当获取数据小于20，说明没有更多数据，不需要再次请求数据
      if (res.data.pageAmount == res.data.pageNow) {
        this.touchend = true;
        return
      }
      this.preventRepeatReuqest = false;
    },
    //开发环境与编译环境loading隐藏方式不同
    hideLoading() {
      this.orderLoading = false;
    },

  },

  //监听
  watch: {
    '$route' (to, from) {
      //console.log(to)
      // if (to.path != '/huntfor') {
      //   this.searchValue = '';
      // }
    },
  }
}

</script>
<style lang="scss" scoped>
@import 'src/style/mixin';

.exchange_container {
  /*background-color: #fff !important;*/
}

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


/*搜索 s */

.header {
  border-bottom: 0.025rem solid #f0f0f0;
}

.search_form {
  padding: .15rem;
  display: flex;
  .search_submit {
    padding: 0 .15rem;
    background-color: transparent;
  }
  .form_box {
    flex: 1;
    align-items: center;
    display: flex;
    background-color: #eee;
    padding: .1rem .2rem;
    border-radius: 8px;
    i {
      font-size: .36rem;
      margin-right: .1rem;
    }
    input {
      line-height: .36rem;
      flex: 1;
      background-color: #eee;
    }
  }
}

/*搜索 e */


/*商品列表 s */
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


/*没有更多*/

.empty_data {
  @include sc(0.24rem, #666);
  text-align: center;
  line-height: 1rem;
}




/*没有更多end*/

</style>
