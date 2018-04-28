<template>
<div>


  <el-form ref="form" :model="form" label-width="100px">
    <div>
      <el-switch
      class="switch"
        v-model="searchType"
        @change="typeChange"
        active-text="按订单ID查询"
        inactive-text="按字段查询">
      </el-switch>
    </div>
    
    <div v-if="searchType" class="item">

      <el-form-item  label="订单ID">
        <el-input type="text" v-model="form.orderId" ></el-input>
      </el-form-item>
    </div>
    <div v-else>

      <div class="item">

        <el-form-item 
        label="订单总额"
        prop="total"

        >
          <el-input v-model.number="form.orderTotal" ></el-input>
          <!-- <el-input type="number" v-model.number="form.orderTotal" auto-complete="off"></el-input> -->
        </el-form-item>
      </div>
      <div class="item">
      <el-form-item label="订单状态">
        <el-radio-group v-model="form.orderStatus">
          <el-radio label=1>已付款</el-radio>
          <el-radio label=2>未付款</el-radio>
        </el-radio-group>
      </el-form-item>
      </div>
      
      <div class="item">

        <el-form-item  label="买家ID">
          <el-input v-model="form.memberId"></el-input>
        </el-form-item>
      </div>
      <div class="item">

        <el-form-item label="收货地址">
          <el-input v-model="form.sendAdd" ></el-input>
        </el-form-item>
      </div>
    </div>
    <div>
      <el-form-item class="item">
        <el-button type="primary" @click="onSubmit">开始查询</el-button>
        <el-button @click="onReset('form')">取消</el-button>
      </el-form-item>
    </div>
  </el-form>
  <el-table
    :data="searchRows"
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
     
  </el-table>
  <el-pagination
    @size-change="handleSearchSizeChange"
    @current-change="handleSearchCurrentChange"
    :current-page="searchCurPage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="searchEachPage"
    layout="total, sizes, prev, pager, next, jumper"
    :total="searchTotal">
  </el-pagination>
</div>
<!-- 平台管理员：通过订单id、手机号、收货地址、用户id、宠主id、订单总额、订单状态、 -->
</template>
<script>
import { mapActions, mapState, mapMutations} from "vuex";
export default {
  name: "orderSearch",
  computed:{
    ...mapState("OrderStore",["searchRows","searchCurPage","searchEachPage","searchMaxPage","searchTotal"])
  },
  watch:{
    searchEachPage:function(){
      this.getSearchOrdersAsync();
    },
    searchCurPage:function(){
      this.getSearchOrdersAsync();
    }
  },
  methods: {
    ...mapMutations("OrderStore",["setSearchType","handleSearchCurrentChange","handleSearchSizeChange"]),
    ...mapActions("OrderStore", ["getSearchOrderAsync"]),
    onSubmit() {
      console.log("this.form",this.form)
      this.getSearchOrderAsync([this.form,this.searchType]);
    },
    onReset(formName){
      this.$refs[formName].resetFields();
      // this.form.resetFields();
    },
    typeChange(type){
      this.form.orderId = "";
      this.form.orderTotal = "";
      this.form.orderStatus = "";
      this.form.memberId = "";
      this.form.userId = "";
      this.form.sendAdd = "";
      this.setSearchType(this.searchType);
      console.log(this.searchType);
    },
    handleCurrentRowChange(val) {
        this.currentRow = val;
      }
  },

  data() {
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
      },
      form: {
        orderId: "",
        orderTotal: "",
        orderStatus: "",
        memberId: "",
        sendAdd: ""
      },
      rules:{
        total:[{ type: 'number', message: '总额必须为数字值'}],
      },
      searchType:false
    };
  },
};
</script>
<style>
.item {
  width: 40%;
  float: left;
  margin-right: 100px;
}
.switch {
  justify-content: center;
  width: 20%;
  height: 50px;
  margin-left: 40%;
}
</style>
