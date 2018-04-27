<template>
  <div style="width:500px;margin:auto">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="品种">
          <el-input v-model="form.petVarieties"></el-input>
        </el-form-item>
        <el-form-item label="毛长">
          <el-input v-model="form.petHair"></el-input>
        </el-form-item>
        <el-form-item label="体型">
          <el-input v-model="form.petShape"></el-input>
        </el-form-item>
        <el-form-item label="毛色">
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
    <div style="width:200px;margin:auto">
      <el-button @click="resetForm('form')">取消</el-button>
      <el-button @click="addPet">提交</el-button>
    </div>
  </el-form>
  </div>
</template>
<script>
import {mapState,mapMutations,mapGetters,mapActions} from "vuex"
export default {
  name:"petAdd",
   computed:{
    ...mapState("PetStore",["form","total"]),
  },
  methods:{
     ...mapActions("PetStore",["addPet","getPet"]),
  }
}
</script>

