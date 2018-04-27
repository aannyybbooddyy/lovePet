<template>
      <el-form ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
  <el-form-item
    label="搜索商品">
    <el-input v-model="search.goodsType" ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="searchGoods">提交</el-button>
    <el-button>重置</el-button>
  </el-form-item>
</el-form>

</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  name:"goodsSearch",
  computed:{
      ...mapState("GoodsStore",["search"])
    },
    methods:{
      ...mapActions("GoodsStore",["getMethod"]),
      searchGoods(){
        this.getMethod();
      }
    }
    
}
</script>

