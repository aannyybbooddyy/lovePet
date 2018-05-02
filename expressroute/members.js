var express = require("express");
var router = express.Router();
var fs = require("fs");
const db = require("ykt-mongo");
const hc = require("ykt-http-client");
const multiparty = require("multiparty");
const path = require;

hc.url("localhost:3001");

//加载数据，加载搜索数据
router.get("/", function(req, res, next) {
  let page = req.query.page || 1;
  let rows = req.query.rows || 5;
  let name = req.query.name;
  let select = req.query.select;
  let obj = {};
  // console.log(page,rows)
  // if (name == "status" && select == "管理员") {
  //   select = 1;
  // }
  // if (name == "status" && select == "普通用户") {
  //   select = 2;
  // }
  if (name) {
    obj[name] = select.trim();
  }
  console.log(obj)
  hc.get("/members", { page, rows, ...obj }).then(function(data) {
    res.send(data);
  });
});
//增加数据
router.post("/", function(req, res, next) {
  let memberPhone = req.body.memberPhone + "";
  let memberAcount = req.body.memberAcount;
  let memberName = req.body.memberName;
  let memberCard = req.body.memberCard + "";
  let memberAdd = req.body.memberAdd;
  let memberArea = req.body.memberArea;
  let memberPoint = req.body.memberPoint;
  let memberImg = req.body.memberImg;
  let memberPet = req.body.memberPet;
  hc.post("/members" ,{ memberPet,memberPhone,memberAcount,memberName,memberCard,memberImg,memberAdd,memberArea,memberPoint}).then(function(data) {
    res.send("suc");
  });
});

//删除数据
router.delete("/", function (req, res, next) {
  console.log(req.body._id)
  let id = req.body._id
  hc.delete("/members/" + id).then(function() {
    let url = req.body.memberImg.replace("http://127.0.0.1:3000/img/", "");
    //删除本地图片
    if(req.body.memberImg){
      fs.unlink("../maoyan_g4/public/img/" + url,function(err) {
        if (err) {
          return false;
        }
      }
    );
    }
    res.send("sec");
  });
});


//修改数据
router.put("/", function (req, res, next) {1
  let id = req.body._id
  let memberPhone = req.body.memberPhone;
  let memberAcount = req.body.memberAcount;
  let memberName = req.body.memberName;
  let memberCard = req.body.memberCard;
  let memberAdd = req.body.memberAdd;
  let memberArea = req.body.memberArea;
  let memberPoint = req.body.memberPoint;
  let memberImg = req.body.memberImg;
  let memberPet = req.body.memberPet;
  hc.get("/members/"+id).then(function(data) {
    // let url = data.memberImg.replace("http://127.0.0.1:3000/img/", "");
    //删除本地图片
    // console.log(req.body.memberImg)
    // if(req.body.memberImg){
    //   fs.unlink("../maoyan_g4/public/img/" + url,function(err) {
    //     if (err) {
    //       return false;
    //     }
    //   }
    // );
    // }
      hc.put("/members/" + id ,{ memberPet,memberPhone,memberAcount,memberName,memberCard,memberImg,memberAdd,memberArea,memberPoint}).then(function(data) {
        res.send("suc");
    });
  });
});

//保存图片
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
});


// 验证手机号是否重复
router.get("/isPhoneRepet", function(req, res, next) {
  let memberPhone = req.query.memberPhone + "";
  hc.get("/members",{findType: "exact", memberPhone}).then(function(data) {
    console.log(memberPhone)
    console.log(data)
    console.log(data.length)
    if (!data.length) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
});



// router.post("/upload", function(req, res, next) {
//   let form = new multiparty.Form({ uploadDir: "./public/MIS/upload" });
//   form.parse(req, function(err, fields, files) {
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








// 注册提交
router.post("/register", function(req, res, next) {
  let phone = req.body.phone;
  let pwd = req.body.pwd;
  let status = req.body.status;
  hc.post("/users", { phone, pwd, status }).then(function(data) {
    res.send({ status: true });
  });
});
// 验证登录页面
router.post("/login", function(req, res, next) {
  let phone = req.body.phone;
  let pwd = req.body.pwd;
  hc.get("/users", { findType: "exact", phone, pwd}).then(function(data) {
      if (data.length) {
        req.session.user = data[0];
        res.send(data);
      } else {
        res.send({ status: false });
      }
    });
});
//获取到当前选中的ID对应的数据
router.get("/aaa", function(req, res, next) {
  let id = req.query._id;
  hc.get("/users/" + id).then(function(data) {
    res.send(data);
  });
});
// 验证登录页面手机号是否存在
router.post("/isRepeat", function(req, res, next) {
  let phone = req.body.phone;
  hc.get("/users", { phone }).then(function(data) {
    if (data.length) {
      res.send({ status: true });
    } else {
      res.send({ status: false });
    }
  });
});

router.get("/:id", function(req, res, next) {
  hc.get("/users/" + req.params.id).then(function(data) {
    // console.log(data)
    res.send(data);
  });
});
// 验证登录页面密码是否正确
router.post("/isEquals", function(req, res, next) {
  let pwd = req.body.pwd;
  hc.get("/users", { pwd }).then(function(data) {
    if (data.length) {
      res.send({ status: true });
    } else {
      res.send({ status: false });
    }
  });
});

router.delete("/:id", function(req, res, next) {
  let img = req.body.img;
  if (img) {
    img.replace("MIS/upload/", "");
    // console.log(img.replace("MIS/upload/",""));
    //删除本地图片
    fs.unlink(
      "../MAOYANAPP/public/MIS/upload/" + img.replace("MIS/upload/", ""),
      function(err) {
        if (err) {
          return false;
        }
      }
    );
  }
  //删除数据库数据
  hc.delete("/users/" + req.params.id).then(function() {
    res.send("sec");
  });
});

router.put("/:id", function(req, res, next) {
  let phone = req.body.phone;
  let pwd = req.body.pwd;
  let age = req.body.age;
  let img = req.body.img;
  let gender = req.body.gender;
  hc
    .put("/users/" + req.params.id, { phone, pwd, age, img, gender })
    .then(function() {
      res.send("suc");
    });
});

//判断手机号码是否已经存在！
router.post("/PhoneRepet", function(req, res, next) {

  let phone = req.body.phone;
  hc.get("/users", { phone }).then(function(data) {
    if (data.length == 0) {
      res.send({ status: true });
    } else {
      res.send({ status: false });
    }
  });
});

router.post("/addUsers", function(req, res, next) {
  let phone = req.body.phone;
  let pwd = req.body.pwd;
  let age = req.body.age;
  let gender = req.body.gender;
  let img = req.body.img;
  hc
    .post("/users", { phone, pwd, age, gender, img, status: "2" })
    .then(function(data) {
      if (data.length == 0) {
        res.send({ status: true });
      } else {
        res.send({ status: false });
      }
    });
});



// 验证登录页面
router.post("/login", function(req, res, next) {
  let phone = req.body.phone;
  let pwd = req.body.pwd;
  let status = req.body.status;
  hc.get("/users", { findType: "exact", phone, pwd }).then(function(data) {
    // console.log(data);
    if (data.length) {
      req.session.user = data[0];
      res.send({ status: true });
    } else {
      res.send({ status: false });
    }
  });
});

module.exports = router;
