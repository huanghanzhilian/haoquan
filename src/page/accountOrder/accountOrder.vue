<template>
  <div class="exchange_container">
    <ul class="exchange_list_wrap" v-if="pageStatus" v-load-more="loaderMore">
      <li class="dopser_item" v-for="item in orderListArr">
        <div class="dopser_item_l">
          <div class="item_line">
            <div class="item_line_l">商品名称</div>
            <div class="item_line_r">2018积分</div>
          </div>
          <div class="item_line default">
            <div class="item_line_l">2016-08-21 10:11</div>
            <div class="item_line_r">已取消</div>
          </div>
        </div>
        <div class="dopser_item_r">
          <i class="iconfont icon-go icon_styles"></i>
        </div>
      </li>
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

      searchValue: '', // 搜索内容
      oldSearchValue:'',//旧值
      isInitSearchValue:true,//是否是初始化状态的搜索框

      pageStatus:false,
    }
  },
  //创建前
  beforeCreate() {

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
      this.pageStatus=true;
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
  background-color: #fff !important;
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

.exchange_list_wrap {
  .dopser_item {
    display: flex;
    align-items: center;
    font-size: .28rem;
    padding: .18rem;
    border-bottom: 0.025rem solid #f0f0f0;
    .dopser_item_l {
      flex: 1;
      padding-right: .2rem;
      .item_line{
        @include fj;
        align-items: center;
        line-height: .48rem;
        font-size: .32rem;
        color: #333333;
        &.default{
          font-size: .24rem;
          color: #999999;
        }
      }
    }
    .dopser_item_r {
      i{
        color: #B5B5B5;
      }
    }
  }
}




/*商品列表 e */


/*没有更多*/

.empty_data {
  @include sc(0.24rem, #666);
  text-align: center;
  line-height: 1rem;
}




/*没有更多end*/

</style>
