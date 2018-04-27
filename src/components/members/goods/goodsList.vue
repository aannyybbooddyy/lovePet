<template>
     <el-table
    :data="goodsList"
    style="width: 100%"
    height="300">
    <el-table-column
      fixed
      prop="goodsName"
      label="名称"
      width="100">
    </el-table-column>
    <el-table-column
      prop="goodsType"
      label="类型"
      width="100">
    </el-table-column>
    <el-table-column
      prop="goodsMaterial"
      label="制作方法"
      width="180">
    </el-table-column>
    <el-table-column
      prop="goodsCanFor"
      label="适用规格"
      width="120">
    </el-table-column>
    <el-table-column
      prop="goodsOnlyFor"
      label="专属规格"
      width="120">
    </el-table-column>
    <el-table-column
      prop="goodsSize"
      label="包装规格"
      width="80">
    </el-table-column>
    <el-table-column
      prop="goodsTaste"
      label="口味"
      width="100">
    </el-table-column>
    <el-table-column
      prop="goodsSpecial"
      label="特殊功用"
      width="300">
    </el-table-column>
    <el-table-column
      prop="goodsRegion"
      label="产地"
      width="120">
    </el-table-column>
    <el-table-column
      prop="goodsDate"
      label="出厂日期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="goodsTime"
      label="保质期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="goodsSupplier"
      label="供应商"
      width="120">
    </el-table-column>
    <el-table-column
      prop="goodsIntro"
      label="特色说明"
      width="300">
    </el-table-column>
    <el-table-column
      prop="goodsPrice"
      label="价格"
      width="100">
    </el-table-column>
    <el-table-column
      prop="number"
      label="数量"
      width="100">
    </el-table-column>
    <el-table-column
      prop="goodsImg"
      label="图片"
      width="120">
    </el-table-column>
     <el-table-column
     class="operations"
     prop="operation"
      label="操作"
      width="200">
     >
       <template slot-scope="scope">
         <el-button size="small" round>修改</el-button>
         <el-button size="small" round>删除</el-button>
           </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "GoodsList",
  computed: {
    ...mapState("GoodsStore", ["goodsList"])
  },
  methods: {
    ...mapActions("GoodsStore", ["getPet"])
  },
  created() {
    this.getPet();
  }
};
</script>
<style>

</style>