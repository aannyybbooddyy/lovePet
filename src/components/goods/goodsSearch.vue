<template>
      <el-form ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
  
   <el-input placeholder="请输入内容" v-model="search.goodsType" class="input-with-select">
    <el-select v-model="search.select" slot="prepend" placeholder="请选择" style="width:100px">
      <el-option label="商品类型" value="1"></el-option>
      <!-- <el-option label="订单号" value="2"></el-option>
      <el-option label="用户电话" value="3"></el-option> -->
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
  </el-input>
   <el-table
    :data="search"
    style="width: 100%"
    height="600">
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
      width="100">
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
         <el-button size="small" round @click="delt(scope.row._id)">删除</el-button>
           </template>
    </el-table-column>
  </el-table>
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

