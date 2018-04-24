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



import Store from "./components/goods/store"
import Goods from "./components/goods/good.vue"
Vue.component("Goods",Goods)


new Vue({
  el: '#app',
  store:Store,
  template:'<Goods />'
})

