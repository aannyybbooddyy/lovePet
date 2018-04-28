import Vue from 'vue'
import Vuex from 'vuex'
import GoodsStore from "../components/goods/store"
import ServiceStore from "../components/services/store"
import MemberStore from "../components/members/store"
import PetStore from "../components/pets/store"
import OrderStore from "../components/orders/store"
import ShopStore from "../components/shops/store"
import UserStore from "../components/users/store"


Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
      GoodsStore,
      ServiceStore,
      MemberStore,
      PetStore,
      OrderStore,
      ShopStore,
      UserStore
    }
  })
