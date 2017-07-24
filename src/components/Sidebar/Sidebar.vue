<template>
  <div>
    <transition name="fold" >
      <div class="sidebar"  v-show="sidebarShow" :class="model">
        <div class="user" :class="model">
          <div class="avatar"></div>
          <div class="username">成长</div>
          <div class="back" @click="hide"><img src="./back.png" width="28" height="28"></div>
        </div>
        <div class="menu-list" :class="model"> 
          <div class="menu" @click="goCollect">
            <span class="avatar"><img src="./collect.png" width="20" height="20"></span>
            <span class="name">我的收藏</span>
          </div>
      
          <div class="menu">
            <span class="avatar"><i class="icon iconfont icon-lixianwenjian"></i></span>
            <span class="name">离线下载</span>
          </div> 
      </div>
        <div class="themes-list" ref="themeWrapper">
          <ul style="padding-left: 0">
            <li class="themes" v-for="item in data" @click="goTheme(item.id)" :class="{'current':currentThemeId===item.id}">
              <div class="icons" v-if="item.id == -1"><i class="icon iconfont icon-shouyeshouye"></i></div>
              <div class="themetitle">{{item.name}}</div>
            </li>
          </ul>
       </div>
        
      </div>
    </transition>
    <transition name="fade">
      <div class="mask"  @click.stop.prevent="hide"  v-show="sidebarShow"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import BScroll from 'better-scroll';
  import router from '../../router/index';
  import collect from '../Collect/Collect.vue'

  export default {
    //接收父组件传值
    props:{
      sidebarShow:{
        type:Boolean
      }
    },
    data() {
      return {
        data:[]     //初始化主题列表数据
      }
    },
    //生命周期创建观察数据
    created() {
      this.fetchData();
    },
    //观察路由跳转更新数据
    watch:{
      '$route'(to,form){
        this.fetchData();
      }
    },
    methods:{
      //隐藏侧边栏，向上派发事件
      hide() {
        this.$emit('hideSidebar');
      },
      //获取主题列表数据
      fetchData() {
        axios.get('api/themes').then((response) => {
          this.data = response.data.others;

          //由于改api中没有首页的数据，因此在data中添加首页
          this.data.unshift({
            color: 0,
            thumbnail: '',
            description: '首页',
            id: -1,
            name: '首页'
          });

          this.$nextTick(() => {
            this.themeScroll = new BScroll(this.$refs.themeWrapper,{
              click:true
            });
          });
        }).catch((error) => {
          console.log('error');
        })
      },
      //跳转收藏页面路由
      goCollect() {
        router.push({ name:'collect' })
      },
      //跳转主题页面路由
      goTheme(id) {
        if(id == -1) {
          this.hide();
          router.push({name: 'homePage'});
          this.$store.dispatch('changeGoType',1)
          this.$store.dispatch('changeCurrentThemeId',id);
        }else {
          this.hide();
          this.$store.dispatch('changeCurrentThemeId',id);
          router.push({ name: 'themeDetail', params: { id } });
        }
      },
      
    },
    computed: {
      //计算当前主题id
      currentThemeId() {
        return this.$store.state.currentThemeId;
      },
      
      model() {
        return this.$store.getters.getModel
      },
    
    },
  
    components:{
      collect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/index.styl'
  @import "../../common/stylus/iconfont.css"

  .sidebar
    &.morning
      color rgb(51,51,51)
      background-color rgb(255,255,255)
    &.night
      color rgb(184,184,184)
      background-color rgb(85,85,85)
    position fixed
    top 0
    left 0
    z-index 50
    height 100%
    width 320px
    background-color rgb(255,255,255)
    transform translate3d(0,0,0)
    &.fold-enter-active,&.fold-leave-active
      transition all 0.5s
    &.fold-enter,&.fold-leave-active
      transform translate3d(-100%,0,0)
    .user
        &.morning
         color rgb(51,51,51)
         background-color rgb(2,143,214)
        &.night
         color rgb(184,184,184)
         background-color rgb(85,85,85) 
        padding 10px 10px 2px 10px
        font-size 0
        
        .avatar
          display inline-block
          margin-right 10px
          width 40px
          height 40px
          bg-image('useravatar')
          background-size 40px 40px
          background-repeat no-repeat
          border-radius 50%
          vertical-align top
        .username
          display inline-block
          font-size 15px
          color rgb(255,255,255)
          line-height 40px
        .back
          display inline-block
          vertical-align top
          position relative
          top 7px
          left 160px
          width 28px
          height 28px
  
    .menu-list
      &.morning
       color rgb(51,51,51)
       background-color rgb(2,143,214)
      &.night
       color rgb(184,184,184)
       background-color rgb(85,85,85)  
      display flex
      padding 20px 20px 14px 10px
      .menu
        flex 1
        text-align center
        color rgb(255,255,255)
        .avatar
          margin-right 6px
          .iconfont
            font-size 20px
     
    .themes-list
      position absolute
      top 104px
      bottom 16px
      width 100%
      overflow hidden
      .themes
        display table
        width 100%
        padding-left 15px
        &.current
          background-color  #d4d4d4
          color rgb(255,255,255)
        .icons
          display inline-block
          margin-right 5px
        .themetitle
          display inline-block
          line-height 50px
             
  
  .mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    background: rgba(7, 17, 27, 0.6)
    opacity 1
    &.fade-enter-active,&.fade-leave-active
      transition all 0.5s
    &.fade-enter,&.fade-leave-active
      opacity 0
</style>

