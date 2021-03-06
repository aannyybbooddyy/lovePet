
var express = require("express");
var router = express.Router();
var fs = require("fs");
const db = require("ykt-mongo");
const hc = require("ykt-http-client");
const multiparty = require("multiparty");
const path = require;

hc.url("localhost:3001");

/* GET users listing. */
//加载数据，加载搜索数据
router.get("/", function(req, res, next) {
  let page = req.query.page || 1;
  let rows = req.query.rows || 5;
  let userType = "0";
  hc.get("/users", { page, rows ,userType }).then(function(data) {
    res.send(data);
  });
});
// 得到已经通过验证的用户
router.get("/shopkeeper", function(req, res, next) {
  let page = req.query.page || 1;
  let rows = req.query.rows || 5;
  let userType = "1"
  hc.get("/users", { page, rows, userType }).then(function(data) {
    res.send(data);
  });
});

router.get("/serch", function(req, res, next) {
  let text = req.query.text || "";
  let a = [];
  hc.get("/users",{userType:"1"}).then(function(data) {
    for(let i = 0 ; i < data.length ; i++){
      if(data[i].userName == text){
        res.send(data[i]);
      }
    }
    res.send(a)
  });
});
// 注册时判断
router.get("/regAcount",function(req,res,next){
  let value = req.query.value;
  hc.get("/users").then(function(data){
    let a = [];
    for(let i = 0 ; i < data.length ; i++){
      if(data[i].userAcount == value){
        res.send(data[i])
      }
    }
    res.send(a)
  })
})
// 登录时判断
router.get("/login",function(req,res,next){
  let acount = req.query.acount;
  let password = req.query.password;
  hc.get("/users",{userType:"2"}).then(function(data){
    let a = [];
    for(let i = 0 ; i < data.length ; i++){
      if(data[i].userAcount == acount){
        if(data[i].userPwd == password){
          res.send(data[i])
        }
      }
    }
  })
  hc.get("/users",{userType:"1"}).then(function(data){
    let a = [];
    for(let i = 0 ; i < data.length ; i++){
      if(data[i].userAcount == acount){
        if(data[i].userPwd == password){
          res.send(data[i])
        }
        res.send(a)
      }
    }
    res.send(a)
  })
})
router.post("/addUser", function(req, res, next) {
  let userAcount = req.body.userAcount;
  let userMail = req.body.userMail;
  let userName = req.body.userName;
  let userPhone = req.body.userPhone;
  let userPwd = req.body.userPwd;
  let userType = "0";
  hc.post("/users", {userAcount,userMail,userName,userPhone,userPwd,userType}).then(function() {
    res.send("suc");
  });
});
// 让用户通过审核
router.put("/addShopkeeper", function(req, res, next) {
  let id = req.body.id;
  hc.put("/users/" + id, { userType : "1" }).then(function() {
    res.send("suc");
  });
});
router.delete('/',function(req,res,next){
  let id = req.body.userId;
  hc.delete("/users/" + id).then(function() {
    res.send("suc");
  });
})
router.delete('/dlt',function(req,res,next){
  let id = req.body.userId;
  hc.delete("/users/" + id).then(function() {
    res.send("suc");
  });
})
// 修改店主的信息
router.put("/midificat", function(req, res, next) {
  let userAcount = req.body.acount;
  let userMail = req.body.mail;
  let userName = req.body.name;
  let userPhone = req.body.phone;
  let userPwd = req.body.pwd;
  let id = req.body.id;
  hc.put("/users/" + id, { userAcount, userMail, userName, userPhone, userPwd }).then(function() {
    res.send("suc");
  });
});
// 获取未通过验证的门店
router.get("/shops", function(req, res, next) {
  let page = req.query.page || 1;
  let rows = req.query.rows || 5;
  let shopsType = "0";
  hc.get("/shops", { page, rows , shopsType }).then(function(data) {
    res.send(data);
  });
});
// 让门店通过审核
router.put("/theShop",function(req,res,next){
  let id = req.body.id;
  hc.put("/shops/" + id, { shopsType : "1" }).then(function() {
    res.send("suc");
  });
})

module.exports = router;
