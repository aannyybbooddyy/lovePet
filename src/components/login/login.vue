<template>
  <div class="loginHtml">
    <img id="loginbac" src="../../img/loginbac.png">
    <div>
      <div class="loginContainer">
        <h1 class="titleName">登录界面</h1>
        <el-form :model="loginUser" style="width:350px;" status-icon :rules="loginRule" ref="loginUser" label-width="100px" class="demo-ruleForm">            
          <el-form-item label="账号" prop="acount">
              <el-input class="trans" type="text" v-model.number="loginUser.acount" placeholder="请输入账号" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
              <el-input class="trans" type="password" v-model="loginUser.password" placeholder="请输入密码" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item>
              <el-button type="primary" @click="submitForm('loginUser')">登录</el-button>
              <el-button @click="resetForm('loginUser')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions ,mapMutations} from "vuex"
export default {
  name:"login",
  computed:{
    ...mapState("Login",["loginUser","loginRule","curUser"])
  },
  methods: {
    ...mapMutations("Login",["saveUser"]),
    ...mapActions("Login",["judgeLoginUserAsync"]),
    async submitForm(formName) {
      await this.judgeLoginUserAsync(this.loginUser);
      if(this.curUser == -1){
        this.$message.error("登录失败！");
      }else{
        await this.saveUser(this.curUser);
        this.$message({
          message: "恭喜你，登录成功啦",
          type: "success"
        });
        setTimeout(() => {
          this.$router.push({
            path: `/home`
          })
        }, 1000);
      }
    },
    resetForm() {
      this.$router.push({
        name:"register"
      })
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.titleName{
  color: white;
  margin-bottom: 50px;
  font-family: '方正卡通简体'
}
.el-form-item label{
  color: white;
}
.el-input input {
  background-color:rgba(255, 255, 255, 0.212);
  outline: none;
  color:white;
}
#loginbac{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
}
.trans{
  border: transparent;
  background-color: transparent;
  outline: none;
}
.loginContainer{
  width: 400px;
  height: 450px;
  border: 1px solid rgb(189, 189, 189);
  background-color: rgba(141, 141, 141,0.3);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20%;
  left: 35%;
}
</style>