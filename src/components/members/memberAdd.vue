<template>
  <div style="width:500px;margin:auto">
    <el-form ref="form" status-icon :rules="rules" :model="form" label-width="100px"  class="demo-ruleForm">
    <el-form-item prop="memberPhone" label="电话号码">
      <el-input type="memberPhone"  auto-complete="off" v-model.number="form.memberPhone"></el-input>
    </el-form-item>
    <el-form-item prop="memberAcount" label="昵称">
      <el-input v-model="form.memberAcount"></el-input>
    </el-form-item>
    <el-form-item prop="memberName" label="真实姓名">
      <el-input v-model="form.memberName"></el-input>
    </el-form-item>
    <el-form-item prop="memberCard" label="会员卡号">
      <el-input v-model.number="form.memberCard"></el-input>
    </el-form-item>
     <el-form-item prop="memberAdd" label="送货地址">
      <el-input v-model="form.memberAdd"></el-input>
    </el-form-item>
     <el-form-item prop="memberArea" label="区域">
      <el-input v-model="form.memberArea"></el-input>
    </el-form-item>
     <el-form-item prop="memberPoint" label="积分">
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
      <el-input v-model="form.memberPet"></el-input>
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
    ...mapState("MemberStore",["form","total","rules","ip"]),
  },
  methods:{
     ...mapActions("MemberStore",["addCember","getCember"]),
     ...mapMutations("MemberStore",["handleRemove","handlePreview"]),
      resetForm(form) {
        this.$refs[form].resetFields();
      },
      validatePass(rule, value, callback){
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      },
     add(form){
          this.$refs[form].validate(async (valid) => {
          if (valid) {   
          await this.addCember()
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                      });
                    this.$refs[form].resetFields();
                    this.getCember()
            } else {
              this.$message({
                  message: '取消添加',
                  type: 'warning'
                });
              return false;
            }
        });
 
     },

     handleAvatarSuccess(res, file) {
       console.log(res)
       let url = res.replace("public\\", "").replace("\\","/")
       this.form.memberImg = `http://${this.ip}:3000/${url}`
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

