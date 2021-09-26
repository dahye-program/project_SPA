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
        let connection;
        const MAX_INDEX = 300;
        const IMAGE_INDEX = 3;
        try {
            // DB Connection
            connection = mysql.createConnection({
                host: "aws-testdb.cuvxnrywexkb.ap-northeast-2.rds.amazonaws.com",
                port: 3306,
                user: "dahye",
                password: "dahye0729",
                database: "dahye_testdb"
                // table이름: img64 로 할건데..
            });
        } catch {
            throw new Error("연결 실패");
        }

        connection.connect();
        try {
            // DB 기존 데이터 싹 날리는 로직
            const result = await connection.query(`
                TRUNCATE TABLE img64
            `)
        } catch {
            throw new Error("기존 데이터를 못지웠어요..");
        }

        for (let i = 0; i < MAX_INDEX; i++) {
            // 1부터 3사이의 난수 생성 로직
            let randomIndex = Math.floor(Math.random() * 3) + 1;

            // 서버의 이미지 Base64 형식으로 불러오기
            const result = await imageToBase64(`./img/${randomIndex}.png`);
            // DB 삽입
            await connection.query(`
                INSERT INTO img64(img)
                VALUES (${connection.escape(result)})
            `)
        }
        console.info("삽입 성공");
        res.send("어서오세요");
    })
)

app.get('/img', (async (req, res) => {
        let connection;

        console.info("출력이.. 하고싶어? ");
        try {
            // DB Connection
            connection = mysql.createConnection({
                host: "aws-testdb.cuvxnrywexkb.ap-northeast-2.rds.amazonaws.com",
                port: 3306,
                user: "dahye",
                password: "dahye0729",
                database: "dahye_testdb"
                // table이름: img64 로 할건데..
            });
            // console.log("연결은 됐다.");
        } catch {
            throw new Error("연결 실패");
        }

        connection.connect();

        const result = await connection.query(`
            SELECT img
            FROM img64
            WHERE id <= 10`, (err, result, fields) => {
                res.send(JSON.stringify(result));
            })
    })
)
app.listen(3000, () => {
    console.log("Server On");
})