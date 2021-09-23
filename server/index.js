const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const imageToBase64 = require('image-to-base64');

app.use(cors({
    origin: true,
    credentials: true
}))

// 이미지 저장해서 불러오는 것
app.get('/test', (async (req, res)=>{
    console.info("반갑다 친구! 왔구나! ");
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
        const result = await imageToBase64(`./img/${randomIndex}.png`);
        // console.log(result);

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