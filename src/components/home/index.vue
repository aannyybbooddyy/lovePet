<template>

<el-container>
  <el-header height="120px">
    <!-- <i class="homeRun1"></i> -->
      <h1 style="font-family:'方正卡通简体';font-size:32px">爱宠邦</h1>
    <!-- <i class="homeRun2"></i> -->

  </el-header>
  <el-container >
    <el-aside width="200px">

      <el-row class="tac">
        <el-col >
          <el-menu
            class="el-menu-vertical-demo"
            router
            >
            <el-submenu index="1" :disabled="userTrue" >
              <template slot="title"  >
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
            <el-submenu index="2" :disabled="keeperTrue">
              <template slot="title" disabled="false">
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
import { mapState, mapMutations } from "vuex"
export default {
  name: "homepage",
  data(){
      return {
          defaultopends:["2"],
          userTrue:true,
          keeperTrue:false,
      }
  },
  beforeMount:function(){
    this.getCurUser();
    console.log(this.curUser,"this.curUser")
    if(this.curUser.userType == 2){
      this.userTrue = false,
      this.keeperTrue = true
    }
  },
  methods: {
    ...mapMutations("Home",["getCurUser"]),
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed : {
    ...mapState("Home",["curUser"])
  }
};
</script>

<style>
.el-header {
  /* background-color: rgb(169, 206, 175); */
  color: #333;
  border-top-left-radius: 10px; 
  border-top-right-radius: 10px; 
  line-height: 60px;
  background: url("../../img/homebac.png");
  /* background-size: 150px 120px;  */
  display: flex;
  flex-direction: row;
}
/* .homeRun1{
  display: inline-block;
  width: 150px;
  height: 120px;
  position: absolute;
  left:0 ;
  background: url("../../img/homeRun.gif")no-repeat;
  background-size: 150px 120px; 
  transform: rotateY(180deg)
} */
/* .homeRun2{
  display: inline-block;
  width: 150px;
  height: 120px;
  position: absolute;
  left:87% ;
  background: url("../../img/homeRun.gif")no-repeat;
  background-size: 150px 120px; 
  z-index: 2;
} */
.el-aside {
  color: #333;
}
/* .el-main{
  background: url("../../img/homebac.png");
} */


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
