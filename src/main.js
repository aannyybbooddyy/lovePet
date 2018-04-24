import Vue from 'vue'
//elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import Store from "./store/store"
import Goods from "./components/goods/good.vue"
import Members from "./components/members/member.vue"
Vue.component("Goods",Goods)
Vue.component("Members",Members)

new Vue({
  el: '#app',
  store:Store,
  template:'<Members />'
})

