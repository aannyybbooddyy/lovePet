<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"  style="width: 650px" class="demo-ruleForm">
  <el-form-item label="门店名称" prop="shopName">
    <el-input v-model="ruleForm.shopName"></el-input>
  </el-form-item>
    <el-form-item label="营业执照号" prop="shopLicenceNum">
    <el-input v-model="ruleForm.shopLicenceNum"></el-input>
  </el-form-item>
    <el-form-item label="营业地址" prop="shopAdd">
    <el-input v-model="ruleForm.shopAdd"></el-input>
  </el-form-item>
    <el-form-item label="法人" prop="shopCorporate">
    <el-input v-model="ruleForm.shopCorporate"></el-input>
  </el-form-item>
    <el-form-item label="联系电话" prop="shopTel">
    <el-input v-model="ruleForm.shopTel"></el-input>
  </el-form-item>
  <el-form-item label="特色" prop="shopFeature">
    <el-checkbox-group v-model="ruleForm.shopFeature">
      <el-checkbox label="线上活动" name="shopFeature"></el-checkbox>
      <el-checkbox label="地推活动" name="shopFeature"></el-checkbox>
      <el-checkbox label="线下主题活动" name="shopFeature"></el-checkbox>
      <el-checkbox label="单纯品牌曝光" name="shopFeature"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item label="店铺图标" prop="shopImg">
  <el-upload
  class="avatar-uploader"
  action="shops/upload"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="ruleForm.shopImg" :src="ruleForm.shopImg" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
 </el-form-item>
  <el-form-item label="营业执照图" prop="lmicenceImg">
  <el-upload
  class="avatar-uploader"
  action="shops/uploadlmicenceImg"
  :show-file-list="false"
  :on-success="adduploadlmicenceImg"
  :before-upload="beforeAvatarUpload">
  <img v-if="ruleForm.lmicenceImg" :src="ruleForm.lmicenceImg" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
 </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="addshop">立即申请</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      ImageUrl: "",
      
      dialogVisible: false,
      rules: {
        shopName: [
          { required: true, message: "请输入门店名称", trigger: "blur" },
          { min: 3, max: 9, message: "长度在 3 到 9 个字符", trigger: "blur" }
        ],
        shopLicenceNum: [
          { required: true, message: "请输入营业执照号码", trigger: "blur" },
          { min: 18, max: 18, message: "长度18个字符", trigger: "blur" }
        ],
        shopAdd: [
          { required: true, message: "请输入门店地址", trigger: "blur" },
          { min: 7, max: 11, message: "长度在 7 到 11 个", trigger: "blur" }
        ],
        shopCorporate: [
          { required: true, message: "请输入法人", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字", trigger: "blur" }
        ],
        shopTel: [
          { required: true, message: "请输入门店电话号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度 11 位", trigger: "blur" }
        ],
        shopFeature: [
          {
            required: true,
            message: "请保持长度保持在12个字以内",
            trigger: "blur"
          },
          { min: 2, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ]
      }
    };
  },
  //生命函数周期调用
  created: function() {
    this.getshop();
  },
  beforeMount: function() {
    // console.log(this.statearr)
  },
  computed: { ...mapState("ShopStore", ["ruleForm"]),
   ...mapState("MemberStore",["ip"])
  },

  methods: {
    //展开map获取
    ...mapActions("ShopStore", ["addshop","getshop"]),

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleAvatarSuccess(file) {
      let url = `http://${this.ip}:3000${file}`.replace("public","").replace(/\\/g,"/")
      this.ruleForm.shopsImg  = url
    },
    adduploadlmicenceImg(item){
      let url = `http://${this.ip}:3000${item}`.replace("public","").replace(/\\/g,"/")
      this.ruleForm.lmicenceImg  = url
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
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
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
