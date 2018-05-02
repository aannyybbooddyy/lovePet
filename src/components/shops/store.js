
const store = {
  namespaced: true,
  state: {
    ruleForm: {
      shopName: "",
      shopLicenceNum: "",
      shopAdd: "",
      shopCorporate: "",
      shopTel: "",
      shopFeature: [],
      id: "",
      shopsImg:"",
      lmicenceImg:""
    },
    statearr: []
    ,
    dialogImageUrl: "",
    dialogVisible: false,
  },
  //方法
  mutations: {
    // {shopAdd,shopCorporate,shopFeature,shopLicenceNum,shopName,shopTel,_id}
    getshops(state, data) {
      state.statearr.splice(0)
      for (let i = 0; i < data.length; i++) {
        state.statearr.push(data[i]);
      }
      // console.log(state.statearr,"look")
    },
  },
  // 异步操作
  actions: {
    //fetch请求路径
    async getshop(context) {
      const data = await fetch("/shops").then(Response => Response.json())
      // console.log(data)
      context.commit("getshops", data)
    },
    //添加店铺
    async addshop(context) {
      let ruleForm = context.state.ruleForm
      console.log(ruleForm)
      console.log("进入添加")
      await fetch("/shops", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ruleForm)
      }).then().catch()
    },
      //删除
    async deleteshop(context,vauel){  
      let id=vauel
      console.log(id)
      await fetch("/shops", {      
        method: "delete",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id=${id}`
      })
   
    },
    // 修改
    async modificationAsync(context,item){
      await fetch('/shops/midificat', {
        method: "PUT",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `shopsImg=${item.shopsImg}&shopName=${item.shopName}&shopLicenceNum=${item.shopLicenceNum}&shopAdd=${item.shopAdd}&shopCorporate=${item.shopCorporate}&shopTel=${item.shopTel}&shopFeature=${item.shopFeature}&id=${item._id}&lmicenceImg=${item.lmicenceImg}`
      })
    }
  },

}
export { store as default }