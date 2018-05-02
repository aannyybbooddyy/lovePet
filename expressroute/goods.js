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
router.get("/", function (req, res, next) {
  hc.get("/goods").then(function (data) {
    res.send(data);
  });
});
// 增加数据
router.post("/post", function (req, res, next) {
  let userId = req.body.userId;
  console.log("userId:",req.body,userId)
  let goodsName = req.body.goodsName;
  console.log("goodsName:",goodsName)
  let goodsType = req.body.goodsType;
  let goodsMaterial = req.body.goodsMaterial;
  let goodsCanFor = req.body.goodsCanFor;
  let goodsOnlyFor = req.body.goodsOnlyFor;
  let goodsSize = req.body.goodsSize;
  let goodsTaste = req.body.goodsTaste;
  let goodsSpecial = req.body.goodsSpecial;
  let goodsRegion = req.body.goodsRegion;
  let goodsDate = req.body.goodsDate;
  let goodsTime = req.body.goodsTime;
  let goodsSupplier = req.body.goodsSupplier;
  let goodsIntro = req.body.goodsIntro;
  let goodsPrice = req.body.goodsPrice;
  let number = req.body.number;
  let goodsImg = req.body.goodsImg;
  hc.post("/goods",
    {userId,goodsName,goodsType,goodsMaterial,goodsCanFor,goodsOnlyFor,goodsSize,goodsTaste,goodsSpecial,goodsRegion,goodsDate,goodsTime,goodsSupplier,goodsIntro,goodsPrice,number,goodsImg
    }).then(function (data) {
      res.send("ok");
    });
});

// 查找商品
router.get("/serch", function (req, res, next) {
  let goodsType = req.query.goodsType
  hc.get("/goods", { goodsType }).then(function (data) {
    res.send(data)
  })
})

// 删除商品
router.delete("/delete", function (req, res, next) {
  let id = req.body.parm
  hc.delete("/goods/" + id).then(function (data) {
    res.send("OJ8K")
  })
});

// 上传图片
router.post('/upload', function (req, res, next) {
  let form = new multiparty.Form({ uploadDir: './public/img' });
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
    } else {
      // 图片保存路径
      res.send(files.file[0].path);
    }
  });
})

// 修改数据
router.put('/put', function (req, res, next) {
  let goodsName = req.body.goodsName;
  let goodsType = req.body.goodsType;
  let goodsMaterial = req.body.goodsMaterial;
  let goodsCanFor = req.body.goodsCanFor;
  let goodsOnlyFor = req.body.goodsOnlyFor;
  let goodsSize = req.body.goodsSize;
  let goodsTaste = req.body.goodsTaste;
  let goodsSpecial = req.body.goodsSpecial;
  let goodsRegion = req.body.goodsRegion;
  let goodsDate = req.body.goodsDate;
  let goodsTime = req.body.goodsTime;
  let goodsSupplier = req.body.goodsSupplier;
  let goodsIntro = req.body.goodsIntro;
  let goodsPrice = req.body.goodsPrice;
  let number = req.body.number;
  let goodsImg = req.body.goodsImg;
  let id = req.body.id
  console.log(req.body)
  console.log(id,"id")
  hc.put("/goods/" + id,
    {
      goodsName, goodsType, goodsMaterial, goodsCanFor, goodsOnlyFor, goodsSize, goodsTaste, goodsSpecial, goodsRegion, goodsDate, goodsTime, goodsSupplier, goodsIntro, goodsPrice, number, goodsImg
    }).then(function (data) {
      res.send("ok");
    });
})

// 验证手机号是否重复
// router.get("/isPhoneRepet", function (req, res, next) {
//   let phone = req.query.phone;
//   hc.get("/users", { phone }).then(function (data) {
//     if (!data.length) {
//       res.send({ status: true, msg: "号码可用" });
//     } else {
//       res.send({ status: false, msg: "号码重复" });
//     }
//   });
// });

