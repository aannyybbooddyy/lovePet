<template>
<el-form  label-width="80px" >
  <el-form-item label="名称">
    <el-input v-model="AddList.goodsName"></el-input>
  </el-form-item>
  <el-form-item label="类型">
    <el-input v-model="AddList.goodsType"></el-input>
  </el-form-item>
  <el-form-item label="制作方法">
    <el-input v-model="AddList.goodsMaterial"></el-input>
  </el-form-item>
   <el-form-item>
    <el-button type="primary" @click="add">点击增加</el-button>
    <el-button type="primary" >重置</el-button>
  </el-form-item>
</el-form>

</template>
>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name:"goodsAdd",
   computed: {
    ...mapState("GoodsStore", ["AddList"])
  },
  methods: {
    add(){
      console.log("213")
     }
    // ...mapActions("GoodsStore", ["getPet"])
  },
}
</script>