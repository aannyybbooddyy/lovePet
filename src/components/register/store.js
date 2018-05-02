
const store = {
    namespaced:true,
      state: {
        userMsg:{
          userAcount:"",
          userPwd:"",
          checkPwd:"",
          userPhone:"",
          userMail:"",
          userName:"",
          userType:0
        },
        fromRule:{
          userAcount: [
            { validator: async function(rule, value, callback){
              if(value===''){
                callback(new Error("请输入账号"))
              }else{
                if (!Number.isInteger(value)) {
                  callback(new Error('请输入数字值'));
                } else {
                  if(value.toString().split("").length<6||value.toString().split("").length>13){
                    callback(new Error('请输入6-13位数字账号'))
                  }else{
                    const theValue = await fetch(`/users/regAcount?value=${value}`).then(response => response.json());
                    if(theValue.length==0){
                      callback()
                    }else{
                      if(theValue.userAcount == value){
                        callback(new Error('已经有一样的账号了傻逼'))
                      }else{
                        callback()
                      }
                    }
                  }
                }
              }
            }, trigger: 'blur'}
          ],
          userPwd:[
            { validator:function(rule, value, callback){
              if (value === '') {
                callback(new Error('请输入密码'));
              } else {
                if(value.split("").length<6||value.split("").length>16){
                  callback(new Error('请输入6-16位密码'))
                }else{
                  callback();
                }
              }
            } , trigger: 'blur' }
          ],
          checkPwd:[
            {
              validator:function(rule, value, callback){
                if(value==""){
                  callback(new Error('两次密码不一致！'))
                }else{
                  if(value != document.getElementById("p").value){
                    callback(new Error('两次密码不一致！'))
                  }else{
                    callback();
                  }
                }
              },trigger:"blur"
            }
          ],
          userPhone:[
            {validator:function(rule,value,callback){
              if(value==""){
                callback(new Error('请输入手机号'))
              }else{
                let re = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
                if(!re.test(value)){
                  callback(new Error('请输入可用的手机号'))
                }else{
                  callback();
                }
              }
            },trigger:'blur'}
          ],
          userMail:[
            {validator:function(rule,value,callback){
              if(value==""){
                callback(new Error('请输入邮箱'))
              }else{
                let re = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,9})+$/;
                if(!re.test(value)){
                  callback(new Error('请输入可用的邮箱'))
                }else{
                  callback();
                }
              }
            },trigger:'blur'}
          ],
          userName:[
            {validator:function(rule,value,callback){
              if(value==""){
                callback(new Error("请输入姓名"))
              }else{
                if(value.split("").length<2||value.split("").length>6){
                  callback(new Error("请输入2-6位昵称"))
                }else{
                  callback()
                }
              }
            },trigger:'blur'}
          ]



        }
      },
      mutations: {
         
      },
      actions:{
        async saveUserAsync(context,item){
          console.log(item,"item");
            await fetch('/users/addUser', {
              method: "POST",
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: `userAcount=${item.userAcount}&userMail=${item.userMail}&userName=${item.userName}&userPhone=${item.userPhone}&userPwd=${item.userPwd}&userType=${item.userType}`
            })
        }
      }
    }
    export {store as default}