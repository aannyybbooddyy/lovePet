<template>
<div style="width:600px;margin:auto">
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
  <!-- <el-form-item label="图片">
    <el-input v-model="AddList.goodsImg"></el-input>
  </el-form-item> -->
    <el-form-item label="上传图片">
      <el-upload
        action="/express/img"
        list-type="picture-card"
        multiple
        >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>
   <el-form-item>
    <el-button type="primary" @click="add">点击增加</el-button>
    <el-button type="primary" >重置</el-button>
  </el-form-item>
</el-form>
</div>
</template>
>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name:"goodsAdd",
   data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
   computed: {
    ...mapState("GoodsStore", ["AddList"])
  },
  methods: {
    add(){
     this.addGoods();
     },
    ...mapActions("GoodsStore", ["addGoods"])
  },
}
</script>

<style>
.picture{
  width:200px;
  height:100px;
}
</style>