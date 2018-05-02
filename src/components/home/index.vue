<template>

<el-container>
  <el-header height="120px">
      <h1 style="font-family:'方正卡通简体'">爱宠邦</h1>

  </el-header>
  <el-container >
    <el-aside width="200px">

      <el-row class="tac">
        <el-col >
          <el-menu
            class="el-menu-vertical-demo"
            router
            >
            <el-submenu index="1" >
              <template slot="title">
                <div  style="display:flex;flex-direction:row;align-items:center;font-family:'方正卡通简体'">
                  <i class="hm1"></i>
                  <span>平台管理员</span>
                </div>
              </template>
                <el-menu-item index="/home/check">
                <div  style="display:flex;flex-direction:row;align-items:center;font-family:'方正卡通简体'">
                  <i class="hm3"></i>
                  <span>门店管理</span>
                </div>
                </el-menu-item>
                <el-menu-item index="/home/members">
                <div  style="display:flex;flex-direction:row;align-items:center;font-family:'方正卡通简体'">
                  <i class="hm4"></i>
                  <span>宠主管理</span>
                </div>
                </el-menu-item>
                <el-menu-item index="/home/users">
                <div  style="display:flex;flex-direction:row;align-items:center;font-family:'方正卡通简体'">
                  <i class="hm5"></i>
                  <span>管理员管理</span>
                </div>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <div  style="display:flex;flex-direction:row;align-items:center;font-family:'方正卡通简体'">
                  <i class="hm2"></i>
                  <span>门店管理员</span>
                </div>
              </template>
                <el-menu-item index="/home/services">
                <div  style="display:flex;flex-direction:row;align-items:center;font-family:'方正卡通简体'">
                  <i class="hm6"></i>
                  <span>服务管理</span>
                </div>
                </el-menu-item>
                <el-menu-item index="/home/goods">
                <div  style="display:flex;flex-direction:row;align-items:center;font-family:'方正卡通简体'">
                  <i class="hm7"></i>
                  <span>商品管理</span>
                </div>
                </el-menu-item>
                <el-menu-item index="/home/orders">
                <div  style="display:flex;flex-direction:row;align-items:center;font-family:'方正卡通简体'">
                  <i class="hm8"></i>
                  <span>订单管理</span>
                </div>
                </el-menu-item>
                <el-menu-item index="/home/shops">
                <div  style="display:flex;flex-direction:row;align-items:center;font-family:'方正卡通简体'">
                  <i class="hm9"></i>
                  <span>商铺管理</span>
                </div>
                </el-menu-item>
                <el-menu-item index="/home/pets">
                <div  style="display:flex;flex-direction:row;align-items:center;font-family:'方正卡通简体'">
                  <i class="hm10"></i>
                  <span>宠物管理</span>
                </div>
                </el-menu-item>
            </el-submenu>
      
          </el-menu>
        </el-col>
      </el-row>

    </el-aside>
    <el-main :span="22">
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>


<script>
import { mapState } from "vuex"
export default {
  name: "homepage",
  data(){
      return {
          defaultopends:["2"]
      }
  },
  beforeMount:function(){
    console.log(this.curUser,"oh")
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed : {
    ...mapState("Login",["curUser"])
  }
};
</script>

<style>
.el-header {
  background-color: rgb(169, 206, 175);
  color: #333;
  border-top-left-radius: 10px; 
  border-top-right-radius: 10px; 
  line-height: 60px;
  background: url("../../img/homebac.png");
}

.el-aside {
  color: #333;
}



.hm1{
  display: block;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background: url("../../img/home1.png");
  background-size:25px 25px; 
}
.hm2{
  display: block;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background: url("../../img/home2.png");
  background-size:25px 25px; 
}
.hm3{
  display: block;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background: url("../../img/home3.png");
  background-size:25px 25px; 
}
.hm4{
  display: block;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background: url("../../img/home4.png");
  background-size:25px 25px; 
}
.hm5{
  display: block;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background: url("../../img/home5.png");
  background-size:25px 25px; 
}
.hm6{
  display: block;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background: url("../../img/home6.png");
  background-size:25px 25px; 
}
.hm7{
  display: block;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background: url("../../img/home7.png");
  background-size:25px 25px; 
}
.hm8{
  display: block;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background: url("../../img/home8.png");
  background-size:25px 25px; 
}
.hm9{
  display: block;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background: url("../../img/home9.png");
  background-size:25px 25px; 
}
.hm10{
  display: block;
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background: url("../../img/home10.png");
  background-size:25px 25px; 
}
</style>
