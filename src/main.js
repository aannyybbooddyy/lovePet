// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// import Counter from './components/counter/counter.vue'
// import Show from './components/counter/show.vue'
// import IButton from './components/counter/ibutton.vue'
// // import CounterStore from "./components/counter/store"
// Vue.component("Counter",Counter)
// Vue.component("Show",Show)
// Vue.component("IButton",IButton)
// // new Vue({
// //   el: '#app',
// //   store:CounterStore,
// //   template:'<Counter />'
// // })





// import Todolist from './components/todolist/todolist.vue'
// import Addtodo from "./components/todolist/addtodo.vue"
// import Todos from "./components/todolist/todos.vue"
// import Selecttype from "./components/todolist/selecttype.vue"

// Vue.component("TodoList",Todolist)
// Vue.component("AddToDo",Addtodo);
// Vue.component("Todos",Todos);
// Vue.component("SelectType",Selecttype);


// import Login from "./components/app/login.vue"
// import Reg from "./components/app/reg.vue"
// import Info from "./components/app/info.vue"
// import router from './router'
// import Store from "./store/store"
// import Adduser from "./components/app/adduser.vue"

// Vue.component("Login",Login)
// Vue.component("Reg",Reg);
// Vue.component("Info",Info);
// Vue.component("AddUser",Adduser);


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


