
const store = {
    namespaced:true, 
      state: { //数据
        ip:"192.168.192.2",
        form:{
          memberPhone:"",
          memberAcount:"",
          memberName:"",
          memberCard:"",
          memberAdd:"",
          memberArea:"",
          memberPoint:"",
          memberImg:""
        },
        rules:{
          memberPhone:[
            {required:true,message: '手机号码不能为空'},
            {type: 'number', message: '会员卡号必须为数字值'},
            {validator:async (rule, value, callback)=>{
            if((value+"").length == 11){
              let data = await fetch(`/members/isPhoneRepet?memberPhone=${value}`).then(response => response.json())
              if (data) {
                return callback();
              }else{
                return callback(new Error('号码重复'));
              }
            }else{
              return callback(new Error('号码位数不对'));
            }
          }, trigger: 'blur'
        }],
          memberCard:[
          {required:true, message: '会员卡号不能为空'},
          { type: 'number', message: '会员卡号必须为数字值',trigger: 'blur'}]
        },
        //列表用分页
        page:1,
        rows:10,
        curpage:1,
        eachpage:0,
        total:0,
        maxpage:0,
        isTure : true,
        //搜索用分页
        page2:1,
        rows2:10,
        curpage2:1,
        eachpage2:0,
        total2:0,
        maxpage2:0,
        search:{
          name:"memberPhone",
          select:""
        },
        dialogVisible2:false,
        dialogVisible: false,
        list2:[],
        list3:{},
        list:[]
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
        getdialogVisible2(state){
          state.dialogVisible2 = false
        },
       updata(state,parm){
        state.dialogVisible = true
        let a = JSON.stringify(parm)
        state.list3 = JSON.parse(a)
       } ,
       updata_(state,parm){
        state.dialogVisible2 = true
        //处理,避免修改数据的BUG
        let a = JSON.stringify(parm)
        state.list3 = JSON.parse(a)
       } ,
       getData(state,parm){
        state.list=parm.rows;
        state.curpage=parm.curpage;
        state.eachpage=parm.eachpage;
        state.maxpage=parm.maxpage;
        state.total=parm.total;
        state.isTure = false;
       },
       getData2(state,parm){
        state.list2 = parm.rows;
        state.curpage2=parm.curpage;
        state.eachpage2=parm.eachpage;
        state.maxpage2=parm.maxpage;
        state.total2=parm.total;
        state.isTure = false;
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
            fetch("/members", {
              method: "delete",
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify(parm)
            }).then()
        },
        //修改
        async updata2(context,parm){
          context.state.dialogVisible = false
          context.state.dialogVisible2 = false
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






