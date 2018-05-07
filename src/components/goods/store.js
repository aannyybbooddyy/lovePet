
const store = {
  namespaced: true,
  state: {
    goodsList: [],
    search:[],
    recompose:{},
    AddList:{},
    curPage: 1,
    eachPage: 5,
    maxPage: 0,
    count: 0,
    dialogVisible:false,
    centerDialogVisible:false,
  
  },

  // 同步处理方法
  mutations: {
    list(state, parm) {
      console.log(parm)
      this.state.GoodsStore.goodsList = parm.rows
    },
    serch(state,parm){
      this.state.GoodsStore.search = parm.rows
    },
    close(state,parm){
      state.centerDialogVisible= false
    },
    opens(state,parm){
      state.centerDialogVisible= true
      let AddList = JSON.stringify(parm)
      state.AddList = JSON.parse(AddList)
    },   
  },

  // 异步处理方法
  actions: {
    
    // 请求数据，渲染列表
    async getPet(context) {
      const { goodsList} = context.state
      const data = await fetch(`/goods`).then(response => response.json())
      context.commit("list", data)
    },

    // 查询数据
    async getMethod(context) {
      const { goodsName,goodsType} = context.state.search
      const data2 = await fetch(`/goods/serch?goodsType=${goodsType}`).then(response => response.json())
      context.commit("serch",data2)
    },

    // 删除数据
    async deleteMethod(context,parm) {
      fetch("/goods/delete", {
        method: "delete",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `parm=${parm}`
        //credentials: 'include'
      })
  
    },
    // 添加数据
    async addGoods(context) {
      // let uesrId = '5ae41faa99868620d0b06b23'
      let AddList = context.state.AddList
      await fetch(`/goods/post`, {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body:`userId=5ae41faa99868620d0b06b23&goodsName=${AddList.goodsName}&goodsType=${AddList.goodsType}&goodsMaterial=${AddList.goodsMaterial}&goodsCanFor=${AddList.goodsCanFor}&goodsOnlyFor=${AddList.goodsOnlyFor}&goodsSize=${AddList.goodsSize}&goodsTaste=${AddList.goodsTaste}&goodsSpecial=${AddList.goodsSpecial}&goodsRegion=${AddList.goodsRegion}&goodsDate=${AddList.goodsDate}&goodsTime=${AddList.goodsTime}&goodsSupplier=${AddList.goodsSupplier}&goodsIntro=${AddList.goodsIntro}&goodsPrice=${AddList.goodsPrice}&number=${AddList.number}&goodsImg=${AddList.goodsImg}`
      })
    },

    // 修改数据
    async putMethod(context,parm) {
      // context.state.centerDialogVisible = true
      let AddList = context.state.AddList
      fetch("/goods/put", {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `id=${AddList._id}&goodsName=${AddList.goodsName}&goodsType=${AddList.goodsType}&goodsMaterial=${AddList.goodsMaterial}&goodsCanFor=${AddList.goodsCanFor}&goodsOnlyFor=${AddList.goodsOnlyFor}&goodsSize=${AddList.goodsSize}&goodsTaste=${AddList.goodsTaste}&goodsSpecial=${AddList.goodsSpecial}&goodsRegion=${AddList.goodsRegion}&goodsDate=${AddList.goodsDate}&goodsTime=${AddList.goodsTime}&goodsSupplier=${AddList.goodsSupplier}&goodsIntro=${AddList.goodsIntro}&goodsPrice=${AddList.goodsPrice}&number=${AddList.number}&goodsImg=${AddList.goodsImg}`
      });
    },

  },
}
export { store as default }