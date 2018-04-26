<template>
  <div style="width:500px;margin:auto">
      <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="电话号码">
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
      class="upload-demo"
      action="http://localhost:3001/public"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList2"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>


    </el-form-item>
     <el-form-item label="拥有的宠物">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <div style="width:200px;margin:auto">
      <el-button>取消</el-button>
      <el-button @click="addCember">提交</el-button>
    </div>
  </el-form>
  </div>
</template>
<script>
import {mapState,mapMutations,mapGetters,mapActions} from "vuex"
export default {
  name:"memberAdd",
   computed:{
    ...mapState("MemberStore",["form"]),
  },
  methods:{
     ...mapActions("MemberStore",["addCember"]),
  }
}
</script>

