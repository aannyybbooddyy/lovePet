
const store = {
    namespaced:true, 
      state: { //数据
        form:{
          memberPhone:"",
          memberAcount:"",
          memberName:"",
          memberCard:"",
          memberIma:"",
          memberAdd:"",
          memberArea:"",
          memberPoint:""
        },
        page:1,
        rows:10,
        curpage:1,
        eachpage:0,
        total:0,
        maxpage:0,
        search:{
          name:"请选择",
          select:" "
        },
        list2:[
          // {     
          //   memberPhone:"18202875032",
          //   memberAcount:"花和尚",
          //   memberName:"楚留香",
          //   memberCard:"00001",
          //   memberIma:"头像图地址",
          //   memberAdd:"成都市金牛区抚琴东南路",
          //   memberArea:"成都",
          //   memberPoint:0
          // }
        ],
        list:[
          {     
            memberPhone:"18202875032",
            memberAcount:"花和尚",
            memberName:"楚留香",
            memberCard:"00001",
            memberIma:"头像图地址",
            memberAdd:"成都市金牛区抚琴东南路",
            memberArea:"成都",
            memberPoint:0
          },
          {     
            memberPhone:"18202875032",
            memberAcount:"花和尚",
            memberName:"楚留香",
            memberCard:"00001",
            memberIma:"头像图地址",
            memberAdd:"成都市金牛区抚琴东南路",
            memberArea:"成都",
            memberPoint:0
          }
        ]
      },
      mutations: { //方法
        handleSizeChange(state,parm) {
          state.rows = parm
        },
        handleCurrentChange(state,parm) {
          state.page = parm
        },
       del(state,parm){
         console.log(parm)
        //  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning',
        //   center: true
        // }).then(() => {
        //   this.$message({
        //     type: 'success',
        //     message: '删除成功!'
        //   });
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });
        // });
       },
       updata(state,parm){
        console.log(parm)
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
          let {page,rows,} = this.state.MemberStore
          let {name,select} = this.state.MemberStore.search
          const data = await fetch(`/members?page=${page}&rows=${rows}&name=${name}&select=${select}`).then(response => response.json())
          context.commit("getData2",data)
        },
      }
    }
    export {store as default}