// // 注册提交
// router.post("/register", function (req, res, next) {
//   let phone = req.body.phone;
//   let pwd = req.body.pwd;
//   let status = req.body.status;
//   hc.post("/users", { phone, pwd, status }).then(function (data) {
//     res.send({ status: true });
//   });
// });
// // 验证登录页面
// router.post("/login", function (req, res, next) {
//   let phone = req.body.phone;
//   let pwd = req.body.pwd;
//   hc.get("/users", { findType: "exact", phone, pwd }).then(function (data) {
//     if (data.length) {
//       req.session.user = data[0];
//       res.send(data);
//     } else {
//       res.send({ status: false });
//     }
//   });
// });
// //获取到当前选中的ID对应的数据
// router.get("/aaa", function (req, res, next) {
//   let id = req.query._id;
//   hc.get("/users/" + id).then(function (data) {
//     res.send(data);
//   });
// });
// // 验证登录页面手机号是否存在
// router.post("/isRepeat", function (req, res, next) {
//   let phone = req.body.phone;
//   hc.get("/users", { phone }).then(function (data) {
//     if (data.length) {
//       res.send({ status: true });
//     } else {
//       res.send({ status: false });
//     }
//   });
// });

// router.get("/:id", function (req, res, next) {
//   hc.get("/users/" + req.params.id).then(function (data) {
//     // console.log(data)
//     res.send(data);
//   });
// });
// // 验证登录页面密码是否正确
// router.post("/isEquals", function (req, res, next) {
//   let pwd = req.body.pwd;
//   hc.get("/users", { pwd }).then(function (data) {
//     if (data.length) {
//       res.send({ status: true });
//     } else {
//       res.send({ status: false });
//     }
//   });
// });

// router.delete("/:id", function (req, res, next) {
//   let img = req.body.img;
//   if (img) {
//     img.replace("MIS/upload/", "");
//     // console.log(img.replace("MIS/upload/",""));
//     //删除本地图片
//     fs.unlink(
//       "../MAOYANAPP/public/MIS/upload/" + img.replace("MIS/upload/", ""),
//       function (err) {
//         if (err) {
//           return false;
//         }
//       }
//     );
//   }
//   //删除数据库数据
//   hc.delete("/users/" + req.params.id).then(function () {
//     res.send("sec");
//   });
// });

// router.put("/:id", function (req, res, next) {
//   let phone = req.body.phone;
//   let pwd = req.body.pwd;
//   let age = req.body.age;
//   let img = req.body.img;
//   let gender = req.body.gender;
//   hc
//     .put("/users/" + req.params.id, { phone, pwd, age, img, gender })
//     .then(function () {
//       res.send("suc");
//     });
// });

// //判断手机号码是否已经存在！
// router.post("/PhoneRepet", function (req, res, next) {
//   let phone = req.body.phone;
//   hc.get("/users", { phone }).then(function (data) {
//     if (data.length == 0) {
//       res.send({ status: true });
//     } else {
//       res.send({ status: false });
//     }
//   });
// });

// router.post("/addUsers", function (req, res, next) {
//   let phone = req.body.phone;
//   let pwd = req.body.pwd;
//   let age = req.body.age;
//   let gender = req.body.gender;
//   let img = req.body.img;
//   hc
//     .post("/users", { phone, pwd, age, gender, img, status: "2" })
//     .then(function (data) {
//       if (data.length == 0) {
//         res.send({ status: true });
//       } else {
//         res.send({ status: false });
//       }
//     });
// });

// router.post("/upload", function (req, res, next) {
//   let form = new multiparty.Form({ uploadDir: "./public/MIS/upload" });
//   form.parse(req, function (err, fields, files) {
//     if (err) {
//       res.send(err);
//     } else {
//       // console.log(files.modifyFileImg[0].path)
//       // console.log(files.modifyFileImg[0].path.replace("public/MIS", "").replace(/\\/g, "/"));
//       res.send(
//         files.modifyFileImg[0].path
//           .replace("public/MIS", "")
//           .replace(/\\/g, "/")
//           .replace("public/", "")
//       );
//       // console.log(112111,files.modifyFileImg[0].path.replace("public/MIS", "").replace(/\\/g, "/").replace("public/",""))
//     }
//   });
// });

// // 验证登录页面
// router.post("/login", function (req, res, next) {
//   let phone = req.body.phone;
//   let pwd = req.body.pwd;
//   let status = req.body.status;
//   hc.get("/users", { findType: "exact", phone, pwd }).then(function (data) {
//     // console.log(data);
//     if (data.length) {
//       req.session.user = data[0];
//       res.send({ status: true });
//     } else {
//       res.send({ status: false });
//     }
//   });
// });

module.exports = router;

