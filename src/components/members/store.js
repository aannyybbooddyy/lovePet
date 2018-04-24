

const store = {
    namespaced:true, 
      state: { //数据
        count:0
      },
      mutations: { //方法
       add(state){
         console.log("添加")
       }
        
        
      },
      getters:{ //计算属性

      },
      actions:{  //异步处理
      
        
      }
    }
    export {store as default}