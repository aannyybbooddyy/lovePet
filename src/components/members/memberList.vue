<template>
  <div>
    <el-table
    v-loading="isTure"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.3)"
    :data="list"
    border
    stripe
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="curpage"
      :page-sizes="[10,20,30,40]"
      :page-size="rows"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>


  <div class="box">
    <el-dialog
  title="修改"
  :visible.sync="dialogVisible2"
  width="60%"
  :before-close="getdialogVisible2">
  
  <div style="width:500px;margin:auto">
      <el-form ref="form" :model="list3" label-width="100px">
    <el-form-item label="电话号码">
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
    <el-button @click="getdialogVisible2">取 消</el-button>
    <el-button type="primary" @click="updata3">确 定</el-button>
  </span>
</el-dialog>
  </div>



  </div>
</template>
<script>
import {mapState,mapMutations,mapGetters,mapActions} from "vuex"
export default {
  name:"memberList",

  watch:{
    rows:function(){
      this.getCember()
    },
    page:function(){
      this.getCember()
    },
  },
  computed:{
    ...mapState("MemberStore",["isTure","dialogVisible2","list","list3","page","rows","curpage","eachpage","total","maxpage"]),
  },
  methods:{
    up(parm){
      this.updata_(parm)
    },
    async updata3(){
      await this.updata2()
      this.getCember()
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
      },
    ...mapMutations("MemberStore",["getdialogVisible2","updata_","handleSizeChange","handleCurrentChange"]),
    ...mapActions("MemberStore",["getCember","updata2","delMembers"]),
    del(parm){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning',
           center: true
         }).then(async () => {
          await  this.delMembers(parm)
           this.getCember()
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
    }
  },
 created(){
   this.getCember()
 }
}
</script>
<style>

</style>

