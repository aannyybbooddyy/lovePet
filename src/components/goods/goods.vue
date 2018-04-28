<template>
  <el-tabs type="border-card">
    <el-tab-pane label="商品列表"><goodsList /></el-tab-pane>
    <el-tab-pane label="商品添加"><goodsAdd /></el-tab-pane>
    <el-tab-pane label="商品查询"><goodsSearch /></el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name:"goods"
}
</script>