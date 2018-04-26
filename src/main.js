import Vue from 'vue'
//elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);



import Store from "./store/store"


import Goods from "./components/goods/goods.vue"
import GoodsAdd from "./components/goods/goodsAdd.vue"
import GoodsList from "./components/goods/goodsList.vue"
import GoodsSearch from "./components/goods/goodsSearch.vue"


import Home from "./components/home/index.vue"
import Login from "./components/goods/goods.vue"
import Register from "./components/register/register.vue"
import Services from "./components/services/service.vue"
import Members from "./components/members/member.vue"
import MemberAdd from "./components/members/memberAdd.vue"
import MemberList from "./components/members/memberList.vue"
import MemberSearch from "./components/members/memberSearch.vue"
import Pets from "./components/pets/pet.vue"

import Orders from "./components/orders/order.vue"
import OrderAdd from "./components/orders/orderAdd.vue"
import OrderList from "./components/orders/orderList.vue"
import OrderSearch from "./components/orders/orderSearch.vue"


import Shops from "./components/shops/shop.vue"
import Users from "./components/users/user.vue"
import Check from "./components/check/check.vue"
import router from "./router/index"


Vue.component("Goods",Goods);
Vue.component("GoodsAdd",GoodsAdd);
Vue.component("GoodsList",GoodsList);
Vue.component("GoodsSearch",GoodsSearch);
Vue.component("Check",Check);

Vue.component("MemberAdd",MemberAdd);
Vue.component("MemberList",MemberList);
Vue.component("MemberSearch",MemberSearch);


Vue.component("Home",Home);
Vue.component("Login",Login);
Vue.component("Register",Register);
Vue.component("Members",Members);

Vue.component("Orders",Orders);
Vue.component("OrderAdd",OrderAdd);
Vue.component("OrderList",OrderList);
Vue.component("OrderSearch",OrderSearch);



Vue.component("Services",Services);
Vue.component("Pets",Pets);
Vue.component("Shops",Shops);
Vue.component("Users",Users);

new Vue({
  el: '#app',
  router,
  store:Store,
  template:'<router-view />'
})


