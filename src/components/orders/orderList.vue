<template>
<div>
  
  <!-- <el-table
    :data="rows"
    height="250"
    border
    style="width: 100%">
    
    <el-table-column
      prop="orderTime"
      label="订单时间"
      width="180">
    </el-table-column>
        <el-table-column
      prop="users[userAcount]"
      label="卖家"
      width="180">
    </el-table-column>
    <el-table-column
      prop="members[memberAcount]"
      label="买家">
    </el-table-column>
    <el-table-column
      prop="sendAdd"
      label="送货地址">
    </el-table-column>
    <el-table-column
      prop="orderTotal"
      label="订单金额(元)"
      width="180">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button v-popover:popover>详细</el-button>
        <el-popover
          ref="popover"
          placement="right"
          width="400"
          trigger="click">
          <el-table :data="detail">
            <el-table-column width="150" prop="name" label="宝贝名称"></el-table-column>
            <el-table-column width="100" property="type" label="宝贝类型"></el-table-column>
            <el-table-column width="300" property="count" label="购买数量"></el-table-column>
          </el-table>
        </el-popover>

      </template>
    </el-table-column>
  </el-table> -->
  <el-table
    :data="rows"
    highlight-current-row
    @current-change="handleCurrentRowChange"
    style="width:100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item class="half" label="下单时间">
            <span>{{ props.row["orderTime"] }}</span>
          </el-form-item>
          <el-form-item class="half" label="订单总金额">
            <span>{{ props.row["orderTotal"] }}元</span>
          </el-form-item>
          <el-form-item class="half" label="卖家">
            <span>{{ props.row.users["userName"] }}</span>
          </el-form-item>
          <el-form-item class="half" label="卖家ID">
            <span>{{ props.row.users["_id"] }}</span>
          </el-form-item>
          <el-form-item class="half" label="买家">
            <span>{{ props.row.members["memberName"] }}</span>
          </el-form-item>
          <el-form-item class="half" label="买家ID">
            <span>{{ props.row.members["_id"] }}</span>
          </el-form-item>
          <el-form-item class="half" label="收货地址">
            <span>{{ props.row.sendAdd}}</span>
          </el-form-item>
          <el-form-item class="half" label="订单编号">
            <span>{{ props.row._id}}</span>
          </el-form-item>
          <el-form-item class="itemList">
            <el-table class="detailTable"
              border
                :data="props.row.orderDetail"
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
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="宝贝单价"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="total"
                  label="宝贝总价"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="shopAdd"
                  label="服务地址"
                  :formatter="shopAddFormatter">
                </el-table-column>
                
              </el-table>
          </el-form-item>

        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="订单时间"
      prop="orderTime">
    </el-table-column>
    <el-table-column
      label="订单金额"
      prop="orderTotal">
    </el-table-column>
    <el-table-column
      label="卖家"
      prop="users[userAcount]">
    </el-table-column>
    <el-table-column
      label="买家"
      prop="members[memberAcount]">
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      align="center"
      width="150">
      <template slot-scope="scope">
        <el-button icon="el-icon-delete" circle @click="handleDelete(scope.row._id)"></el-button>
        <el-button icon="el-icon-edit" circle @click="handleUpdate(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="curpage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="eachpage"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</div>
  
</template>
<script>
import { mapState,mapMutations,mapActions} from "vuex"
export default {
  name:"orderList",
  computed:{
    ...mapState("OrderStore",["rows","total","curpage","eachpage","maxpage","name","updateInfo","isUpdateDisabled","curTab"])
  },
  watch:{
    curpage:function(){
      this.getOrdersAsync();
    },
    eachpage:function(){
      console.log("重新拉去")
      this.getOrdersAsync();
    }
  },
  methods:{
    ...mapMutations("OrderStore",["getOrders","handleSizeChange","handleCurrentChange","setUpdateInfo","setCurTab","setIsUpdateDisabled"]),
    ...mapActions("OrderStore",["getOrdersAsync","deleteOrdersAsync","getCurUser"]),
    handleDelete:function(orderId){
        this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(
        async  () => {
          await this.deleteOrdersAsync(orderId);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getOrdersAsync();

        }).catch(() => {});
    },
    handleUpdate:function(row){
      this.setUpdateInfo(row);
      this.setCurTab("ordersUpdate");
      this.setIsUpdateDisabled(true);
      },
      handleCurrentRowChange(val) {
        this.currentRow = val;
      }
  },
  created(){
    this.getCurUser();
     this.getOrdersAsync(); 
  },
  data(){
    return {
      rowStyle:{
        textAlign:"center"
      },
      typeFormatter:function(row, column, cellValue, index){
        if(cellValue == "1") return "商品";
        if(cellValue == "2") return "服务";
        return "宠物";
      },
      shopAddFormatter:function(row, column, cellValue, index){
        return cellValue || "无"
      }
    
  }
  }

}
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
  .half{
    width: 50%;
  }
  .itemList{
    width: 100%;
    
  }
  .itemList .el-form-item__content{
    width: 100%;
  }
  .mydiv{
    width: 50%;
    height: 50px;
    float: left;
  }

</style>
