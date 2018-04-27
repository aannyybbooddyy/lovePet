
const store = {
    namespaced:true,
      state: {
        curpage:1,
        eachpage:10,
        maxpage:0,
        rows:[],
        total:0,
        name:"",
        curTab:"ordersList",
      isUpdateDisabled:false,
      updateInfo:{
        users:{},
        members:{},
        shops:{},
        orderDetail:[]
      }
      },
      mutations: {
        getOrders(state,{curpage,eachpage,maxpage,rows,total}){
          state.curpage = curpage;
          state.eachpage = eachpage;
          state.maxpage = maxpage;
          state.total = total;
          let len = rows.length;
          state.rows.splice(0);
          for(let i = 0; i < len; i++){
            state.rows.push(rows[i]);
          }
        },
        handleSizeChange(state,val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(state,val) {
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
        }
      },
      actions:{
       async getOrdersAsync(context){
            const data = await fetch(`/orders`).then(response => response.json());
            context.commit("getOrders",data);
            
        },
        async addLiuYanAsync(context,item){
            console.log(item,"item")
            await fetch(`/message`,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                body:`name=${item.name}&content=${item.content}&time=${item.time}`
            })
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
          await fetch('/orders',{
            method:"PUT",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:"value=" + JSON.stringify(updateInfo)
          })

        }
      }
    }
    export {store as default}

