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

const isMobile = window.matchMedia("only screen and (max-width: 768px)").matches || (window.matchMedia("only screen and (max-width: 768px)").matches &&(userAgentString.indexOf("Chrome") > -1));

console.log(isMobile);

if (isMobile) {
    let element = document.querySelector(".about-body-item");
    let attributes = [...element.attributes];
    attributes.forEach(attr => {
        if (attr.name !== "class") {
            element.removeAttribute(attr.name);
        }
    });

    element = document.querySelector(".skills");
    attributes = [...element.attributes];
    attributes.forEach(attr => {
        if (attr.name !== "class") {
            element.removeAttribute(attr.name);
        }
    });
}

// Intersection Observer

const options = {
    root: null,
    rootMargin: "25px",
    threshold: 0.1
};

const aboutMe = document.querySelector("#about");
const aboutObs = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            gsap.fromTo(".about-body-item", {opacity: 0, x: "-10%"}, {duration: 1.5, x: 0, opacity: 1, display: "block"});
            gsap.fromTo(".skills", {opacity: 0, x: "10%"}, {duration: 1.5, x: 0, opacity: 1, display: "block"});
        } else {
            gsap.fromTo(".about-body-item", {x: 0, opacity: 1}, {duration: 0.1, x: "-10%", opacity: 0, display: "none"});
            gsap.fromTo(".skills", {opacity: 1, x: 0}, {duration: 0.1, x: "-10%", opacity: 0, display: "none"});
        }
    })
}, options);

aboutObs.observe(aboutMe);
