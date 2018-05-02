<template>
<el-form ref="form"  label-width="80px" size="mini">
  <el-form-item  label="服务名称">
    <el-input v-model="serviceList.serviceName" ></el-input>
  </el-form-item>
  <el-form-item  label="服务类型">
    <el-input v-model="serviceList.serviceType"></el-input>
  </el-form-item>
  <el-form-item label="所属门店">
    <el-select v-model="serviceList.storeName">
      <el-option label="金牛店" value="金牛店"></el-option>
      <el-option label="宽窄店" value="宽窄店"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item  label="服务价格">
    <el-input v-model="serviceList.servicePrice"></el-input>
  </el-form-item>
  <el-form-item label="服务时间">
    <el-input  v-model="serviceList.serviceTime"></el-input>
  </el-form-item>
  <el-form-item size="large">
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="reset">清空</el-button>
  </el-form-item>
</el-form>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "add",
  methods: {
    onSubmit() {
      this.addService();
      this.reset();
    },
    ...mapActions("ServiceStore", ["addService"]),
    ...mapMutations("ServiceStore",["reset"])
  },
  computed: {
    ...mapState("ServiceStore", ["serviceList"])
  }
};
</script>
