<template>
  <div style="width:500px;margin:auto">
      <el-form ref="form" :model="form" label-width="100px">
    <el-form-item
       :rules="[
        { required: true, message: '年龄不能为空'},
        { type: 'number', message: '年龄必须为数字值'}
       ]"
    label="电话号码">
      <el-input v-model="form.memberPhone"></el-input>
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="form.memberAcount"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名">
      <el-input v-model="form.memberName"></el-input>
    </el-form-item>
     <el-form-item label="送货地址">
      <el-input v-model="form.memberAdd"></el-input>
    </el-form-item>
     <el-form-item label="区域">
      <el-input v-model="form.memberArea"></el-input>
    </el-form-item>
     <el-form-item label="积分">
      <el-input v-model="form.memberPoint"></el-input>
    </el-form-item>
     <el-form-item label="头图">
      
    <el-upload
      class="avatar-uploader"
      action="/members/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="form.memberImg" :src="form.memberImg" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>


    </el-form-item>
     <el-form-item label="拥有的宠物">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <div style="width:200px;margin:auto">
      <el-button @click="resetForm('form')">重置</el-button>
      <el-button @click="add('form')">提交</el-button>
    </div>
  </el-form>
  </div>
</template>
<script>
import {mapState,mapMutations,mapGetters,mapActions} from "vuex"
export default {
  name:"memberAdd",
   computed:{
    ...mapState("MemberStore",["form","total"]),
  },
  methods:{
     ...mapActions("MemberStore",["addCember","getCember"]),
     ...mapMutations("MemberStore",["handleRemove","handlePreview"]),
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
     add(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
        });
       this.addCember()
       this.getCember()
     },
     handleAvatarSuccess(res, file) {
       let url = res.replace("public\\", "").replace("\\","/")
       this.form.memberImg = `http://127.0.0.1:3000/${url}`
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
      }
    }
  }

</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>

