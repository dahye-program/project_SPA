window.addEventListener("load", () => {
    //const test = new Main();
});

let result;

class Main {
    #dom

    boxElement = [];

    constructor(dom) {
        this.#dom = dom;
        this.#insertListener();
        this.#selectListener();
        this.boxElement = document.querySelectorAll('.img-data');
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
            result = JSON.parse(await response.text());
            this.createObserver();
        }
    }

    createObserver() {
        let observer;
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.8
        };
        observer = new IntersectionObserver(this.handleIntersect, options);
        this.boxElement.forEach(image => observer.observe(image));
    }

    handleIntersect(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('src', 'data:image/png;base64, '.concat(result.img));
            }
        });
    }
}

