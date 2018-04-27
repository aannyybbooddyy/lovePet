
const store = {
    namespaced:true, 
      state: { //数据
        form:{
          memberPhone:"",
          memberAcount:"",
          memberName:"",
          memberCard:"",
          memberAdd:"",
          memberArea:"",
          memberPoint:"",
          memberImg: ''
        },
        //列表用分页
        page:1,
        rows:10,
        curpage:1,
        eachpage:0,
        total:0,
        maxpage:0,
        //搜索用分页
        page2:1,
        rows2:10,
        curpage2:1,
        eachpage2:0,
        total2:0,
        maxpage2:0,
        search:{
          name:"请选择",
          select:" "
        },
        dialogVisible: false,
        list2:[
        ],
        list3:{    
            memberPhone:"18202875032",
            memberAcount:"花和尚",
            memberName:"楚留香",
            memberCard:"00001",
            memberAdd:"成都市金牛区抚琴东南路",
            memberArea:"成都",
            memberPoint:0,
            memberImg: ''
          },
        list:[
          // {    
          //   memberPhone:"18202875032",
          //   memberAcount:"花和尚",
          //   memberName:"楚留香",
          //   memberCard:"00001",
          //   memberAdd:"成都市金牛区抚琴东南路",
          //   memberArea:"成都",
          //   memberPoint:0,
          //   memberImg: ''
          // },
          // {   
          //   memberPhone:"18202875032",
          //   memberAcount:"花和尚",
          //   memberName:"楚留香",
          //   memberCard:"00001",
          //   memberAdd:"成都市金牛区抚琴东南路",
          //   memberArea:"成都",
          //   memberPoint:0,
          //   memberImg: ''
          // }
        ]
      },
      mutations: { //方法
        handleSizeChange(state,parm) {
          state.rows = parm
        },
        handleCurrentChange(state,parm) {
          state.page = parm
        },
        handleSizeChange2(state,parm) {
          state.rows2 = parm
        },
        handleCurrentChange2(state,parm) {
          state.page2 = parm
        },
        getdialogVisible(state){
          state.dialogVisible = false
        },
       updata(state,parm){
        state.dialogVisible = true
        state.list3 = parm
       } ,
       getData(state,parm){
        state.list=parm.rows;
        state.curpage=parm.curpage;
        state.eachpage=parm.eachpage;
        state.maxpage=parm.maxpage;
        state.total=parm.total;
       },
       getData2(state,parm){
        state.list2 = parm.rows;
        state.curpage2=parm.curpage;
        state.eachpage2=parm.eachpage;
        state.maxpage2=parm.maxpage;
        state.total2=parm.total;
       }
      },
      getters:{ //计算属性

      },
      actions:{  //异步处理 
        //获取数据
        async getCember(context){
          let {page,rows} = this.state.MemberStore
          const data = await fetch(`/members?page=${page}&rows=${rows}`).then(response => response.json())
          context.commit("getData",data)
        },
        //增加数据
        async addCember(context){
          let form = context.state.form
          console.log("进入添加")
          await fetch(`/members`,{
            method:"post",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
          }).then().catch()
        } ,
        //搜索
        async searchMembers(context){
          let page= this.state.MemberStore.page2
          let rows = this.state.MemberStore.rows2
          let {name,select} = this.state.MemberStore.search
          const data = await fetch(`/members?page=${page}&rows=${rows}&name=${name}&select=${select}`).then(response => response.json())
          context.commit("getData2",data)
        },
        //删除
        async delMembers(context,parm){
           await fetch("/members", {
              method: "delete",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              body:'id='+parm
            })
        },
        //修改
        async updata2(context,parm){
          context.state.dialogVisible = false
          let list3 = context.state.list3
          await fetch("/members", {
            method: "put",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(list3)
          })
         } ,
      }
    }
    export {store as default}






