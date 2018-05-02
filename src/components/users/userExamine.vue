<template>
<div>
  <el-table
    :data="examine.rows"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="店主名称">
            <span>{{ props.row.userName}}</span>
          </el-form-item>
          <el-form-item label="店主邮箱">
            <span>{{ props.row.userMail}}</span>
          </el-form-item>
          <el-form-item label="店主账号">
            <span>{{ props.row.userAcount }}</span>
          </el-form-item>
          <el-form-item label="店主电话">
            <span>{{ props.row.userPhone }}</span>
          </el-form-item>
          <el-form-item label="店主密码">
            <span>{{ props.row.userPwd }}</span>
          </el-form-item>
          <el-form-item label="店主权限">
            <span>{{ props.row.userType }}</span>
          </el-form-item>
          <el-form-item label="店主ID">
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
      prop="userName">
    </el-table-column>
    <el-table-column
      label="电话"
      prop="userPhone">
    </el-table-column>
  </el-table>
  <el-pagination
      style="width: 100%;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="examine.curpage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="examine.eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="examine.total">
    </el-pagination>
</div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "userExamine",
  computed: {
    ...mapState("UserStore", [
      "examine",
      "list"
    ])
  },
  created: function() {
    this.getUsersAsync(this.examine);
  },
  watch:{
    'examine.curpage':function(){
      this.getUsersAsync(this.examine);
    },
    'examine.eachpage':function(){
      this.getUsersAsync(this.examine);
    }
  },
  methods: {
    ...mapMutations("UserStore", ["getUsers","handleSizeChange","handleCurrentChange"]),
    ...mapActions("UserStore", ["getUsersAsync","getShopkeeperAsync","theUserDeleteAsync","getUsersTypeAsync","postUserToOneAsync"]),
    handlePass: async function(data){
        await this.postUserToOneAsync(data);
        this.getUsersAsync(this.examine);
        this.getShopkeeperAsync(this.list);
    },
    handleDelete:async function(id){
        await this.theUserDeleteAsync(id);
        this.getUsersAsync(this.examine);
        this.getShopkeeperAsync(this.list);
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