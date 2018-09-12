<template>
  <div class="exchange_containerwe">
    自定义日期组件 签到功能11
    
    <calen-dar></calen-dar>

  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { getGoodsList,themeCss} from 'src/service/getData'
import { loadMore, getImgPath } from 'src/components/common/mixin'
import { imgBaseUrl } from 'src/config/env'
import calenDar from './calendar'

export default {
  //数据
  data() {
    return {
    }
  },
  //创建完毕状态
  created() {
    this.searchValue = this.$route.query.q;
    //this.productId = this.$route.query.productId;
  },

  mounted() {
    this.initData();
  },

  //需要使用的模块
  components: {
    calenDar
  },

  //父组件的参数书
  props: [],

  //需要引用的外部js方法
  mixins: [loadMore, getImgPath],

  //计算值 这里可以实时监听某个数据的变化
  computed: {
    ...mapState([
      'userInfo'
    ]),
  },

  //方法
  methods: {
    ...mapMutations([
      'SET_LOADING'
    ]),
    async initData(){
      
      this.SET_LOADING(false);
    },
    
  },

  //监听
  watch: {
    
  }
}

</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.exchange_containerwe{
  font-size: 14px;
}


</style>
