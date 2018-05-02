<template>
<el-tabs type="border-card">
  <el-tab-pane label="店主审核"><userExamine /></el-tab-pane>
  <el-tab-pane label="店主列表"><userList /></el-tab-pane>
  <el-tab-pane label="店主搜索"><userAdd /></el-tab-pane>
</el-tabs>

</template>
<script>
export default {
  name:"user"
}
</script>


<style>
</style>