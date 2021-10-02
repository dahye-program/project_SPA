window.addEventListener("load", () => {
    const test = new Test();
});

let imgData = [];

class Test {
    boxElement = [];
    prevRatio

    constructor() {
        this.boxElement = document.querySelectorAll('.image');
        this.prevRatio = 0.0;
        imgData.push('');
        this.getImageData();
        this.createObserver();
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

    // Callback 함수를 Promise 로
    handleIntersect(entries, observer) {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                let randomIndex = Math.floor(Math.random() * 5) + 1;
                entry.target.setAttribute('src', `./img/${randomIndex}.jpg`.concat());
            }
        });
    }

    async getImageData() {
        const res = await fetch('http://localhost:3000/img');
        if (res.status === 200) {
            imgData = JSON.parse(await res.text());
            return true;
        }
        throw new Error('Server Connection Error');
    }
}
