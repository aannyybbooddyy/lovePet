<template>
<div>
  <el-table
    :data="checkList.rows"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="店铺名称">
            <span>{{ props.row.shopName}}</span>
          </el-form-item>
          <el-form-item label="执照号码">
            <span>{{ props.row.shopLicenceNum}}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.shopAdd }}</span>
          </el-form-item>
          <el-form-item label="店铺电话">
            <span>{{ props.row.shopTel }}</span>
          </el-form-item>
          <el-form-item label="店主名字">
            <span>{{ props.row.shopCorporate }}</span>
          </el-form-item>
          <el-form-item label="店铺ID">
            <span>{{ props.row._id }}</span>
          </el-form-item>
          <el-form-item label="操作">
            <el-button
              size="mini"
              @click="handlePass(props.row)">通过</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(props.row._id)">删除</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="店主 ID"
      prop="_id">
    </el-table-column>
    <el-table-column
      label="店主名称"
      prop="shopName">
    </el-table-column>
    <el-table-column
      label="电话"
      prop="shopTel">
    </el-table-column>
  </el-table>
  <el-pagination
      style="width: 100%;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="checkList.curpage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="checkList.eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="checkList.total">
    </el-pagination>
</div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "userExamine",
  computed: {
    ...mapState("Check", [
      "checkList"
    ])
  },
  created: function() {
    this.getShopsAsync(this.checkList);
  },
  watch:{
    'checkList.curpage':function(){
      this.getShopsAsync(this.checkList);
    },
    'checkList.eachpage':function(){
      this.getShopsAsync(this.checkList);
    }
  },
  methods: {
    ...mapMutations("Check", ["getUsers","handleSizeChange","handleCurrentChange"]),
    ...mapActions("Check", ["getShopsAsync","getShopkeeperAsync","theUserDeleteAsync","postShopsAsync","postUserToOneAsync"]),
    handlePass: async function(data){
        await this.postShopsAsync(data);
        this.getShopsAsync(this.checkList);
    },
    handleDelete:async function(id){
        await this.theUserDeleteAsync(id);
        this.getShopsAsync(this.checkList);
    }
  }
};
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
  width: 50%;
}
</style>

// check