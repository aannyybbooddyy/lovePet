
const store = {
    namespaced:true,
      state: {
        curpage:1,
        eachpage:10,
        maxpage:0,
        rows:[],
        total:0,
        searchRows:[],
        searchCurPage:1,
        searchMaxPage:0,
        searchEachPage:10,
        searchTotal:0,
        name:"",
        curTab:"ordersList",
        isUpdateDisabled:false,
        curUser:{
          userStatus:1,
          _id:"5adff0031f5daad65810e6be"
        },
      updateInfo:{
        users:{},
        members:{},
        shops:{},
        orderDetail:[]
      },
      searchType:1
      },
      mutations: {
        getOrders(state,{curpage,eachpage,maxpage,rows,total}){
          state.curpage = curpage;
          state.eachpage = eachpage;
          state.maxpage = maxpage;
          state.total = total;
          // console.log(rows,"rows");
          let len = rows.length;
          state.rows.splice(0);
          
            for(let i = 0; i < len; i++){
              state.rows.push(rows[i]);
            }

          
          
        },
        handleSizeChange(state,val) {
          state.eachpage = val;
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(state,val) {
          state.curpage = val;
          console.log(`当前页: ${val}`);
        },
        handleSearchSizeChange(state,val) {
          state.searchEachPage = val;
          console.log(`每页 ${val} 条`);
        },
        handleSearchCurrentChange(state,val) {
          state.searchCurPage = val;
          console.log(`当前页: ${val}`);
        },
        handleDelete(state,orderId){
        },
        setUpdateInfo(state,info){
          state.updateInfo = info;
        },
        setCurTab(state,curtab){
          state.curTab = curtab;
        },
        setIsUpdateDisabled(state,flag){
          state.isUpdateDisabled = flag;
        },
        setSearchType(state,type){
          state.searchType = type;
        },
        getSearchOrders(state,{curpage,eachpage,maxpage,rows,total}){
          state.searchCurPage = curpage;
          state.searchEachPage = eachpage;
          // state.searchRows = rows;
          state.searchMaxPage = maxpage;
          state.searchTotal = total;
          let len = rows.length;
          state.rows.splice(0);
            for(let i = 0; i < len; i++){
              state.searchRows.push(rows[i]);
            }
        }
      },
      actions:{
        getCurUser(context){
          this.state.OrderStore.curUser = this.state.UserStore.curUser;
        },
        async getOrdersAsync(context){
         //userStatus为2代表超级管理员

          //  if(this.state.UserStore.curUser.userStatus == 2){
          //    console.log("超级管理员")
          //     data = await fetch(`/orders`).then(response => response.json());
          //  }
          //else说明userStatus为1，代表门店管理员
          //  else{
          // console.log("店铺管理员",this)
          const data = await fetch(`/orders?userId=${this.state.UserStore.curUser._id}&page=${this.state.OrderStore.curpage}&rows=${this.state.OrderStore.eachpage}`).then(response => response.json());
          //  }
            context.commit("getOrders",data);
            
          },

          async deleteOrdersAsync(context,orderId){
            await fetch('/orders',{
              method:"DELETE",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body:`orderId=${orderId}`
            })

        },
        async updateOrderAsync(context, updateInfo){
          console.log("update",updateInfo)
          await fetch('/orders',{
            method:"PUT",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:"value=" + JSON.stringify(updateInfo)
          })

        },
        async getSearchOrderAsync(context,[{ orderId, orderTotal, memberId,sendAdd,orderStatus},searchType]){
          let userId = this.state.UserStore.curUser._id;
          let data;
          // console.log(this.state.OrderStore.searchType,"llll",userId)
          // console.log(searchType,"llll",userId)
          // console.log(searchType,"aa");
          // console.log({ orderId, orderTotal, memberId,sendAdd})
          //1、店铺管理员按照id搜索
          //2、店铺管理员按照字段搜索
          //searchType： true:按照Id搜索；false 按照字段搜索
          if(searchType){
            data = await fetch(`/orders/search?orderId=${orderId}&userId=${userId}&page=${this.state.OrderStore.searchCurpage}&rows=${this.state.OrderStore.searchEachpage}`).then(response => response.json());
          }
          else{
            data = await fetch('/orders/search',{
                method:"POST",
                headers:{
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:`value=${JSON.stringify({orderTotal, memberId, userId, sendAdd, orderStatus})}&page=${this.state.OrderStore.searchCurpage}&rows=${this.state.OrderStore.searchEachpage}`
              }).then(res => res.json());
            }

          
          context.commit("getSearchOrders",data);

        }
      }
    }
    export {store as default}

