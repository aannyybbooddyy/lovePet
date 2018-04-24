import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/app/login'
import Reg from '../components/app/reg'
import Info from '../components/app/info'
import TodoList from "../components/todolist/todolist"
import Counter from "../components/counter/counter"
import Emp from "../components/app/emp"
import AddUser from "../components/app/adduser"

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
      path:'/reg',
      name:'reg',
      component:Reg
    },{
      path:'/info',
      name:"info",
      component:Info,
      children:[{
        path:'todolist',
        name:'todolist',
        component:TodoList
      },{
        path:'counter',
        name:"counter",
        component:Counter
      },{
        path:"emp",
        name:"emp",
        component:Emp
      },{
        path:"adduser",
        component:AddUser
      }]
    }
  ]
})
