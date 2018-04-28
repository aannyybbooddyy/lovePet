<template>
<div>
  <el-table
    :data="goodsList"
    style="width: 100%"
    height="800">
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
         <el-button size="small" round  @click="open(scope.row)">修改</el-button>
         <el-button size="small" round @click="delt(scope.row._id)">删除</el-button>
           </template>
    </el-table-column>
  </el-table>

  <el-dialog
              title="提示"
              :visible.sync="centerDialogVisible"
              width="30%"
              center>
              
              <el-form v-model="Add" label-width="80px" >
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
                    action="/goods/upload"
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
                  <el-button type="primary" @click="recompose">点击修改</el-button>
                  <el-button type="primary" @click="close">关闭</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
  </div> 
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "GoodsList",
  
  computed: {
    ...mapState("GoodsStore", ["goodsList","AddList","dialogVisible","centerDialogVisible"])
  },
  methods: {
    ...mapMutations("GoodsStore", ["close","getPet","opens"]),
    ...mapActions("GoodsStore", ["getPet","deleteMethod","recompose","putMethod"]),

        // 打开弹出框
        open(parm){
            this.opens(parm)
        },
      //修改
       async recompose(parm){
       await this.putMethod(parm)
       this.close()
       this.getPet()
      },

      // 删除
    async delt(parm) {
      await this.deleteMethod(parm);
      this.getPet()
    },
    handlePictureCardPreview(file){
      let url = `http://127.0.0.1:3000${file}`.replace("public","").replace(/\\/g,"/")
      this.AddList.goodsImg  = url
    },
    Add(){
      console.log("")
    }
  },
  // 生命周期，页面加载完成
  created() {
    this.getPet();
  }
};
</script>
<style>

</style>