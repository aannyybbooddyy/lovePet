<template>
    <div>
      <el-input placeholder="请输入内容" v-model="search.select" class="input-with-select">
        <el-select style="width:149px" v-model="search.name" slot="prepend">
          <el-option label="电话号码" value="memberPhone"></el-option>
          <el-option label="昵称" value="memberAcount"></el-option>
          <el-option label="会员卡号" value="memberCard"></el-option>
          <el-option label="真实姓名" value="memberName"></el-option>
        </el-select>
        <el-button slot="append" @click="searchMembers" icon="el-icon-search"></el-button>
      </el-input>
    <div>

    <el-table
    v-loading="isTure"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
    :data="list2"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="memberPhone"
      label="电话号码"
      width="150">
    </el-table-column>
    <el-table-column
      prop="memberAcount"
      label="昵称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="memberCard"
      label="会员卡号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="memberPet"
      label="拥有的宠物"
      width="120">
    </el-table-column>
    <el-table-column
      prop="memberPoint"
      label="积分"
      width="80">
    </el-table-column>
    <el-table-column
      prop="memberName"
      label="真实姓名"
      width="120">
    </el-table-column>
    <el-table-column
      label="头像"
      width="70">
       <template slot-scope="scope">
         <img v-if="scope.row.memberImg" :src="scope.row.memberImg" style="width:50px;height:50px"/>
         <img v-else src="img/touxiang.png" style="width:50px;height:50px"/>
       </template>
    </el-table-column>
    <el-table-column
      prop="memberAdd"
      label="送货地址">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button
        type="text"
         @click="up(scope.row)"
        size="small">修改</el-button>
        <el-button
        type="text"
        @click="del(scope.row)"
        size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="block" style="width:800px;margin:auto">
    <el-pagination
      @size-change="handleSizeChange2"
      @current-change="handleCurrentChange2"
      :current-page="curpage2"
      :page-sizes="[10,20,30,40]"
      :page-size="rows2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total2">
    </el-pagination>
  </div>
  </div>

<el-dialog
  title="修改"
  :visible.sync="dialogVisible"
  width="60%"
  :before-close="getdialogVisible">
  
  <div style="width:500px;margin:auto">
      <el-form ref="form" :model="list3" label-width="100px">
    <el-form-item
       :rules="[
        { required: true, message: '年龄不能为空'},
        { type: 'number', message: '年龄必须为数字值'}
       ]"
    label="电话号码">
      <el-input v-model="list3.memberPhone"></el-input>
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="list3.memberAcount"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名">
      <el-input v-model="list3.memberName"></el-input>
    </el-form-item>
     <el-form-item label="送货地址">
      <el-input v-model="list3.memberAdd"></el-input>
    </el-form-item>
     <el-form-item label="区域">
      <el-input v-model="list3.memberArea"></el-input>
    </el-form-item>
     <el-form-item label="积分">
      <el-input v-model="list3.memberPoint"></el-input>
    </el-form-item>
     <el-form-item label="头图">
      
    <el-upload
      class="avatar-uploader"
      action="/members/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="list3.memberImg" :src="list3.memberImg" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    </el-form-item>
     <el-form-item label="拥有的宠物">
      <el-input v-model="list3.memberPet"></el-input>
    </el-form-item>
  </el-form>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="getdialogVisible">取 消</el-button>
    <el-button type="primary" @click="updata3">确 定</el-button>
  </span>
</el-dialog>


  </div>
</template>
<script>
import {mapState,mapMutations,mapGetters,mapActions} from "vuex"
export default {
  name:"memberSearch",
    watch:{
    rows2:function(){
      this.searchMembers()
    },
    page2:function(){
      this.searchMembers()
    }
  },
    computed:{
     ...mapState("MemberStore",["list3","dialogVisible","isTure","list2","page2","rows2","curpage2","eachpage2","total2","maxpage2","search"]),
  },
    methods:{
      up(parm){
      this.updata(parm)
    },
    async updata3(){
      await this.updata2()
      this.searchMembers()
    },
     handleAvatarSuccess(res, file) {
       let url = res.replace("public\\", "").replace("\\","/")
       this.list3.memberImg = `http://127.0.0.1:3000/${url}`
       this.getCember()
      },
     beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },    del(parm){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning',
           center: true
         }).then(async () => {
           await this.delMembers(parm._id)
           await this.searchMembers()
           this.$message({
             type: 'success',
             message: '删除成功!'
           });
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消删除'
           });
         });
    },
    ...mapMutations("MemberStore",["getdialogVisible","updata","handleSizeChange2","handleCurrentChange2"]),
    ...mapActions("MemberStore",["searchMembers","updata2","delMembers","getCember"])
  }
}
</script>