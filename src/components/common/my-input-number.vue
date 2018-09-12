<template>
  <div class="my-input-number">
    <span class="input-number-btn input-number-decrease">
      <i class="iconfont icon-jian"></i>
    </span>
    <span class="input-number-btn input-number-increase">
      <i class="iconfont icon-jia"></i>
    </span>
    <div class="input-wrap">
      <input type="text" value="">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  mounted() {

  },
  props: [],
  methods: {
    // closeTip(){
    //     this.$emit('closeTip')
    // },
    // //去除滚动事件
    // slaoak(event){
    //   event.preventDefault()
    // },
    // closecont(){
    //     this.$emit('closecont')
    // },
    // cancel(){
    //     this.$emit('closecont')
    // }
  }
}

</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.my-input-number{
  width: 1.92rem;
  height: .5rem;
  position: relative;
  display: inline-block;
  border: solid .025rem #d6d6d6;
  border-radius: .05rem;
  overflow-y: hidden;
  .input-number-btn{
    position: absolute;
    top: 0;
    width: .5rem;
    height: .5rem;
    background-color: #fff;
    text-align: center;
    line-height: .48rem;
    i{
      color: #a6a6a6;
    }
  }
  .input-number-decrease{
    border-right: solid .025rem #d6d6d6;
    left: 0;
  }
  .input-number-increase{
    border-left: solid .025rem #d6d6d6;
    right: 0;
  }
  .input-wrap{
    width: 100%;
    height: 100%;
    background-color: red;
    input{
      text-align: center;
      width: 100%;
      height: 100%;
      color: #545454;
      line-height: .5rem;
    }
  }
}
</style>
