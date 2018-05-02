<template>
  <div style="width:500px;margin:auto">
    <el-form ref="form" :model="form" label-width="100px">
        <!-- <el-form-item label="用户">
          <el-input v-model="form.userId"></el-input>
        </el-form-item> -->
        <el-form-item label="品种">
          <el-input v-model="form.petVarieties"></el-input>
        </el-form-item>
        <el-form-item label="毛长">
          <el-input v-model="form.petHair"></el-input>
        </el-form-item>
        <el-form-item label="体型">
          <el-input v-model="form.petShape"></el-input>
        </el-form-item>
        <el-form-item label="颜色">
          <el-input v-model="form.petColor"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.petPrice"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.petGender"></el-input>
        </el-form-item>
        <el-form-item label="是否疫苗">
          <el-input v-model="form.petQuarantine"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.petAge"></el-input>
        </el-form-item>
        <el-form-item label="性格">
          <el-input v-model="form.petCharacter"></el-input>
        </el-form-item>

        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="/pet/upload"
            multiple
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.petImg" :src="form.petImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

      <div style="width:200px;margin:auto">
        <el-button @click="resetForm('form')">取消</el-button>
        <el-button @click="add('form')">提交</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import {mapState,mapMutations,mapGetters,mapActions} from "vuex"
export default {
  name:"petAdd",
   computed:{
    ...mapState("PetStore",["form","total","ip"]),
    ...mapState("MemberStore",["ip"])
  },
  methods:{
    ...mapActions("PetStore",["addPet","getPet"]),
    ...mapMutations("PetStore",["handleRemove","handlePreview"]),
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    add(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("成功")
        } else {
            console.log('错误');
          return false;
        }
      });
      this.addPet()
      this.getPet()
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      let url=res.replace("public\\","").replace("\\","/")
      this.form.petImg=`http://${this.ip}:3000/${url}`
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