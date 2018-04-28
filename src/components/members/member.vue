<template>
  <el-tabs type="border-card">
    <el-tab-pane label="宠主添加"><MemberAdd /></el-tab-pane>
    <el-tab-pane label="宠主列表"><MemberList /></el-tab-pane>
    <el-tab-pane label="搜索宠主"><MemberSearch /></el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name:"member"
}
</script>
