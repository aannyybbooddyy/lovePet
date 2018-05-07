<template>
  <el-tabs type="border-card">
    <el-tab-pane label="宠物列表"><PetList /></el-tab-pane>
    <el-tab-pane label="增加宠物"><PetAdd /></el-tab-pane>
    <el-tab-pane label="搜索宠物"><PetSearch /></el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name:"pet"
}
</script>