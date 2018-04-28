import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/login/login.vue"
import Register from "../components/register/register.vue"
import Home from "../components/home/index.vue"
import Goods from "../components/goods/goods.vue"
import list from "../components/services/list.vue"
import Members from "../components/members/member.vue"
import Pets from "../components/pets/pet.vue"
import Orders from "../components/orders/order.vue"
import Shops from "../components/shops/shop.vue"
import Users from "../components/users/user.vue"
import Check from "../components/check/check.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },{
      path:"/login/:username",
      name:'loginWithUser',
      component:Login
    },{
      path:'/register',
      name:'register',
      component:Register
    },{
      path:'/home',
      name:"homepage",
      component:Home,
      children:[{
        path:'goods',
        name:'goods',
        component:Goods
      },{
        path:'shops',
        name:"shops",
        component:Shops
      },{
        path:"users",
        name:"users",
        component:Users
      },{
        path:"list",
        name:"list",
        component:list
      },{
        path:"pets",
        name:"pets",
        component:Pets
      },{
        path:"members",
        name:"members",
        component:Members
      },{
        path:"orders",
        name:"orders",
        component:Orders
      },{
        path:"check",
        name:"check",
        component:Check
      }]
    }
  ]
})