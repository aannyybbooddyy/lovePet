
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
    AddList:{
      goodsName: '',
      goodsType: '',
      goodsMaterial: '',
    }
  },
  mutations: {
    add(state, parm) {
      this.state.GoodsStore.goodsList = parm
    }
  },
  actions: {
    async getPet(context) {
      const { goodsList } = context.state
      const data = await fetch(`/members`).then(response => response.json())
      context.commit("add", data)
    },
    async postPet()
  }
}
export { store as default }