
const store = {
    namespaced:true,
      state: {
        loginUser:{
          acount:"",
          password:""
        },
        curUser:{},
        loginRule:{
          acount:[{
            validator:async function(rule,value,callback){
              if(value == ""){
                callback(new Error("请输入账号"))
              }else{
                if(!Number.isInteger(value)){
                  callback(new Error('请输入数字值'));
                }else{
                  callback();
                }
              }
            },trigger:'blur'
          }],
          password:[{
            validator:async function(rule,value,callback){
              if(value == ""){
                callback(new Error("请输入密码"))
              }else{
                callback();
              }
            },trigger:'blur'
          }]
        }
      },
      mutations: {
        setType(state,value){
          state.curUser = value;
        }
        
        
      },
      actions:{
        async judgeLoginUserAsync(context,item){
          const loginType = await fetch(`/users/login?acount=${item.acount}&password=${item.password}`).then(Response=>Response.json());
          if(loginType.length==0){
            let typeValue = -1;
            context.commit("setType",typeValue);
          }else{
            // let typeValue = loginType.userType;
            context.commit("setType",loginType);
          }
        }
        
      }
    }
    export {store as default}