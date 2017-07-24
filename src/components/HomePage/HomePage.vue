<template>
  <div class="homePage">
    <v-header @showSide="show"></v-header>
    <sidebar :sidebarShow="sidebarShow" @hideSidebar="hide" ref="sidebar"></sidebar>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore">
      <swipe></swipe>
      <h2>今日新闻</h2>
      <homepageDetail ref="homePageDetail"></homepageDetail>
      <div slot="top"  class="mint-loadmore-top">
        <span>下拉刷新</span>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span>上拉加载</span>
      </div>
    </mt-loadmore>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '../Header/Header.vue'
  import sidebar from '../Sidebar/Sidebar.vue'
  import swipe from  '../Swipe/Swipe.vue'
  import homepageDetail from '../HomePageDetail/HomePageDetail.vue'
  import axios from 'axios'

  export default {
    data() {
      return {
        sidebarShow:false  //侧边栏初始状态
      }
    },
    methods:{
      
      //下拉刷新，触发向子组件派发方法
      loadTop() {
        this.$refs.homePageDetail.$emit('refresh')
        this.$refs.loadmore.onTopLoaded()
      },
      //上拉加载，触发向子组件派发方法
      loadBottom() {
        this.$refs.homePageDetail.$emit('loadMore')
        this.$refs.loadmore.onBottomLoaded()
      },
      //显示侧边栏，在其显示时访问他的获取数据方法，从而使better-scroll能够计算出中间主题列表高度
      show() {
        this.sidebarShow = true;
        if(this.sidebarShow){
          this.$nextTick(() => {
            this.$refs.sidebar.fetchData();
          })
        }
        document.body.style = "overflow:hidden"
      },
      //隐藏侧边栏
      hide() {
        this.sidebarShow = false;
        document.body.style = ""
      }
    },
    //注册组件
    components:{
      'v-header':header,
      sidebar,
      swipe,
      homepageDetail
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .mint-loadmore-top
    position relative
    top 40px
  .mint-loadmore-bottom
    position relative
    top 30px
</style>
