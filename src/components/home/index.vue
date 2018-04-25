<template>

<el-container>
  <el-header height="120px">
      <h1>爱宠邦</h1>

  </el-header>
  <el-container>
    <el-aside :span="2">

<el-row class="tac">
  <el-col :span="16">
    <el-menu
      :default-openeds="defaultopends"
      class="el-menu-vertical-demo"
      router
      >
      <el-submenu index="1" >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>平台管理员</span>
        </template>
          <el-menu-item index="/home/check">门店审核</el-menu-item>
          <el-menu-item index="/home/members">宠主管理</el-menu-item>
          <el-menu-item index="/home/users">管理员管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>门店管理员</span>
        </template>
          <el-menu-item index="/home/services">服务管理</el-menu-item>
          <el-menu-item index="/home/goods">商品管理</el-menu-item>
          <el-menu-item index="/home/orders">订单管理</el-menu-item>
          <el-menu-item index="/home/shops">商铺管理</el-menu-item>
          <el-menu-item index="/home/pets">宠物管理</el-menu-item>
      </el-submenu>
 
    </el-menu>
  </el-col>
</el-row>

    </el-aside>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>




</template>

<script>
export default {
  name: "homepage",
  data(){
      return {
          defaultopends:["2"]
      }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style>
.el-header {
  background-color: rgb(169, 206, 175);
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
