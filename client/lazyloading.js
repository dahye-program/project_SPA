window.addEventListener("load", () => {
    const test = new Test();
});

class Test {
    boxElement = [];

    constructor() {
        this.boxElement = document.querySelectorAll('.image');
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

    handleIntersect(entries, observer) {
        entries.forEach((entry) => {

            if(entry.isIntersecting){
                let randomIndex = Math.floor(Math.random() * 5) + 1;
                entry.target.setAttribute('src', `./img/${randomIndex}.jpg`.concat());
            }

        });
    }
}
