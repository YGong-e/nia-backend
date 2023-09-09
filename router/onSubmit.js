const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const database = require("../databases/promiseQuery");
let mysql = require("mysql");
const router = express.Router();

const datetime = require('../utils/datatime');
const { log } = require("forever");

fs.readdir("uploads", (error) => {
  // uploads 폴더 없으면 생성
  if (error) {
    fs.mkdirSync("uploads");
  }
});


const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    let fileLen = file.originalname.length;

    cb(null, `${datetime()}div${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000000,
  },
});
// 이미지 업로드를 위한 API
// upload의 single 메서드는 하나의 이미지를 업로드할 때 사용
router.post("/", upload.single("file"), async function (req, res) {
  try {
    console.log(req.body);
    
    const date = req.body.date;
    const sido = req.body.sido;
    const sigungu = req.body.sigungu;
    const dong = req.body.dong;

    const name = req.body.name;
    const id = req.body.id;
    const team = req.body.team;
    const phonetype = req.body.phoneType;
    const dl = req.body.dl;
    const ul = req.body.ul;
    const inout = req.body.inout;
    const filename = req.file.filename;
    console.log('req.file' + JSON.stringify(req.file));
    const sqlResult = await database(`INSERT INTO nia_result (date, sido, sigungu, dong, name, id, team, phonetype, dl, ul, in_out, file_name)
     VALUES ('${date}', '${sido}', '${sigungu}', '${dong}', '${name}', '${id}', '${team}', '${phonetype}', '${dl}','${ul}','${inout}','${filename}')`)

    res.json({ success: true, message: "데이터 저장 완료" });
  } catch (error) {
    // 예외 처리: 에러가 발생하면 500 에러 응답
    console.error("에러 발생:", error);
  
    res.status(500).json({ success: false, message: "서버 에러" });
  }
});

module.exports = router;
