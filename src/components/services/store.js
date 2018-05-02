const store = {
  namespaced: true,
  state: {
    service: [],
    isChange:true,
    serviceList: {
      serviceName: "123",
      serviceType: "",
      servicePrice: "",
      serviceTime:"",
      storeId: "123",
      storeName: "",
      address: "",
      manageId:"002"
    },
    changeList:{
      serviceName: "",
      serviceType: "",
      servicePrice: "",
      storeId: "123",
      storeName: "",
      address: "",
      id:"",
      manageId:"002"
    }
  },
  mutations: {
    addPet(state, parm) {
      // for(let i = 0;i<parm.length;i++){
      //   if(parm[i].manageId == "002"){
      //     this.state.ServiceStore.service.push(parm[i])
      //   }
      // }
      this.state.ServiceStore.service = parm

    },
    changeRow(state,rows) {
      state.isChange = !state.isChange
      this.state.ServiceStore.changeList.serviceName = rows.serviceName
      this.state.ServiceStore.changeList.serviceType = rows.serviceType
      this.state.ServiceStore.changeList.servicePrice = rows.servicePrice
      this.state.ServiceStore.changeList.storeName = rows.storeName
      this.state.ServiceStore.changeList.address = rows.address
      this.state.ServiceStore.changeList.serviceTime = rows.serviceTime
      this.state.ServiceStore.changeList.id = rows._id

    },
    reset(state,rows) {
      this.state.ServiceStore.serviceList.serviceName = ""
      this.state.ServiceStore.serviceList.serviceType = ""
      this.state.ServiceStore.serviceList.servicePrice = ""
      this.state.ServiceStore.serviceList.storeName = ""
      this.state.ServiceStore.serviceList.address = ""
      this.state.ServiceStore.serviceList.serviceTime = ""
    },
    offChange(state,rows) {
      state.isChange = !state.isChange
    }


  },
  actions: {
    async getPet(context) {
      // const { curPage, eachPage } = context.state
      const data = await fetch(`/services`).then(response => response.json());
      context.commit("addPet", data);
    },
    async addService(context) {
      // const { curPage, eachPage } = context.state
      let serviceList = context.state.serviceList
      await fetch('/services', {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceList)
      }).then().catch()
      await context.dispatch('getPet')
    },
    async delService(context, parm) {
      await fetch("/services", {
        method: "delete",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'id=' + parm
      })
      await context.dispatch('getPet')
    },
    async onChange(context, parm) {
      context.state.isChange=!context.state.isChange
      let changeList = context.state.changeList
      await fetch("/services",{
        method:"put",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(changeList)
      })
      await context.dispatch('getPet')
    }

  }
}
export {
  store as
  default
}