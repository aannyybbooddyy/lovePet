<template>
<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="名称">
    <el-input v-model="formLabelAlign.name"></el-input>
  </el-form-item>
  <el-form-item label="类型">
    <el-input v-model="formLabelAlign.region"></el-input>
  </el-form-item>
  <el-form-item label="制作方法">
    <el-input v-model="formLabelAlign.material"></el-input>
  </el-form-item>
   <el-form-item>
    <el-button type="primary">点击增加</el-button>
    <el-button type="primary" >重置</el-button>
  </el-form-item>
</el-form>

</template>
>
<script>
export default {
  name:"goodsAdd",
  data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    }
}
</script>