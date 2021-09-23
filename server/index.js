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
        });

        // DB 기존 데이터 싹 날리는 로직
        for (let i = 0; i < MAX_INDEX; i++) {
            let randomIndex = 1;
            // 난수 생성 로직

            // 서버의 이미지 Base64 형식으로 불러오기
            const result = await imageToBase64(`./img/${randomIndex}.png`);

            // 이미지 DB에 INSERT
            con.connect(function (err) {
                if (err) throw err;
                console.log("Connected!");
                // const sql = "INSERT INTO userinfo(ID, PW, Name, Sex) VALUES()";
            })
        }
        res.send("어서오세요");
    })
)

app.listen(3000, () => {
    console.log("Server On");
})