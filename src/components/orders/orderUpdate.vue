<template>
  <el-form ref="form" :model="updateInfo" label-width="100px" :rules="rules" >
    <el-form-item label="订单编号" class="half">
      <el-input disabled v-model="updateInfo._id" ></el-input>
    </el-form-item>
    <el-form-item label="订单时间" class="half">
      <el-date-picker
      v-model="updateInfo.orderTime"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>≈
    </el-form-item>
    <el-form-item label="卖家" class="half">
      <el-input disabled v-model="updateInfo['users'].userName" ></el-input>
    </el-form-item>
    <el-form-item label="店铺名称" class="half">
      <el-input disabled v-model="updateInfo['shops'].shopName" ></el-input>
    </el-form-item>
    <el-form-item label="买家" class="half">
      <el-input disabled v-model="updateInfo['members'].memberName" ></el-input>
    </el-form-item>
    <el-form-item  label="收货地址" class="half">
      <el-input  v-model="updateInfo.sendAdd" ></el-input>
    </el-form-item >

    <el-form-item label="订单详情" id="table">
      <el-table class="detailTable"
            show-summary
            :summary-method="getSummaries"
            border
              :data="updateInfo['orderDetail']"
              style="width: 100%">
              <el-table-column
                prop="type"
                label="宝贝类型"
                width="80"
                :formatter="typeFormatter"
                >
              </el-table-column>
              <el-table-column
                prop="id"
                label="宝贝ID"
                width="220">
              </el-table-column>
              <el-table-column
                prop="name"
                label="宝贝名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="count"
                label="宝贝数量"
                width="80">
                <template slot-scope="scope">
        <i class="el-icon-minus" @click="handleMinus(scope.row)"></i>
        {{scope.row.count}}
        <i class="el-icon-plus" @click="handleAdd(scope.row)"></i>
      </template>
              </el-table-column>
              <el-table-column
                prop="price"
                label="宝贝单价"
                width="100">
              </el-table-column>
              <el-table-column
                prop="total"
                label="宝贝总价"
                :formatter="totalFormatter"
                width="100">
              </el-table-column>
              <el-table-column
                prop="shopAdd"
                label="服务地址"
                :formatter="shopAddFormatter">
              </el-table-column>
              
            </el-table>
    </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="onUpdateConfirm">确认修改</el-button>
    <el-button @click="onCancle">取消</el-button>
  </el-form-item>
  </el-form>
  
</template>
<script>
import { mapState,mapMutations,mapActions } from "vuex";
export default {
  name:"orderUpdate",
 computed:{
   ...mapState("OrderStore",["updateInfo"])
 },
    data() {
      return {
          
        typeFormatter:function(row, column, cellValue, index){
          if(cellValue == "1") return "商品";
          if(cellValue == "2") return "服务";
          return "宠物";
        },
        shopAddFormatter:function(row, column, cellValue, index){
          return cellValue || "无"
        },
        totalFormatter:function(row,column,cellValue,index){
          return row.count * row.price;
        },
        rules:{
          address:[
            { required: true, message: '请输入派送地址', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      ...mapMutations("OrderStore",["setUpdateInfo","setCurTab","setIsUpdateDisabled"]),
      ...mapActions("OrderStore",["updateOrderAsync","getOrdersAsync"]),
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleAdd(row){
        row.count += 1;
      },
      handleMinus(row){
        if(row.count == 0) return;
        row.count -= 1;
      },
      getSummaries({data}) {
        let sum = 0;
        for(let i = 0 ; i < this.updateInfo.orderDetail.length ;i++){
          sum += this.updateInfo.orderDetail[i].count * this.updateInfo.orderDetail[i].price;
        }
        this.updateInfo.orderTotal = sum;
        return ["订单总额","","","","",sum];
      },
      updateSendAdd(){
        console.log(this.$refs["inputAddress"].value)
        console.log("in")
      },
      async onUpdateConfirm(){
        await this.updateOrderAsync(this.updateInfo);
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.getOrdersAsync();
      this.setUpdateInfo(
        {
        users:{},
        members:{},
        shops:{},
        orderDetail:[]
      }
      );
      this.setCurTab("ordersList");
      this.setIsUpdateDisabled(false);
      },
      onCancle(){
        this.setUpdateInfo(
        {
        users:{},
        members:{},
        shops:{},
        orderDetail:[]
      }
      );
      this.setCurTab("ordersList");
      this.setIsUpdateDisabled(false);
      }
    }
  }
</script>
<style>
.half{
  width: 50%;
  float: left;
}
#table>.el-form-item__content{
  position: static;
}
</style>

 