<script>
import { mapMutations, mapState } from 'vuex'
import bannerControl from 'src/components/common/indexLayout/bannerControl'
import threeControl from 'src/components/common/indexLayout/threeControl'
import threeThreeControl from 'src/components/common/indexLayout/threeThreeControl'
import indexlistControl from 'src/components/common/indexLayout/indexlistControl'
import navtopControl from 'src/components/common/indexLayout/navtopControl'
import iconsControl from 'src/components/common/indexLayout/iconsControl'

import { getLayoutControl,getThemecss } from 'src/service/getData'

import errorControl from 'src/components/common/errorControl'



export default {
  render() {
    var layerItems = this.layerItems;
    var items = [];
    for (var i = 0; i < layerItems.length; i++) {
      if(layerItems[i].itemType=='banner'){
        items.push(<banner-control key={i+1} roadcastArray={layerItems[i].results}></banner-control>);
      }else if(layerItems[i].itemType=='navtop'){
        items.push(<navtop-control></navtop-control>);
      }else if(layerItems[i].itemType=='threeTwo'){
        items.push(<three-control threeObject={layerItems[i].results}></three-control>);
      }else if(layerItems[i].itemType=='threeThree'){
        items.push(<three-three-control threeObject={layerItems[i].results}></three-three-control>);
      }else if(layerItems[i].itemType=='indexlist'){
        items.push(<indexlist-control commoArray={layerItems[i].results}></indexlist-control>);
      }else if(layerItems[i].itemType=='icons'){
        items.push(<icons-control items={layerItems[i].results}></icons-control>);
      }
    }
      return (
          <div class="msite_wrap" >
              {items}
              {
                this.errorObj.status
                ?<error-control errorObj={this.errorObj}></error-control>
                :""
              }
          </div>
      );
  },
  //数据
  data() {
    return {
      layerItems:[],//布局数据
      //处理错误机制数据
      errorObj:{
        status:false,
        text:'出现异常',
        type:1,
      }
    }
  },

  //创建完毕状态
  created() {
    //this.openid = this.$route.query.openid;
    //this.productId = this.$route.query.productId;
  },

  //挂载结束状态
  mounted() {
    this.initData();
  },

  //需要使用的模块
  components: {
    bannerControl,
    threeControl,
    threeThreeControl,
    indexlistControl,
    navtopControl,
    iconsControl,
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
      this.$bus.$emit('execute-setcolor')
      //获取布局数据
      await getLayoutControl().then(res => {
        if(res.res){
          this.layerItems=res.data;
        }else{
          this.errorObj.status=true;
          this.errorObj.text=res.message;
        }
      });
      this.SET_LOADING(false);
    },
  },

  //更新完成状态
  updated() {
    this.$bus.$emit('execute-setcolor')
  },

  //监听
  watch: {

  }
}

</script>
<style lang="scss" scoped>
@import 'src/style/mixin';

.msite_container {
  flex: 1;
}
</style>
