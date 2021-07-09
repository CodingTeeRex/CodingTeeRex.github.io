class bouncingLetters {
    constructor(targetElement) {
        this.targetElement = targetElement;
        this.insertHTML();
        this.animate();
    }

    insertHTML() {
        let text = this.targetElement.innerHTML;
        console.log(text);
        let updatedText = ""
        for (let i = 0; i < text.length; i++) {
            if (text[i] == ' ') {
                updatedText += '<span>&nbsp</span>';
            } else {
                updatedText += `<span id="bounce">${text[i]}</span>`
            }
        }
        this.targetElement.innerHTML = updatedText;
        console.log(this.targetElement.innerHTML);
    }

    animate() {
        const element = document.querySelectorAll("#bounce");
        element.forEach((e) => {
            console.log("ele: " + e.innerHTML);
            e.addEventListener("mouseover", () => {
                console.log("mouseover " + e.innerHTML);
            }, false)
        })
    }
}

// const targetElement = document.querySelector(".about-font");
// new bouncingLetters(targetElement);

// const target = document.querySelector("#bounce");

// target.addEventListener("click", () => {
//     alert("Mouseover Test");
// });

// Intersection Observer
const aboutSection = document.querySelector("#about");
console.log(aboutSection);