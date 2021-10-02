const increasingColor = "rgba(40, 40, 190, ratio)"
const decreasingColor = "rgba(190, 40, 40, ratio)"

window.addEventListener("load",()=>{
    console.log("되냐?");
    const test = new Test();});

class Test{
    boxElement
    prevRatio
    constructor() {
        console.log("Object");
        this.boxElement = document.querySelector('#box');
        this.prevRatio = 0.0
        this.createObserver();
    }
    createObserver(){
        let observer;
        let options = {
            root : null,
            rootMargin :"0px",
            threshold: this.buildThresholdList()
        };
        observer = new IntersectionObserver(this.handleIntersect, options);
        observer.observe(this.boxElement);
    }

    handleIntersect(entries, observer){
        entries.forEach((entry) => {
            if (entry.intersectionRatio > this.prevRatio) {
                entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
            } else {
                entry.target.style.backgroundColor = decreasingColor.replace("ratio", entry.intersectionRatio);
            }
            this.prevRatio = entry.intersectionRatio;
        });
    }

    buildThresholdList() {
        let thresholds = [];
        let numSteps = 20;

        for (let i=1; i<=numSteps; i++) {
            let ratio = i/numSteps;
            thresholds.push(ratio);
        }
        thresholds.push(0);
        return thresholds;
    }
}