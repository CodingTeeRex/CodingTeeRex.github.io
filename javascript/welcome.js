class TypeWriter {
    constructor(targetElement, mainText, wait = 1500) {
        this.targetElement = targetElement;
        this.mainText = mainText;
        this.wait = wait;
        this.txt = '';
        this.isMainTextComplete = false;
        this.isDeleting = false;
        this.wordBank = ['Ivan!', 'CodingTeeRex!'];
        this.currentWordIdx = 0;
        this.type();
    }

    type() {
        let typeSpeed = 50;
        if (!this.isMainTextComplete) {
            // Type main text

            console.log("Typing Main Text");
            this.txt = this.mainText.substring(0, this.txt.length + 1);
            console.log(this.txt.length);
            console.log("this.txt: " + this.txt);
            
            // Insert word into HTML
            this.targetElement.innerHTML = `<span id="main-title">${this.txt}</span>`;

            if (this.txt === this.mainText) {
                typeSpeed = 800;
                this.isMainTextComplete = true;
                this.txt = ''
                console.log(this.isMainTextComplete);
            }

        } else {
            typeSpeed = 100;
            console.log("Main Text Complete");
            console.log(this.txt);

            // Type secondary text
            const index = this.currentWordIdx % this.wordBank.length; // get idx of current word in wordBank
            const currentWord = this.wordBank[index]; // get current word
            console.log("Current Idx: " + index + "\n" + "Current Word: " + currentWord);

            if (this.isDeleting) {
                typeSpeed /= 2;

                this.txt = currentWord.substring(0, this.txt.length - 1);
                console.log("this.txt: " + this.txt);
            } else {
                this.txt = currentWord.substring(0, this.txt.length + 1);
                console.log("this.txt: " + this.txt);
            }
            
            // Insert secondary text into HTML
            this.targetElement = document.getElementById('main-title');
            this.targetElement.innerHTML = `<span>${this.mainText}<span id="names">${this.txt}</span></span>`;

            if (!this.isDeleting && this.txt === currentWord) {
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.currentWordIdx++;
                typeSpeed = 3000;
            }
        }
        setTimeout(() => this.type(), typeSpeed);
    }
}

class bounceEffect {
    constructor(targetElement) {
        this.targetElement = targetElement;
        this.bounce();
    }

    bounce() {
        const text = this.targetElement.innerHTML;
        this.targetElement.innerHTML = "";
        let updatedText = "";

        for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ')
                updatedText += `<span>&nbsp</span>`;
            updatedText += `<span id="bounce">${text.charAt(i)}</span>`;
        }
        //console.log(updatedText);

        this.targetElement.innerHTML = updatedText;
        console.log(this.targetElement.innerHTML);

        let letters = document.querySelectorAll('#bounce')
        console.log(letters);

        let j = 0;

        function applyBounce() {
            setTimeout(() => {
                letters[j].className = "anim-bounce";
                j++;
                if (j < letters.length) {
                    applyBounce();
                }
            }, 30)
        }
        applyBounce();
        
        console.log(this.targetElement.innerHTML);
        console.log(document.querySelectorAll('anim-bounce'));
    }
}

// Intro animations
const timeline = gsap.timeline({defaults: {ease: 'power1.out'}});

// timeline.to('.text', {opacity: '0'}, {opacity: 1, duration: 0.1})
timeline.to('.text', {y: '0%', duration: .8, stagger: .6});
timeline.to('.intro', {opacity: '0', duration: 1, display: "none"});

const intro = document.querySelector(".intro");
setTimeout(() => {
    intro.remove();
}, 3500);

timeline.fromTo('body', {overflow: 'hidden'}, {overflow: 'visible'})
timeline.fromTo('header', {opacity: '0'}, {opacity: 1, duration: 1});
timeline.fromTo('.welcome-title', {opacity: '0'}, {opacity: 1, duration: 0.1});
// timeline.fromTo('.welcome-title', {opacity: '0'}, {opacity: 1, duration: 1});
timeline.fromTo('.welcome-subtitle', {opacity: '0'}, {opacity: 1, duration: 1, delay: 4});

// Start TypeWriter
setTimeout(() => {
    const welcome = document.querySelector('.welcome-title');
    const displayTextMain = "Hello, My name is ";
    new TypeWriter(welcome, displayTextMain);
}, 6000);
