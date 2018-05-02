var express = require("express");
var router = express.Router();
var fs = require("fs");
const db = require("ykt-mongo");
const hc = require("ykt-http-client");
const multiparty = require("multiparty");
const path = require;

hc.url("localhost:3001");

//获取数据
// router.get("/", function(req, res, next) {
//   let page = req.query.page || 1;
//   let rows = req.query.rows || 5;
//   hc.get("/pet",{page,rows}).then(function(data) {
//     res.send(data);
//   });
// });
//添加数据
router.post("/", function(req, res, next) {
  let petVarieties = req.body.petVarieties;
  let petHair = req.body.petHair;
  let petShape = req.body.petShape;
  let petColor = req.body.petColor;
  let petPrice = req.body.petPrice;
  let petGender = req.body.petGender;
  let petQuarantine = req.body.petQuarantine;
  let petAge = req.body.petAge;
  let petCharacter = req.body.petCharacter;
  let petImg = req.body.petImg;
  let userId = req.body.userId;
  hc.post("/pet",{petVarieties,petHair,petShape,petColor,petPrice,petGender,petQuarantine,petAge,petCharacter,petImg,userId}).then(function(data) {
    res.send(data);
  });
});
//查询数据
router.get('/', function (req, res, next) {
	let page = req.query.page || 1;
  let rows = req.query.rows || 10;
  console.log(req.query.page,req.query.rows)
  let name = req.query.name;
  let select = req.query.select;
  console.log("***",name,select);
  let obj = {}
  if(name){
  	obj[name] = select.trim();
  }
  console.log(obj)
  hc.get("/pet", { page, rows, ...obj }).then(function(data) {
		  res.send(data);
	});
});
//删除数据
router.delete("/", function (req, res, next) {
  let id = req.body.id
  hc.delete("/pet/" + id).then(function() {
    res.send("sec");
  });
});
//上传图片
router.post('/upload', function (req, res, next) {
  let form = new multiparty.Form({ uploadDir: './public/img' });
  form.parse(req, function (err, fields, files) {
    console.log(fields)
    if (err) {
      res.send(err);
    } else {
      // 图片保存路径
      console.log(files.file[0].path)
      res.send(files.file[0].path);
    }
  });
});
//修改数据
router.put('/', function (req, res, next) {
  let id = req.body._id;
  let petVarieties = req.body.petVarieties;
  let petHair = req.body.petHair;
  let petShape = req.body.petShape;
  let petColor = req.body.petColor;
  let petPrice = req.body.petPrice;
  let petGender = req.body.petGender;
  let petQuarantine = req.body.petQuarantine;
  let petAge = req.body.petAge;
  let petCharacter = req.body.petCharacter;
  let petImg = req.body.petImg;
  let userId = req.body.userId;
  hc.get("/pet/" + id).then(function(data) {
    let url = data.petImg.replace("http://127.0.0.1:3000/img/","");
    hc.put("/pet/" + id,{petVarieties,petHair,petShape,petColor,petPrice,petGender,petQuarantine,petAge,petCharacter,petImg,userId}).then(function(data) {
      res.send(data);
    });
  });
});

module.exports = router;
