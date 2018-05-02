const store = {
    namespaced:true,
    state: {
        checkList:{
            curpage: 1,
            eachpage: 5,
            maxpage: 0,
            total: 0,
            rows: []
        }
    },
    mutations: {
        getShops(state, { curpage, eachpage, maxpage, rows, total }) {
            state.checkList.curpage = curpage;
            state.checkList.eachpage = eachpage;
            state.checkList.maxpage = maxpage;
            state.checkList.total = total;
            let len = rows.length;
            state.checkList.rows.splice(0);
            for (let i = 0; i < len; i++) {
                state.checkList.rows.push(rows[i]);
            }
        },
        handleSizeChange(state, eachpage) {
            state.checkList.eachpage = eachpage
        },
        handleCurrentChange(state, curpage) {
            state.checkList.curpage = curpage;
        },
    
    },
    actions:{
    // 获取未通过验证的店铺
    async getShopsAsync(context,state) {
        const data = await fetch(`/users/shops?page=${state.curpage}&rows=${state.eachpage}`).then(response => response.json());
        context.commit("getShops", data);
    },
    
    }
}
export {store as default}