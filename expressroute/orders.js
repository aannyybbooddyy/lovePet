var express = require('express');
var router = express.Router();

const db = require("ykt-mongo");
const hc = require("ykt-http-client");

hc.url("127.0.0.1:3001");

/* GET users listing. */
router.get('/', function (req, res, next) {
    let page = req.query.page || 1;
    let rows = req.query.rows || 10;
    let userId = req.query.userId || "";
    //如果有userId代表是商铺管理员，需要携带id查询
    if (userId) {
        hc.get("/orders", { submitType: "findJoin", ref: ["users", "shops", "members"], page, rows, userId }).then(function (data) {
            console.log("in nodejs")
            res.send(data);
        })
    }
    else {
        hc.get("/orders", { submitType: "findJoin", ref: ["users", "shops", "members"], page, rows }).then(function (data) {
            console.log("in nodejs")
            res.send(data);
        })

    }


});
router.delete('/', function (req, res, next) {
    hc.delete("/orders/" + req.body.orderId).then(function (data) {
        res.send(data);
    })

})
router.post("/", function (req, res, next) {
    console.log("inpost");
    res.send("ok");
})
router.put("/", function (req, res, next) {
    console.log("input");
    let { _id, members, users, orderStatus, orderTime, orderDetail, orderTotal, shops, sendAdd, userId,shopId,memberId } = JSON.parse(req.body.value);
    console.log({ _id, members, users, orderStatus, orderTime, orderDetail, orderTotal, shops, sendAdd })
    //添加
    hc.post('/orders', {
        members: { "$ref": "members", "$id": db.ObjectID(members._id) }, users: { "$ref": "users", "$id": db.ObjectID(users._id) },
        shops: { "$ref": "shops", "$id": db.ObjectID(shops._id) },userId,shopId,memberId, orderStatus, orderTime, orderDetail, orderTotal, sendAdd
    }).then(function (data) {
        res.send("suc");
    })
    //修改
    // hc.put('/orders/' + _id,{members:{"$ref":"members","$id":db.ObjectID(members._id)},users:{"$ref":"users","$id":db.ObjectID(users._id)},
    // shops:{"$ref":"shops","$id":db.ObjectID(shops._id)},userId,shopId,memberId,orderStatus,orderTime,orderDetail,orderTotal,sendAdd}).then(function(data){
    //     res.send("suc");
    // })



})


//店铺管理员通过订单ID搜索
router.get("/search", function (req, res, next) {
    let page = req.query.page || 1;
    let rows = req.query.rows || 10;
    let userId = req.query.userId;
    let orderId = req.query.orderId;
    console.log(orderId,"orderId");
    //有id
    if( orderId ){
        //id输入合法
        if(orderId.length == 12 || orderId.length == 24){
            hc.get("/orders/" + orderId,{submitType: "findJoin", ref: ["users", "shops", "members"], page, rows, userId}).then(function(data){
                res.send(data);
            })
        }
        //id输入不合法
        else{
            res.send({
                "curpage":1,"eachpage":5,"maxpage":1,"rows":[],total:0
            })
        }
    }
    //没有输入id直接点击搜索
    else{
        hc.get("/orders" ,{submitType: "findJoin", ref: ["users", "shops", "members"], page, rows, userId}).then(function(data){
            res.send(data);
        })
    }

})

//店铺管理员通过字段查询
router.post("/search",function(req,res,next){
    let page = req.body.page || 1;
    let rows = req.body.rows || 10;
    let {orderTotal, memberId, userId, sendAdd, orderStatus} = JSON.parse(req.body.value);
    let obj = {orderTotal, memberId, userId, sendAdd, orderStatus}
    //把空字段删除
    for(attr in obj){
        if(!obj[attr]){
            delete obj[attr]
        }
    }
    // hc.get("/orders",{submitType: "findJoin", ref: ["users", "shops", "members"], page, rows, ...obj}).then(function(data){
    hc.get("/orders",{submitType: "findJoin", ref: ["users", "shops", "members"], page, rows, ...obj}).then(function(data){
        console.log(data);
        res.send(data);
    })
})
module.exports = router;

//通过
