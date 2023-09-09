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


router.delete("/", async function (req, res) {
  try {
    // console.log('뭘까')
    console.log(req.body.id);
    const id = req.body.id;
    const sql = await database(`Delete FROM nia_result WHERE keyIndex = ${id}`)
    sqlResult = sql.rows;
    console.log('ddd', sqlResult);
    res.json(sqlResult);
  } catch (error) {
    // 예외 처리: 에러가 발생하면 500 에러 응답
    console.error("에러 발생:", error);
  
    res.status(500).json({ success: false, message: "서버 에러" });
  }
});

module.exports = router;
