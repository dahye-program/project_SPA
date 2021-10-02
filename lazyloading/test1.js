class Main{
    #dom

    constructor(dom) {
        this.#dom = dom;
        this.#scrollevent();
    }

    #scrollevent(){
        const images = document.querySelectorAll("image"); // 모든 이미지 파일 선택
        document.addEventListener("scroll", (event) => {
            images.forEach((img) => { // 각 이미지마다
                console.log("Scrolling...");
                const rect = img.getBoundingClientRect().top;
                if (rect <= document.innerHeight) { // 이미지가 보일 타이밍을 계산
                    const src = img.getAttribute("data-lazy"); // img 태그의 data-lazy에 저장해둔 이미지 경로를 붙여준다.
                    img.setAttribute("src", src);
                    img.classList.add("fade"); // 트랜지션 추가
                }
            });
        });
    }
}