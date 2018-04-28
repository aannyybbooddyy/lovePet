<template>
  <el-tabs
  :value="curTab"
   type="border-card">
  <el-tab-pane name="ordersList" label="订单列表" :disabled="isUpdateDisabled"><OrderList /></el-tab-pane>
  <el-tab-pane name="ordersUpdate" label="订单修改" :disabled="!isUpdateDisabled"><OrderUpdate /></el-tab-pane>
  <el-tab-pane label="订单查询"><OrderSearch /></el-tab-pane>
</el-tabs>
</template>
<script>
import { mapState } from "vuex"
export default {
  name:"goods",
  computed:{
    ...mapState("OrderStore",["curTab","isUpdateDisabled"])
  }
}
</script>
<style>
.el-tabs__content{
  /* height: 550px;; */
}
</style>
