const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(cors({
    origin: true,
    credentials: true
}))

// 이미지 저장해서 불러오는 것
app.get('/test', ((req, res)=>{
    const MAX_INDEX = 50000;
    const IMAGE_INDEX = 3;
    /*
    * 기존에 데이터 싹 날리는 로직
    * */

    for(let i = 0 ; i < MAX_INDEX; i++) {
        let randomIndex = 1;
        /*
        * 난수 생성 로직
        * */
        const result = fs.readFileSync(`./img/${randomIndex}.png`, {encoding: 'base64'});
        console.log(result); // img -> base64
        /*
        * DB INSERT logic
        * */
    }
    res.send("어서오세요");
}))

// app.post('/test',((req, res)=>{
//     console.log(req.body);
// }))

app.listen(3000, ()=>{
    console.log("Server On");
})