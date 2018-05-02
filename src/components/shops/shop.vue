<template>
<div>
  <el-tabs type="border-card">
  <el-tab-pane label="门店列表"><ShopList /></el-tab-pane>
  <el-tab-pane label="门店添加"><ShopAdd /></el-tab-pane>
  <el-tab-pane label="门店修改"><ShopSearch /></el-tab-pane>
</el-tabs>
</div>

  
</template>
<script>
export default {
  name:"shop"
}
</script>