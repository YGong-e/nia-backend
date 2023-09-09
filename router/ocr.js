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

const { createWorker } = require('tesseract.js');


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
      const filename = req.file.filename;
      const filePath = `http://localhost:8000/uploads/${filename}` 
      console.log(filePath + 'filePath');
      const worker = await createWorker({
      });

      
      let result = null;
  
      try {
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const {
          data: { text },
        } = await worker.recognize(filePath);
        const lines = text.split('\n');  // 텍스트를 줄 단위로 분할
        console.log('lines' + lines);
        let found = false;
        
        for (let i = 0; i < lines.length; i++) {
            if (found) {  // "Mbps"를 포함하는 줄의 다음 줄을 저장하고 종료
                let lineText = lines[i];
                const parts = lineText.split(" ");
                const a = (parseFloat(parts[0]) / 100).toFixed(2);
                const b = (parseFloat(parts[1]) / 100).toFixed(2);
                result = {
                  dl: a,
                  ul: b
                }
                break;
            }
            if (lines[i].includes("Mbps")) {
                found = true;
            }
        }
  
        console.log("result:", result);
      }  catch (error) {
        console.error('Worker 예외:', error);
      } finally {
        await worker.terminate();
      }
  
      // 여기서 처리 완료 후 응답을 보내거나 다른 작업을 수행할 수 있습니다.
      res.send(result);
    } catch (error) {
      console.error('전체 예외:', error);
      res.status(500).send('서버 내부 오류');
    }
  });

module.exports = router;
