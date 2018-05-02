const store = {
  namespaced: true,
  state: {
    curUser:{
      userStatus:1,
      _id:"5adff0031f5daad65810e6be"
    },
    examine:{
      curpage: 1,
      eachpage: 5,
      maxpage: 0,
      total: 0,
      rows: []
    },
    list:{
      curpage: 1,
      eachpage: 5,
      maxpage: 0,
      total: 0,
      rows: []
    },
    searchUser:[]
  },
  mutations: {
    getSearchUser(state,data){
      if(data.length!=0){
        state.searchUser.splice(0);
        state.searchUser.push(data);
      }else{
        state.searchUser = [];
      }
    },
    getUsers(state, { curpage, eachpage, maxpage, rows, total }) {
      state.examine.curpage = curpage;
      state.examine.eachpage = eachpage;
      state.examine.maxpage = maxpage;
      state.examine.total = total;
      let len = rows.length;
      state.examine.rows.splice(0);
      for (let i = 0; i < len; i++) {
        state.examine.rows.push(rows[i]);

      }
    },
    getShopkeeper(state, { curpage, eachpage, maxpage, rows, total }) {
      state.list.curpage = curpage;
      state.list.eachpage = eachpage;
      state.list.maxpage = maxpage;
      state.list.total = total;
      let len = rows.length;
      state.list.rows.splice(0);
      for (let i = 0; i < len; i++) {
        state.list.rows.push(rows[i]);
      }
    },
    handleSizeChange(state, eachpage) {
      state.examine.eachpage = eachpage
    },
    handleCurrentChange(state, curpage) {
      state.examine.curpage = curpage;
    },
    listSizeChange(state, eachpage) {
      state.list.eachpage = eachpage
    },
    listCurrentChange(state, curpage) {
      state.list.curpage = curpage;
    }
    
  },
  actions: {
    // 获取未通过验证的用户
    async getUsersAsync(context,state) {
      const data = await fetch(`/users?page=${state.curpage}&rows=${state.eachpage}`).then(response => response.json());
      context.commit("getUsers", data);
    },
    // 获取已经通过验证的用户
    async getShopkeeperAsync(context,state) {
      const data = await fetch(`/users/shopkeeper?page=${state.curpage}&rows=${state.eachpage}`).then(response => response.json());
      context.commit("getShopkeeper", data);
    },
    // 让用户通过验证
    async postUserToOneAsync(context,item) {
      await fetch('/users', {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `userAcount=${item.userAcount}&userMail=${item.userMail}&userName=${item.userName}&userPhone=${item.userPhone}&userPwd=${item.userPwd}&userType=${item.userType}&userId=${item._id}`
      })
    },
    // 删除用户
    async theUserDeleteAsync(context,id) {
      await fetch('/users', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `userId=${id}`
      })
    },
    async theShopkeeperDeleteAsync(context,id) {
      console.log(id,"storeid");
      await fetch('/users/dlt', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `userId=${id}`
      })
    },
    // 搜索用户
    async serchUserAsync(context,text){
      const data = await fetch(`/users/serch?text=${text}`).then(response=>response.json());
      context.commit("getSearchUser", data);
    },
    // 修改店主资料
    async modificationAsync(context,item){
      await fetch('/users/midificat', {
        method: "PUT",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `acount=${item.userAcount}&mail=${item.userMail}&name=${item.userName}&phone=${item.userPhone}&pwd=${item.userPwd}&id=${item._id}`
      })
    }

  }
}
export { store as default }