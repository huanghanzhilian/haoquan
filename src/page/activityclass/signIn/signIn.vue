<template>
  <div class="signIn_containerwe">
    <div class="signIn_wrap">
      <calen-dar ref="calendar" :highlightList="highlightList" @closeTip="switchCalendar"></calen-dar>
      <div class="buttom_layer">
        <div class="signin_btn" @click="signIn">签到</div>
        <div class="tpltext">签到共获得966积分</div>
        <div class="describe">
          <div class="describeitem describe_l">累积签到：<span class="highlight">45天</span></div>
          <div class="describeitem describe_r">本轮已连续签到：<span class="highlight">4天</span></div>
        </div>
      </div>
      <div class="rule_layer">
        <div class="rule_wrap">
          <div class="rule_title">规则说明</div>
          <ol class="rule_list">
            <li class="rule_item">十分反感的个人对个人的</li>
            <li class="rule_item">十分反感的个人对个人的</li>
            <li class="rule_item">十分反感的个人对个人的</li>
            <li class="rule_item">十分反感的个人对个人的</li>
            <li class="rule_item">十分反感的个人对个人的</li>
          </ol>
        </div>
      </div>
    </div>
    <activity-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></activity-tip>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { getGoodsList,themeCss} from 'src/service/getData'
import { loadMore, getImgPath } from 'src/components/common/mixin'
import { imgBaseUrl } from 'src/config/env'
import calenDar from './calendar'
import activityTip from './components/activityTip'


export default {
  //数据
  data() {
    return {
      highlightList: ['20180909'],
      datatext:9,

      showAlert: false, //显示提示组件
      alertText: '1', //提示的内容
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
    calenDar,
    activityTip
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
    async initData(){
      
      this.SET_LOADING(false);
    },
    switchCalendar(obj){
      if(obj=='left'){
        console.log('上个月')
        this.highlightList=['20180'+--this.datatext+'15']
        setTimeout(()=>{
          this.$refs.calendar.prevMonth();
        },200)
      }else if(obj=='right'){
        console.log('下个月')
        this.highlightList=['20180'+(++this.datatext)+'12']
        setTimeout(()=>{
          this.$refs.calendar.nextMonth();
        },200)
      }
    },
    closeTip(){
      this.showAlert = false;
    },
    signIn(){
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
.signIn_containerwe{
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: fixed;
}

.signIn_wrap{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}

.buttom_layer{
  padding:.66rem .3rem .46rem;
  color:#666666;
  .signin_btn{
    width: 1.92rem;
    height: .7rem;
    line-height: .7rem;
    text-align: center;
    background-color: #FAA71B;
    border-radius: .35rem;
    margin:0 auto;
    color:#fff;
  }
  .tpltext{
    text-align: center;
    line-height: .64rem;
    margin-bottom:.3rem;
  }
  .describe{
    line-height: .52rem;
    @include fj;
    align-items: center;
    .describeitem{
      .highlight{
        color:#FAA71B;
      }
    }
    .describe_l{

    }
    .describe_r{

    }
  }
}

.rule_layer{
  padding:.3rem .44rem;
  .rule_wrap{
    border-radius: .08rem;
    border: solid .025rem #dedede;
    padding: .3rem;
    position: relative;
  }
  .rule_title{
    @include cl();
    background-color: #fff;
    color:#333333;
    line-height: .46rem;
    padding: 0 .35rem;
    top: -.23rem;
  }
  .rule_list{
    padding-left: .2rem;
    .rule_item{
      font-size: .26rem;
      line-height: .42rem;
      color:#ccc;
    }
  }
}
</style>
