

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
        },
        page:1,
        rows:10,
        curpage:1,
        eachpage:0,
        total:0,
        maxpage:0,
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
        list2:[],
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
        getData(state,parm){
          this.state.PetStore.list=parm.rows;
          this.state.PetStore.curpage=parm.curpage;
          this.state.PetStore.eachpage=parm.eachpage;
          this.state.PetStore.maxpage=parm.maxpage;
          this.state.PetStore.total=parm.total;
        },
        getData2(state,parm){
          state.list2 = parm.rows;
          state.curpage2 = parm.curpage;
          state.eachpage2=parm.eachpage;
          state.maxpage2=parm.maxpage;
          state.total2=parm.total;
        }
      },
      getters:{ //计算属性

      },
      actions:{  //异步处理
        //获取数据
        async getPet(context){
          let {page,rows} = this.state.PetStore
          const data = await fetch(`/pet`).then(response => response.json())
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
            body:`petVarieties=${form.petVarieties}&petHair=${form.petHair}&petShape=${form.petShape}&petColor=${form.petColor}&petPrice=${form.petPrice}&petGender=${form.petGender}&petQuarantine=${form.petQuarantine}&petAge=${form.petAge}&petCharacter=${form.petCharacter}`
          })
        },
        //搜索数据
        async searchPet(context){
          let {page,rows} = this.state.PetStore
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
      }
    }
    export {store as default}






