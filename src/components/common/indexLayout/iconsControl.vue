<template>
  <div class="icons_control">
    <ul class="icon_wrap">
      <li class="item_iocn" v-for="(item,key,index) in items">
        <i class="iconfont icon-zuanshi icon_styles"></i>
        <p class="item_text">{{item.itemText}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
//引入存储
//import { setStore, getStore } from '@/config/mUtils'

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
  props: ['items'],

  //需要引用的外部js方法
  mixins: [],

  //计算值 这里可以实时监听某个数据的变化
  computed: {

  },

  //方法
  methods: {
    async initData() {
      //获取数据
      /*await indexOrderList().then(res => {
        this.commoArray = res.data;
        console.log(this.commoArray)
      })*/
    },
  },

  //监听
  watch: {

  },
  //挂载结束状态
  mounted() {
    //this.initData();
  },
}

</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.icon_wrap{
  display: flex;
  list-style: none;
  border-bottom: solid .025rem #e7e7e7;
  .item_iocn{
    flex: 1;
    padding: .2rem 0;
    text-align: center;
    .icon_styles{
      font-size: .35rem;
    }
  }
}

</style>
