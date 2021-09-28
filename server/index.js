const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const imageToBase64 = require('image-to-base64');

app.use(cors({
    origin: true,
    credentials: true
}))

app.get('/test', (async (req, res) => {
        let connection;
        const MAX_INDEX = 20000;
        try {
            connection = mysql.createConnection({
                host: "aws-testdb.cuvxnrywexkb.ap-northeast-2.rds.amazonaws.com",
                port: 3306,
                user: "dahye",
                password: "dahye0729",
                database: "dahye_testdb"
            });
        } catch {
            throw new Error("연결 실패");
        }
        connection.connect();
        // try {
        //     await connection.query(`
        //         TRUNCATE TABLE img64
        //     `)
        // } catch {
        //     throw new Error("기존 데이터를 못지웠어요..");
        // }
        for (let i = 0; i < 5000; i++) {
            let randomIndex = Math.floor(Math.random() * 3) + 1;
            const result = await imageToBase64(`./img/${randomIndex}.png`);
            await connection.query(`
                INSERT INTO img64(img)
                VALUES (${connection.escape(result)})
            `)
            console.info(i, "삽입 완료 ");
        }
        res.send(true);
    })
)

app.get('/img', (async (req, res) => {
        let connection;
        try {
            // DB Connection
            connection = mysql.createConnection({
                host: "aws-testdb.cuvxnrywexkb.ap-northeast-2.rds.amazonaws.com",
                port: 3306,
                user: "dahye",
                password: "dahye0729",
                database: "dahye_testdb"
            });
        } catch {
            throw new Error("연결 실패");
        }
        connection.connect();
        const result = await connection.query(`
            SELECT img
            FROM img64
            WHERE id <= 3000`, (err, result, fields) => {
                res.send(JSON.stringify(result));
        });
    })
)
app.listen(3000, () => {
    console.log("Server On");
})