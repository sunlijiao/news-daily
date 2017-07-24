<template>
  <div class="header" >
    <div class="model" :class="model">
      <span class="navigation" @click="showSidebar"></span>
      <h2>{{title}}<i class="icon iconfont icon-xiaoxi"></i></h2>
      <div class="menu" @click="changeModel">
      <img :src="changeModelImg" width="24" height="24">   
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    //接收从父组件传来的标题值
    props:{
      title:{
        type:String,
        default:'首页'        //标题默认值
      }
    },
    methods:{
      //显示侧边栏，向上派发事件
      showSidebar() {
        this.$emit('showSide');
      },
      changeModel() {
        this.$store.dispatch('changeModel');
      }
    },
    computed:{ 
      //返回当前模式
      model() {
        return this.$store.getters.getModel
      },
        //改变模式图片
      changeModelImg() {
        if(!this.$store.state.isNight){
          return require('./yejian.png')
        }else{
          return require('./rijian.png')
        }
      }
    }
  };
</script>


<style lang="stylus" rel="stylesheet/stylus">
   @import '../../common/stylus/mixin.styl'

  .header
    position fixed
    top 0
    left 0
    font-size 0
    width 100%
    height 60px
    z-index 5
  
    .model
      &.morning
        color rgb(51,51,51)
        background-color rgb(2,143,214)
      &.night
        color rgb(184,184,184)
        background-color rgb(85,85,85)
      & > h2
        line-height 40px
        font-size 22px
        color white
        margin-left 60px
      .icon-xiaoxi
        position absolute
        right 60px
        font-size 24px
      .menu
        position absolute
        top 7px
        right 10px 
      
      .navigation
        position absolute
        top 10px
        width 20px
        height 20px
        font-size 0
        left 14px
        padding 5px
        bg-image('navigation')
        background-size 20px 20px
        background-repeat no-repeat

</style>
