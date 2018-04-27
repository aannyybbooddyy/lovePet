<template>
  <el-tabs type="border-card">
  <el-tab-pane label="订单列表"><OrderList /></el-tab-pane>
  <el-tab-pane label="订单添加"><OrderAdd /></el-tab-pane>
  <el-tab-pane label="订单查询"><OrderSearch /></el-tab-pane>
</el-tabs>
</template>
<script>
export default {
  name:"goods"
}
</script>