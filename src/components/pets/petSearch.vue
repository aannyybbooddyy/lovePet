<template>
  <div>
    <el-input placeholder="请输入内容" v-model="search.select" class="input-with-select">
      <el-select style="width:130px" v-model="search.name" slot="prepend" placeholder="请选择">
        <el-option label="品种" value="petVarieties"></el-option>
        <el-option label="体型" value="petShape"></el-option>
        <el-option label="性别" value="petGender"></el-option>
        <el-option label="是否疫苗" value="petQuarantine"></el-option>
      </el-select>
      <el-button slot="append" @click="searchPet" icon="el-icon-search"></el-button>
    </el-input>
    <div>
      <el-table
          v-loading="isTure"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.3)"
          :data="list2"
          border
          style="width: 100%;text-align:center;">
          <el-table-column
            prop="petVarieties"
            label="品种"
            width="120">
          </el-table-column>
          <el-table-column
            prop="petHair"
            label="毛长"
            width="100">
          </el-table-column>
          <el-table-column
            prop="petShape"
            label="体型"
            width="110">
          </el-table-column>
          <el-table-column
            prop="petColor"
            label="颜色"
            width="120">
          </el-table-column>
          <el-table-column
            prop="petPrice"
            label="价格"
            width="110">
          </el-table-column>
          <el-table-column
            prop="petGender"
            label="性别"
            width="100">
          </el-table-column>
          <el-table-column
            prop="petQuarantine"
            label="是否疫苗"
            width="100">
          </el-table-column>
          <el-table-column
            prop="petAge"
            label="年龄"
            width="120">
          </el-table-column>
          <el-table-column
            prop="petCharacter"
            label="性格"
            width="150">
          </el-table-column>
          <el-table-column
            prop="petImg"
            label="头像"
            width="100">
            <template slot-scope="scope">
              <img v-if="scope.row.petImg" :src="scope.row.petImg" style="width:70px;height:70px"/>
              <img v-else src="img/touxiang.png" style="width:70px;height:70px"/>
            </template>
          </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button
            type="text"
             @click="updata(scope.row)"
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
    <!-- 修改弹框 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible2"
      width="60%" :before-close="getdialogVisible2">
      <div style="width:500px;margin:auto;">
        <el-form :model="list3" ref="form" label-width="100px">

          <el-form-item label="用户">
            <el-input v-model="list3.userId"></el-input>
          </el-form-item>
          <el-form-item label="品种">
            <el-input v-model="list3.petVarieties"></el-input>
          </el-form-item>
          <el-form-item label="毛长">
            <el-input v-model="list3.petHair"></el-input>
          </el-form-item>
          <el-form-item label="体型">
            <el-input v-model="list3.petShape"></el-input>
          </el-form-item>
          <el-form-item label="颜色">
            <el-input v-model="list3.petColor"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="list3.petPrice"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="list3.petGender"></el-input>
          </el-form-item>
          <el-form-item label="是否疫苗">
            <el-input v-model="list3.petQuarantine"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="list3.petAge"></el-input>
          </el-form-item>
          <el-form-item label="性格">
            <el-input v-model="list3.petCharacter"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="avatar-uploader"
              action="/pet/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="list3.petImg" :src="list3.petImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="getdialogVisible2">取 消</el-button>
        <el-button type="primary" @click="updataSure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {mapState,mapMutations,mapGetters,mapActions} from "vuex"
export default {
  name:"petSearch",
  watch:{
    rows2:function(){
      this.searchPet()
    },
    page2:function(){
      this.searchPet()
    }
  },
  computed:{//计算属性
    ...mapState("PetStore",["list3","dialogFormVisible2","isTure","list2","page2","rows2","curpage2","eachpage2","total2","maxpage2","search"]),
     ...mapState("MemberStore",["ip"])
  },
  methods:{
    updata(parm){
      this.updataTodoSearch(parm)
    },
    async updataSure(){
      await this.updataPet()
      this.searchPet()
    },
    handleAvatarSuccess(res, file) {
    //转换路格式
      let url = res.replace("public\\", "").replace("\\","/")
      this.list3.petImg = `http://${this.ip}:3000/${url}`
      this.getPet()
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
    del(parm){
      this.$confirm('此操作将永久删除此条数据，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async()=>{
        await this.delPet(parm._id)
        await this.searchPet()
        this.$message({
          type:'success',
          message:'删除成功！'
        });
      }).catch(()=>{
        this.$message({
          type:'info',
          message:'已取消删除'
        });
      });
    },
    ...mapMutations("PetStore",["getdialogVisible2","updataTodoSearch","handleSizeChange2","handleCurrentChange2"]),
    ...mapActions("PetStore",["searchPet","updataPet","delPet","getPet"]),
  }
}
</script>