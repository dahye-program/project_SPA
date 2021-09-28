class Main {
    #dom
    #table
    #tableData
    #childData
    #templateFlag
    constructor(dom) {
        this.#dom = dom;
        this.#table = dom.querySelector(".table");
        this.#insertListener();
        this.#selectListener();
        this.#prepareTableRowDom();
    }

    #prepareTableDataDom() {
        const td_img = document.querySelector('.template-data');
        const template_ = document.importNode(td_img.content, true);
        this.#childData = template_.querySelector('.img-data');
    }

    #prepareTableRowDom(){ // 5개씩 출력 위함
        const t_img = document.querySelector('.template-image');
        const template = document.importNode(t_img.content, true);
        this.#tableData = template.querySelector('.table-row');
        this.#table.appendChild(template);
    }

    #insertListener() { // 이미지 DB에 INSERT
        this.#dom.querySelector('.INSERT').addEventListener('click', async () => {
            await fetch('http://localhost:3000/test');
        })
    }

    #selectListener() { // 서버에서 이미지 받아와서 출력
        this.#dom.querySelector('.SELECT').addEventListener('click', async () => {
            await this.#selectEvent();
        })
    }

    async #selectEvent() {
        const response = await fetch('http://localhost:3000/img');
        if (response.status === 200) {
            const result = JSON.parse(await response.text());
            let imageData = result.shift();
            const loopCount = result.length % 5 === 0 ? result.length / 5 : result.length / 5 + 1;
            for (let i = 0; i <= Math.floor(loopCount); i++) {
                for(let j=0; j< 5 ; j++){
                    this.#prepareTableDataDom();
                    const imageDom = this.#childData.querySelector('.Image');
                    this.insertImage(imageDom ,imageData.img);
                    this.#tableData.appendChild(this.#childData);
                    imageData = result.shift();
                }
                this.#prepareTableRowDom();
            }
        }
    }

    insertImage(imgDom, data) {
        imgDom.setAttribute('src', 'data:image/png;base64, '.concat(data))
    }
}
