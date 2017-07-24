
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//关闭生产模式下给出的提示
Vue.config.productionTip = false
Vue.use(MintUI)


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
