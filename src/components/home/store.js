
const store = {
namespaced:true,
    state: {
        curUser:{}
    },
    mutations: {
        getCurUser(state){
            let theUser = {};
            theUser = JSON.parse(localStorage.getItem("curUser"));
            state.curUser = theUser;
        }
    
    
    },
    actions:{
    
    
    }
}
export {store as default}