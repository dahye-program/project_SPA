class Main {
    #dom
    #table
    #tableData
    #childData

    constructor(dom) {
        this.#dom = dom;
        this.#table = dom.querySelector(".table");
        this.#insertEvent();
        this.#selectListener();
    }

    #prepareDom() {
        // document => 연결된 문서 전역으로 접근 가능
        const t_img = document.querySelector('.template-image');
        const td_img = document.querySelector('.template-data');
        // t_img의 content 활성화
        const template = document.importNode(t_img.content, true);
        const template_ = document.importNode(td_img.content, true);

        this.#tableData = template.querySelector('.table-row');
        this.#childData = template_.querySelector('.img-data');
        this.#table.appendChild(template);
    }

    #insertEvent() { // 이미지 DB에 INSERT
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
        let result;
        const response = await fetch('http://localhost:3000/img');
        if (response.status === 200) {
            result = JSON.parse(await response.text());
            for (let i = 0; i < result.length/5; i++) {
                this.#prepareDom();
                const imageDom = this.#childData.querySelector('.Image');
                this.insertRowIndex(imageDom ,result[i].img);
                this.#tableData.appendChild(this.#childData)
            }
        }
    }

    insertRowIndex(imgDom, data) {
        const dataFilter = 'data:image/png;base64, ';
        imgDom.setAttribute('src', dataFilter.concat(data))
    }
}
