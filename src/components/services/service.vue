
<template>
  <el-tabs type="border-card">
  <el-tab-pane label="服务列表"><ServiceList /></el-tab-pane>
  <el-tab-pane label="添加服务"><ServiceAdd /></el-tab-pane>
</el-tabs>
</template>
<script>
export default {
  name:"services"
}
</script>