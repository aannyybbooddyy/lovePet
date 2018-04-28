<template>
<div>
  <div v-if="isChange">
    <el-table
      :data="service"
      height= "500"
      style="width: 100%">
      <el-table-column type="expand">
        <div slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="服务名称">
              <span>{{ props.row.serviceName }}</span>
            </el-form-item>
            <el-form-item label="服务类型">
              <span>{{ props.row.serviceType }}</span>
            </el-form-item>
            <el-form-item label="预约时间">
              <span>{{ props.row.serviceSchedule }}</span>
            </el-form-item>
            <el-form-item label="宠物规格">
              <span>{{ props.row.serviceCanFor }}</span>
            </el-form-item>
            <el-form-item label="服务时间">
              <span>{{ props.row.serviceTime }}</span>
            </el-form-item>
            <el-form-item label="服务等级">
              <span>{{ props.row.serviceLevel }}</span>
            </el-form-item>
            <el-form-item label="服务价格">
              <span>{{ props.row.servicePrice }}</span>
            </el-form-item>
            <el-form-item label="服务规格">
              <span>{{ props.row.serviceDetail }}</span>
            </el-form-item>
            <el-form-item label="id">
              <span>{{ props.row._id }}</span>
            </el-form-item>
            <el-form-item label="门店id">
              <span>{{ props.row.storeId }}</span>
            </el-form-item>
            <el-form-item label="管理员id">
              <span>{{ props.row.manageId }}</span>
            </el-form-item>            
            <el-form-item label="门店名称">
              <span>{{ props.row.storeName }}</span>
            </el-form-item>
            <el-form-item label="门店地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
          </el-form>  
        </div>
      </el-table-column>
      <el-table-column
        label="服务名称"
        prop="serviceName">
      </el-table-column>
      <el-table-column
        label="服务类型"
        prop="serviceType">
      </el-table-column>
      <el-table-column
        label="操作"
        prop="desc">
        <div slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.row)"
            type="text"
            size="small">
            移除
          </el-button>
          <el-button
            @click.native.prevent="changeRow(scope.row)"
            type="text"
            size="small">
            修改
          </el-button>
        </div>
      </el-table-column>
      
    </el-table> 
  </div>
  <div v-else>
    <el-form ref="form"  label-width="80px" size="mini">
  <el-form-item  label="服务名称">
    <el-input v-model="changeList.serviceName" ></el-input>
  </el-form-item>
  <el-form-item  label="服务类型">
    <el-input v-model="changeList.serviceType"></el-input>
  </el-form-item>
  <el-form-item label="所属门店">
    <el-select v-model="changeList.storeName">
      <el-option label="金牛店" value="金牛店"></el-option>
      <el-option label="宽窄店" value="宽窄店"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item  label="服务价格">
    <el-input v-model="changeList.servicePrice"></el-input>
  </el-form-item>
  <el-form-item label="服务时间">
    <el-input  v-model="changeList.serviceTime"></el-input>
  </el-form-item>
  <el-form-item size="large">
    <el-button type="primary" @click="onChange">确认修改</el-button>
    <el-button @click="offChange">取消</el-button>
  </el-form-item>
</el-form>
  </div>
</div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "service",
  methods: {
    ...mapActions("ServiceStore", ["getPet", "delService", "changeService","onChange"]),
    deleteRow(parm) {
      this.delService(parm._id);
    },
    // changeRow(parm) {
    //   this.changeService(parm);
    // }
    ...mapMutations("ServiceStore",["changeRow","offChange"])
  },
  created() {
    this.getPet();
  },
  computed: {
    ...mapState("ServiceStore", ["service","isChange","changeList"])
  }
};
</script>