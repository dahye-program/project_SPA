const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');
const imageToBase64 = require('image-to-base64');

app.use(cors({
    origin: true,
    credentials: true
}))

// 이미지 저장해서 불러오는 것
app.get('/test', (async (req, res) => {
        console.info("반갑다 친구! 왔구나! ");
        const MAX_INDEX = 50000;
        const IMAGE_INDEX = 3;

        // DB Connection
        const con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "aws_test"
            // table이름: img64 로 할건데..
        });

        // DB 기존 데이터 싹 날리는 로직
        // TRUNCATE TABLE img64 : img64 테이블 안의 데이터 모두 삭제

        for (let i = 0; i < MAX_INDEX; i++) {
            // 1부터 3사이의 난수 생성 로직
            let randomIndex = Math.floor(Math.random()*3)+1;

            // 서버의 이미지 Base64 형식으로 불러오기
            const result = await imageToBase64(`./img/${randomIndex}.png`);

            // 이미지 DB에 INSERT
            con.connect(function (err) {
                if (err) throw err;
                console.log("Connected!");
                // const sql = "INSERT INTO img64(value) VALUES(result)";
            })
        }
        res.send("어서오세요");
    })
)

app.listen(3000, () => {
    console.log("Server On");
})