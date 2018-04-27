
const store = {
  namespaced: true,
  state: {
    goodsList: [{
      goodsName: '',
      goodsType: '',
      goodsMaterial: '',
      goodsCanFor: '',
      goodsOnlyFor: '',
      goodsSize: '',
      goodsTaste: '',
      goodsSpecial: '',
      goodsRegion: '',
      goodsDate: '',
      goodsTime: '',
      goodsSupplier: '',
      goodsIntro: '',
      goodsPrice: '',
      number: '',
      goodsImg: ""
    }],
    AddList: {
      goodsName: '',
      goodsType: '',
      goodsMaterial: '',
      goodsCanFor: '',
      goodsOnlyFor: '',
      goodsSize: '',
      goodsTaste: '',
      goodsSpecial: '',
      goodsRegion: '',
      goodsDate: '',
      goodsTime: '',
      goodsSupplier: '',
      goodsIntro: '',
      goodsPrice: '',
      number: '',
      goodsImg: ""
    },
    search: {
      goodsName: "",
      goodsType:""
    }
  },
  mutations: {
    list(state, parm) {
      this.state.GoodsStore.goodsList = parm
    }
  },
  actions: {
    async getPet(context) {
      console.log(this.state.GoodsStore.goodsList)
      const { goodsList } = context.state
      const data = await fetch('/members').then(response => response.json())
      context.commit("list", data)
    },
    async getMethod(context) {
      const { goodsName,goodsType} = context.state.search
      console.log(goodsName);
      const data2 = await fetch(`/members/serch?goodsName=${goodsName}&goodsType=${goodsType}`).then(response => response.json()) 
      console.log(data2)
      context.commit("list",data2)
    },
    async addGoods(context) {
      let AddList = context.state.AddList
      await fetch(`/members`, {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(AddList)
      }).then().catch()
    },
  },
}
export { store as default }