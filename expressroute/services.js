var express = require("express");
var router = express.Router();
var fs = require("fs");
const db = require("ykt-mongo");
const hc = require("ykt-http-client");
const multiparty = require("multiparty");
const path = require;

hc.url("localhost:3001");

/* GET users listing. */
//渲染
router.get("/", function (req, res, next) {
  hc.get("/services").then(function (data) {
    res.send(data);
  });
});

// 增加
router.post("/", function (req, res, next) {
  let serviceName = req.body.serviceName;
  let serviceType = req.body.serviceType;
  let servicePrice = req.body.servicePrice;
  let storeName = req.body.storeName;
  let serviceTime = req.body.serviceTime;
  let storeId = req.body.storeId;
  let manageId = req.body.manageId;
  hc.post("/services", {
    serviceName,
    serviceType,
    servicePrice,
    storeName,
    serviceTime,
    storeId,
    manageId
  }).then(function (data) {
    res.send("ok");
  });
});

// 删除
router.delete("/", function (req, res, next) {
  let id = req.body.id
  hc.delete("/services/" + id).then(function () {
    res.send("sec")
  })
})

// 修改
router.put("/", function (req, res, next) {
  let id = req.body.id;
  let serviceName = req.body.serviceName;
  let serviceType = req.body.serviceType;
  let servicePrice = req.body.servicePrice;
  let storeName = req.body.storeName;
  let serviceTime = req.body.serviceTime;
  let storeId = req.body.storeId;
  let manageId = req.body.manageId;
  hc
    .put("/services/" + id, {
      serviceName,
      serviceType,
      servicePrice,
      storeName,
      serviceTime,
      storeId,
      manageId
    })
    .then(function () {
      res.send("suc");
    });
});
// 验证手机号是否重复
router.get("/isPhoneRepet", function (req, res, next) {
  let phone = req.query.phone;
  hc.get("/users", {
    phone
  }).then(function (data) {
    if (!data.length) {
      res.send({
        status: true,
        msg: "号码可用"
      });
    } else {
      res.send({
        status: false,
        msg: "号码重复"
      });
    }
  });
});
// 验证登录页面
router.post("/login", function (req, res, next) {

  hc.get("/users", {
    findType: "exact",
    phone,
    pwd
  }).then(function (data) {
    if (data.length) {
      req.session.user = data[0];
      res.send(data);
    } else {
      res.send({
        status: false
      });
    }
  });
});
//获取到当前选中的ID对应的数据
router.get("/aaa", function (req, res, next) {
  let id = req.query._id;
  hc.get("/users/" + id).then(function (data) {
    res.send(data);
  });
});
// 验证登录页面手机号是否存在
router.post("/isRepeat", function (req, res, next) {
  let phone = req.body.phone;
  hc.get("/users", {
    phone
  }).then(function (data) {
    if (data.length) {
      res.send({
        status: true
      });
    } else {
      res.send({
        status: false
      });
    }
  });
});

router.get("/:id", function (req, res, next) {
  hc.get("/users/" + req.params.id).then(function (data) {
    res.send(data);
  });
});
// 验证登录页面密码是否正确
router.post("/isEquals", function (req, res, next) {
  let pwd = req.body.pwd;
  hc.get("/users", {
    pwd
  }).then(function (data) {
    if (data.length) {
      res.send({
        status: true
      });
    } else {
      res.send({
        status: false
      });
    }
  });
});

// router.delete("/:id", function(req, res, next) {
//   let img = req.body.img;
//   if (img) {
//     img.replace("MIS/upload/", "");
//     // console.log(img.replace("MIS/upload/",""));
//     //删除本地图片
//     fs.unlink(
//       "../MAOYANAPP/public/MIS/upload/" + img.replace("MIS/upload/", ""),
//       function(err) {
//         if (err) {
//           return false;
//         }
//       }
//     );
//   }
//   //删除数据库数据
//   hc.delete("/users/" + req.params.id).then(function() {
//     res.send("sec");
//   });
// });


//判断手机号码是否已经存在！
router.post("/PhoneRepet", function (req, res, next) {
  let phone = req.body.phone;
  hc.get("/users", {
    phone
  }).then(function (data) {
    if (data.length == 0) {
      res.send({
        status: true
      });
    } else {
      res.send({
        status: false
      });
    }
  });
});

router.post("/addUsers", function (req, res, next) {
  let phone = req.body.phone;
  let pwd = req.body.pwd;
  let age = req.body.age;
  let gender = req.body.gender;
  let img = req.body.img;
  hc
    .post("/users", {
      phone,
      pwd,
      age,
      gender,
      img,
      status: "2"
    })
    .then(function (data) {
      if (data.length == 0) {
        res.send({
          status: true
        });
      } else {
        res.send({
          status: false
        });
      }
    });
});

router.post("/upload", function (req, res, next) {
  let form = new multiparty.Form({
    uploadDir: "./public/MIS/upload"
  });
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
    } else {
      // console.log(files.modifyFileImg[0].path)
      // console.log(files.modifyFileImg[0].path.replace("public/MIS", "").replace(/\\/g, "/"));
      res.send(
        files.modifyFileImg[0].path
        .replace("public/MIS", "")
        .replace(/\\/g, "/")
        .replace("public/", "")
      );
      // console.log(112111,files.modifyFileImg[0].path.replace("public/MIS", "").replace(/\\/g, "/").replace("public/",""))
    }
  });
});

// 验证登录页面
router.post("/login", function (req, res, next) {
  let phone = req.body.phone;
  let pwd = req.body.pwd;
  let status = req.body.status;
  hc.get("/users", {
    findType: "exact",
    phone,
    pwd
  }).then(function (data) {
    // console.log(data);
    if (data.length) {
      req.session.user = data[0];
      res.send({
        status: true
      });
    } else {
      res.send({
        status: false
      });
    }
  });
});

module.exports = router;