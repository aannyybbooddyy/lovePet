<template>
<div>
  <el-table
    :data="list.rows"
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
            <span style="color:green">已通过</span>
          </el-form-item>
          <el-form-item label="店主描述">
            <span>{{ props.row._id }}</span>
          </el-form-item>
          <el-form-item label="操作">
            <el-button
              size="mini"
              @click="openWindow(props.row)"
              >修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteShopkeeper(props.row._id)"
              >删除</el-button>
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
      @size-change="listSizeChange"
      @current-change="listCurrentChange"
      :current-page="list.curpage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="list.eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="list.total">
    </el-pagination>
    <el-dialog title="修改店主信息" :visible.sync="dialogFormVisible">
      <el-form :model="dialogItem">
        <el-form-item label="店主账号" label-width="120px">
          <el-input v-model="dialogItem.userAcount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="店主密码" label-width="120px">
          <el-input v-model="dialogItem.userPwd" auto-complete="off"></el-input>          
        </el-form-item>
        <el-form-item label="店主昵称" label-width="120px">
          <el-input v-model="dialogItem.userName" auto-complete="off"></el-input>          
        </el-form-item>
        <el-form-item label="店主邮箱" label-width="120px">
          <el-input v-model="dialogItem.userMail" auto-complete="off"></el-input>          
        </el-form-item>
        <el-form-item label="店主电话" label-width="120px">
          <el-input v-model="dialogItem.userPhone" auto-complete="off"></el-input>          
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="modification(dialogItem)">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "userList",
  data(){
    return {
      dialogFormVisible: false,
      dialogItem:[]
    }
  },
  computed: {
    ...mapState("UserStore", ["list"])
  },
  watch: {
    "list.curpage": function() {
      this.getShopkeeperAsync(this.list);
    },
    "list.eachpage": function() {
      this.getShopkeeperAsync(this.list);
    }
  },
  created: function() {
    this.getShopkeeperAsync(this.list);
  },
  methods: {
    ...mapMutations("UserStore", [
      "getUsers",
      "listSizeChange",
      "listCurrentChange"
    ]),
    ...mapActions("UserStore", [
      "getShopkeeperAsync",
      "theShopkeeperDeleteAsync",
      "modificationAsync"
    ]),
    deleteShopkeeper: async function(id) {
      await this.theShopkeeperDeleteAsync(id);
      this.getShopkeeperAsync(this.list);
    },
    openWindow:function(item){
      this.dialogFormVisible = true;
      this.dialogItem = item;
    },
    modification:async function(item){
      await this.modificationAsync(item)
      this.dialogFormVisible = false
      await this.getShopkeeperAsync(this.list);
    }
  }
};
</script>