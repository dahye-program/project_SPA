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
        const MAX_INDEX = 50000;
        const IMAGE_INDEX = 3;
        try {
            // DB Connection
            connection= mysql.createConnection({
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
            const result = await connection.query(`
                INSERT INTO test (id, name)
                VALUES (1, 'qwe');
            `)
        } catch {
            throw new Error("INSERT 실패");
        }
        // DB 기존 데이터 싹 날리는 로직
        // TRUNCATE TABLE img64 : img64 테이블 안의 데이터 모두 삭제

        // for (let i = 0; i < MAX_INDEX; i++) {
        //     // 1부터 3사이의 난수 생성 로직
        //     let randomIndex = Math.floor(Math.random()*3)+1;
        //
        //     // 서버의 이미지 Base64 형식으로 불러오기
        //     const result = imageToBase64(`./img/${randomIndex}.png`);
        //
        // }
        res.send("어서오세요");
    })
)

app.listen(3000, () => {
    console.log("Server On");
})