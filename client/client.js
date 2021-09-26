class Main{
    #dom
    constructor(dom) {
        this.#dom = dom;
        this.insertEvent();
        this.selectEvent();
    }

    insertEvent(){
        this.#dom.querySelector('.INSERT').addEventListener('click',  async ()=>{
             //console.log('insert click');
            const response = await fetch('http://localhost:3000/test');
        })
    }

    selectEvent(){
        this.#dom.querySelector('.SELECT').addEventListener('click',  async ()=>{
            //console.log('select click');
            const response = await fetch('http://localhost:3000/img');
            if (response.status === 200) {
                const result = JSON.parse(await response.text());

            }
        })
    }

}

// 어떤 버튼을 누르면 (프론트)
// 서버에 특정 경로로 요청이 가고
// 그러면 서버에 저장되어 있는 이미지를 불러와서
// 이미지를 base64 로 변환 한 후에
// RDS혹은 MySQL에다가 그 값을 넣는다~
// 이걸 For문으로 졸라반복