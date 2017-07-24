<template>
  <div class="editorsList">
    <sonheader :title="title" @back="back"></sonheader>
    <div class="list"> 
      <ul>
        <li class="editor border-1px" v-for="editor in this.$store.state.currentTheme.editors" @click="goEditor(editor.id,editor.name)">
          <div class="avatar">
            <img :src="attachImageUrl(editor.avatar)" height="35" width="35">
          </div>
          <div class="description">
            <div class="name">{{editor.name}}</div>
            <div class="bio">{{editor.bio}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import router from '../../router'
  import sonheader from '../SonHeader/SonHeader.vue'

  export default {
    data() {
       return {
          title:'主编'                   //主编列表头部标题
       }
    },
    methods:{
      //返回上一级路由
      back() {
        router.push({name:'themeDetail',params:{id:this.$store.state.currentThemeId}})
      },
      //对图片url进行转化
      attachImageUrl(srcUrl) {
        if(srcUrl !== undefined){
          return srcUrl.replace(/http\w{0,1}:\/\//g,'https://images.weserv.nl/?url=')
        }
      },
      //跳转主编个人主页路由
      goEditor(id,name) {
        router.push({name:'editor',params:{id:id}});
        this.$store.dispatch('addEditorId',{
          id:id,
          name:name
        });
      }
    },
    //注册组件
    components:{
      sonheader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/index.styl"

  .list
    position relative
    top 40px
    ul
      padding-left 0
      .editor
        display flex
        height 60px
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex 0 0 25px
          height 60px
          line-height 60px
          padding-left 10px
          margin-right 15px
          img
            border-radius 50%
        .description
          flex 1
          height 60px
          .name
            font-size 14px
            margin-top 10px
          .bio
            font-size 11px
            margin-top 12px
            color rgb(153,153,153)
        /*.arrow_right*/
          /*flex 0 0 25px*/
          /*line-height 60px*/
          /*padding-right 10px*/
</style>
