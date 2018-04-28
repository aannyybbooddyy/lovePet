<template>
<div style="width:600px;margin:auto">
  <el-form v-model="AddList"  label-width="80px" >
  <el-form-item label="名称">
    <el-input v-model="AddList.goodsName"></el-input>
  </el-form-item>
  <el-form-item label="类型">
    <el-input v-model="AddList.goodsType"></el-input>
  </el-form-item>
  <el-form-item label="制作方法">
    <el-input v-model="AddList.goodsMaterial"></el-input>
  </el-form-item>
  <el-form-item label="适用规格">
    <el-input v-model="AddList.goodsCanFor"></el-input>
  </el-form-item>
  <el-form-item label="专属规格">
    <el-input v-model="AddList.goodsOnlyFor"></el-input>
  </el-form-item>
  <el-form-item label="包装规格">
    <el-input v-model="AddList.goodsSize"></el-input>
  </el-form-item>
  <el-form-item label="口味">
    <el-input v-model="AddList.goodsTaste"></el-input>
  </el-form-item>
  <el-form-item label="特殊功用">
    <el-input v-model="AddList.goodsSpecial"></el-input>
  </el-form-item>
  <el-form-item label="产地">
    <el-input v-model="AddList.goodsRegion"></el-input>
  </el-form-item>
  <el-form-item label="出厂日期">
    <el-input v-model="AddList.goodsDate"></el-input>
  </el-form-item>
  <el-form-item label="保质期">
    <el-input v-model="AddList.goodsTime"></el-input>
  </el-form-item>
  <el-form-item label="供应商">
    <el-input v-model="AddList.goodsSupplier"></el-input>
  </el-form-item>
  <el-form-item label="特色说明">
    <el-input v-model="AddList.goodsIntro"></el-input>
  </el-form-item>
  <el-form-item label="价格">
    <el-input v-model="AddList.goodsPrice"></el-input>
  </el-form-item>
  <el-form-item label="数量">
    <el-input v-model="AddList.number"></el-input>
  </el-form-item>
  <el-form-item label="上传图片">
    <el-upload
      action="/members/upload"
      list-type="picture-card"
      :on-success="handlePictureCardPreview"
      >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%"  alt="">
    </el-dialog>
  </el-form-item>
   
   <el-form-item>
    <el-button type="primary" @click="add">点击增加</el-button>
    <el-button type="primary">重置</el-button>
  </el-form-item>
</el-form>
</div>
</template>
>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name:"goodsAdd",
   
    
   computed: {
    ...mapState("GoodsStore", ["AddList","dialogVisible"])
  },
  methods: {
    async add(){
     await this.addGoods();
     console.log("AddList:",this.AddList)
      this.getPet()
      this.AddList.goodsName = ''
      this.AddList.goodsType = ''
      this.AddList.goodsMaterial = ''
      this.AddList.goodsCanFor = ''
      this.AddList.goodsOnlyFor = ''
      this.AddList.goodsSize = ''
      this.AddList.goodsTaste = ''
      this.AddList.goodsSpecial = ''
      this.AddList.goodsRegion = ''
      this.AddList.goodsDate = ''
      this.AddList.goodsTime = ''
      this.AddList.goodsSupplier = ''
      this.AddList.goodsIntro = ''
      this.AddList.goodsPrice = ''
      this.AddList.number = ''
      this.AddList.goodsImg = ''
     },
    //  ...mapMutations("GoodsStore",["reset"]),
    ...mapActions("GoodsStore", ["addGoods","getPet"]),
    handlePictureCardPreview(file){
      let url = `http://127.0.0.1:3000${file}`.replace("public","").replace(/\\/g,"/")
      this.AddList.goodsImg  = url
    }
  },
}
</script>

<style>
.picture{
  width:200px;
  height:100px;
}
</style>