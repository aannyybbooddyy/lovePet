import Vue from 'vue'
import App from './App'
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
import ServiceList from "./components/services/serviceList.vue"
import ServiceAdd from "./components/services/serviceAdd.vue"


import Members from "./components/members/member.vue"
import MemberAdd from "./components/members/memberAdd.vue"
import MemberList from "./components/members/memberList.vue"
import MemberSearch from "./components/members/memberSearch.vue"

import Pets from "./components/pets/pet.vue"
import PetAdd from "./components/pets/petAdd.vue"
import PetList from "./components/pets/petList.vue"
import PetSearch from "./components/pets/petSearch.vue"

import Orders from "./components/orders/order.vue"
import OrderUpdate from "./components/orders/orderUpdate.vue"
import OrderList from "./components/orders/orderList.vue"
import OrderSearch from "./components/orders/orderSearch.vue"

import Shops from "./components/shops/shop.vue"
import ShopAdd from "./components/shops/shopsAdd.vue"
import ShopList from "./components/shops/shopsList.vue"
import ShopSearch from "./components/shops/shopsSearch.vue"

import Users from "./components/users/user.vue"
import UserExamine from "./components/users/userExamine.vue"
import UserAdd from "./components/users/userAdd.vue"
import UserList from "./components/users/userList.vue"

import Check from "./components/check/check.vue"
import router from "./router/index"

Vue.component("Goods",Goods);
Vue.component("GoodsAdd",GoodsAdd);
Vue.component("GoodsList",GoodsList);
Vue.component("GoodsSearch",GoodsSearch);

Vue.component("Check",Check);

Vue.component("Members",Members);
Vue.component("MemberAdd",MemberAdd);
Vue.component("MemberList",MemberList);
Vue.component("MemberSearch",MemberSearch);


Vue.component("Home",Home);
Vue.component("Login",Login);
Vue.component("Register",Register);

Vue.component("Services",Services);
Vue.component("ServiceAdd",ServiceAdd);
Vue.component("ServiceList",ServiceList);


Vue.component("Orders",Orders);
Vue.component("OrderUpdate",OrderUpdate);
Vue.component("OrderList",OrderList);
Vue.component("OrderSearch",OrderSearch);



Vue.component("Pets",Pets);
Vue.component("PetAdd",PetAdd);
Vue.component("PetList",PetList);
Vue.component("PetSearch",PetSearch);

Vue.component("Shops",Shops);
Vue.component("ShopAdd",ShopAdd);
Vue.component("ShopList",ShopList);
Vue.component("ShopSearch",ShopSearch);

Vue.component("Users",Users);
Vue.component("UserAdd",UserAdd);
Vue.component("UserList",UserList);
Vue.component("UserExamine",UserExamine);

new Vue({
  el: '#app',
  router,
  store:Store,
  components: { App },
  template:'<router-view />'
})


