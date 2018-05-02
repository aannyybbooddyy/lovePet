<template>
<div>
  <img id="regbac" src="../../img/regbac.png" alt="">
  <div class="regBanner">
    <h1 style="margin-top:20px;margin-bottom:20px;color:white;font-family:'方正卡通简体'">JOIN US ❤</h1>
    <el-form :model="userMsg" :rules="fromRule" ref="userMsg" status-icon  style="width:350px;"  label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="userAcount">
        <el-input placeholder="请输入您的账号" v-model.number="userMsg.userAcount" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPwd">
        <el-input placeholder="请输入您的密码" id="p" v-model="userMsg.userPwd" type="password"  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input placeholder="请再次输入密码" v-model="userMsg.checkPwd" type="password"  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="userPhone">
        <el-input placeholder="请输入手机号码" v-model.number="userMsg.userPhone" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="userMail">
        <el-input placeholder="请输入您的邮箱" v-model="userMsg.userMail" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input placeholder="请输入您的昵称" v-model="userMsg.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userMsg')">提交</el-button>
        <el-button @click="resetForm('userMsg')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "register",
  computed:{
    ...mapState("Register",["userMsg","fromRule"])
  },
  methods:{
    ...mapActions("Register",["saveUserAsync"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: "恭喜你，注册成功啦",
            type: "success"
          });
          this.saveUserAsync(this.userMsg)
          setTimeout(() => {
            this.$router.push({
              path: `/`
          })
          }, 1000);
        } else {
          this.$message.error('注册失败了老铁');
          return false;
        }
      });
    },
   resetForm(formName) {
      
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  width: 980px;
  text-align: center;
  line-height: 60px;
  margin: auto;
}
#regbac{
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
}
.regBanner{
  border: 1px solid black;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  width: 400px;
  height: 600px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10%;
  left: 35%;
  align-items: center;
}
.el-form-item label{
  color: white;
}
.el-input input{
  border: transparent;
  background-color: rgba(255, 255, 255, 0.226);
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  width: 980px;
  height: 480px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 160px;
  margin: auto;
}
</style>
