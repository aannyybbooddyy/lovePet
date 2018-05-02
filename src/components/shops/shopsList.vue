<template>
<div>
<el-table
    :data="statearr"
    border
    style="width: 100%">
    <el-table-column
      prop="shopName"
      label="店名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="shopLicenceNum"
      label=" 营业执照号码"
      width="240">
    </el-table-column>
    <el-table-column
      prop="shopCorporate"
      label="店主"
      width="120">
    </el-table-column>
    <el-table-column
      prop="shopFeature"
      label="特色"
      width="120"
     >
    </el-table-column>
    <el-table-column
      prop="shopAdd"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="shopTel"
      label="电话"
      width="180">
    </el-table-column>
      <el-table-column 
      label="图片"
      width="180">
       <template slot-scope="props">
        <img style="width: 200px;height: 200px;" :src="props.row.shopsImg" alt="">
      </template>      
    </el-table-column>
      <el-table-column 
      label="营业执照"
      width="180">
       <template slot-scope="props">
        <img style="width: 200px;height: 200px;" :src="props.row.lmicenceImg" alt="">
      </template>      
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="modifyshop(scope.row)" type="text" size="small">修改编辑</el-button>
        <el-button @click="deleteshop(scope.row._id)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  

   <el-dialog title="修改门店信息" :visible.sync="dialogFormVisible">
      <el-form :model="shopsdata">
        <el-form-item label="店名" label-width="120px">
          <el-input v-model="shopsdata.shopName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号码" label-width="120px">
          <el-input v-model="shopsdata.shopLicenceNum" auto-complete="off"></el-input>          
        </el-form-item>
        <el-form-item label="店主" label-width="120px">
          <el-input v-model="shopsdata.shopCorporate" auto-complete="off"></el-input>          
        </el-form-item>
        <el-form-item label="特色" label-width="120px">
          <el-input v-model="shopsdata.shopFeature" auto-complete="off"></el-input>          
        </el-form-item>
        <el-form-item label="地址" label-width="120px">
          <el-input v-model="shopsdata.shopAdd" auto-complete="off"></el-input>          
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="shopsdata.shopTel" auto-complete="off"></el-input>          
        </el-form-item>
        <el-form-item label="店铺图标" prop="shopImg">
         <el-upload
            class="avatar-uploader"
            action="shops/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="shopsdata.shopsImg" :src="shopsdata.shopsImg" class="avatar">
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
            <img v-if="shopsdata.lmicenceImg" :src="shopsdata.lmicenceImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="turnshops(shopsdata)">确 定</el-button>
      </div>
    </el-dialog>




  
</div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
   
      imageUrl:"" ,
      dialogFormVisible: false,
      shopsdata: {}
    };
  },

  computed: { ...mapState("ShopStore", ["statearr"]),
   ...mapState("MemberStore",["ip"]) },
  methods: {
    ...mapActions("ShopStore", ["getshop", "deleteshop", "modificationAsync"]),
    modifyshop: function(item) {
      console.log(item);
      item.shopFeature = item.shopFeature.join("")
      this.dialogFormVisible = true;
      this.shopsdata = item;
    },
    turnshops: async function(item) {
      console.log(item)
      await this.modificationAsync(item);
      this.dialogFormVisible = false;
    },
    handleAvatarSuccess(file) {
      let url = `http://${this.ip}:3000${file}`
        .replace("public", "")
        .replace(/\\/g, "/");
      this.shopsdata.shopsImg = url;
    },
    adduploadlmicenceImg(item) {
      let url = `http://${this.ip}:3000${item}`
        .replace("public", "")
        .replace(/\\/g, "/");
      this.shopsdata.lmicenceImg = url;
      console.log(url)
      console.log(this.ruleForm.lmicenceImg)
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
  },
    created: function() {
    this.getshop();
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
    border-color: #409EFF;
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