

const store = {
    namespaced:true, 
      state: { //数据
        form:{
          petVarieties:"",
          petHair:"",
          petShape:"",
          petColor:"",
          petPrice:"",
          petGender:"",
          petQuarantine:"",
          petAge:"",
          petCharacter:"",
          petImg:"",
          // userId:"",
        },
        //列表
        page:1,
        rows:10,
        curpage:1,
        eachpage:0,
        total:0,
        maxpage:0,
        //搜索
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
        dialogFormVisible: false,
        dialogFormVisible2: false,
        isTure : true,
        list2:[],
        list3:[],
        list:[
          {     
            petVarieties:"博美",
            petHair:"短毛",
            petShape:"小型",
            petColor:"白色",
            petPrice:"2000",
            petGender:"female",
            petQuarantine:"是",
            petAge:"5个月",
            petCharacter:"温柔可爱"
          },
          {     
            petVarieties:"柴犬",
            petHair:"短毛",
            petShape:"大型",
            petColor:"棕色",
            petPrice:"5000",
            petGender:"male",
            petQuarantine:"否",
            petAge:"2个月",
            petCharacter:"好动,粘人,精力旺盛"
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
        handleSizeChange2(state,parm) {
          state.rows2 = parm
        },
        handleCurrentChange2(state,parm) {
          state.page2 = parm
        },
        //列表
        getdialogVisible(state){
          state.dialogFormVisible  = false
        },
        //搜索
         getdialogVisible2(state){
          state.dialogFormVisible2  = false
        },
        //列表
        updataTodo(state,parm){
          state.dialogFormVisible  = true
          let a = JSON.stringify(parm)
          state.list3 = JSON.parse(a)
        },
        //搜索
        updataTodoSearch(state,parm){
          state.dialogFormVisible2  = true
          let a = JSON.stringify(parm)
          state.list3 = JSON.parse(a)
        },
        //列表
        getData(state,parm){
          state.list=parm.rows;
          state.curpage=parm.curpage;
          state.eachpage=parm.eachpage;
          state.maxpage=parm.maxpage;
          state.total=parm.total;
          state.isTure = false;
        },
        //搜索
        getData2(state,parm){
          state.list2 = parm.rows;
          state.curpage2 = parm.curpage;
          state.eachpage2=parm.eachpage;
          state.maxpage2=parm.maxpage;
          state.total2=parm.total;
          state.isTure = false;
        },
      },
      getters:{ //计算属性

      },
      actions:{  //异步处理
        //获取数据
        async getPet(context){
          let {page,rows} = this.state.PetStore
          const data = await fetch(`/pet?page=${page}&rows=${rows}`).then(response => response.json())
          console.log(data)
          context.commit("getData",data)
        },
        //增加数据
        async addPet(context){
          let form = this.state.PetStore.form
          console.log("进入添加")
          console.log(form)
          await fetch(`/pet`,{
            method:"POST",
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:`petVarieties=${form.petVarieties}&petHair=${form.petHair}&petShape=${form.petShape}&petColor=${form.petColor}&petPrice=${form.petPrice}&petGender=${form.petGender}&petQuarantine=${form.petQuarantine}&petAge=${form.petAge}&petCharacter=${form.petCharacter}&petImg=${form.petImg}&userId=${form.userId}`
          })
        },
        //搜索数据
        async searchPet(context){
          let page = this.state.PetStore.page2
          let rows = this.state.PetStore.rows2
          let {name,select} = this.state.PetStore.search
          console.log("+++:"+name)
          console.log("---:"+select)
          const data = await fetch(`/pet?page=${page}&rows=${rows}&name=${name}&select=${select}`).then(response => response.json())
          console.log(data)
          context.commit("getData2",data)
        },
        //删除
        async delPet(context,parm){
          await fetch("/pet", {
            method: "delete",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body:'id='+parm
          })
        },
        //修改
        async updataPet(context,parm){
          context.state.dialogFormVisible  = false
          context.state.dialogFormVisible2  = false
          let list3=context.state.list3
          await fetch("/pet", {
            method: "put",
            headers: {
              // "Content-Type": "application/x-www-form-urlencoded"
              "Content-Type": 'application/json'
            },
            // body:`petVarieties=${list3.petVarieties}&petHair=${list3.petHair}&petShape=${list3.petShape}&petColor=${list3.petColor}&petPrice=${list3.petPrice}&petGender=${list3.petGender}&petQuarantine=${list3.petQuarantine}&petAge=${list3.petAge}&petCharacter=${list3.petCharacter}&petImg=${list3.petImg}&userId=${list3.userId}`
            body:JSON.stringify(list3)
          })
        },
      }
    }
    export {store as default}






