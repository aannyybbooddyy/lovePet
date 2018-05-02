var express = require('express');
var router = express.Router();
const multiparty = require("multiparty");
const db = require("ykt-mongo");
const hc = require("ykt-http-client");

hc.url("localhost:3001");

router.get("/", function (req, res, next) {
    hc.get("/shops").then(function (data) {
        res.send(data);

    });
})
router.post("/", function (req, res, next) {
    let shopName = req.body.shopName;
    let shopLicenceNum = req.body.shopLicenceNum;
    let shopAdd = req.body.shopAdd;
    let shopTel = req.body.shopTel;
    let shopCorporate = req.body.shopCorporate;
    let shopFeature = req.body.shopFeature;
    let shopsImg=req.body.shopsImg
    let lmicenceImg=req.body.lmicenceImg
    hc.post("/shops", { shopName, shopLicenceNum, shopAdd, shopTel, shopCorporate, shopFeature,shopsImg,lmicenceImg }).then(function () {
        res.send("suc");
    })
})
router.delete("/", function (req, res, next) {
    let id = req.body.id
    hc.delete("/shops/" + id).then(function () {
        res.send("suc");
    })
})
router.put("/midificat", function (req, res, next) {
    let id = req.body.id;
    let shopName = req.body.shopName;
    let shopLicenceNum = req.body.shopLicenceNum;
    let shopAdd = req.body.shopAdd;
    let shopTel = req.body.shopTel;
    let shopCorporate = req.body.shopCorporate;
    let shopFeature = req.body.shopFeature
    let shopsImg=req.body.shopsImg;
    let lmicenceImg= req.body.lmicenceImg;
    hc.put("/shops/" + id,{shopName, shopLicenceNum, shopAdd, shopTel, shopCorporate, shopFeature,shopsImg,lmicenceImg}).then(function () {
        res.send("suc");
    })
})
// 图片
router.post('/upload',function(req, res, next){
    let form=new multiparty.Form({ uploadDir:'./public/img'});
    form.parse(req,function(err,fields,files){
        console.log(fields)
        if(err){
            res.send(err);
        }else{
            console.log(files.file[0].path)
            res.send(files.file[0].path)
        }
    })
})
// 营业执照照片
router.post('/uploadlmicenceImg',function(req, res, next){
    let form=new multiparty.Form({ uploadDir:'./public/lmicenceImg'});
    form.parse(req,function(err,fields,files){
        console.log(fields)
        if(err){
            res.send(err);
        }else{
            console.log(files.file[0].path)
            res.send(files.file[0].path)
        }
    })
})
module.exports = router;