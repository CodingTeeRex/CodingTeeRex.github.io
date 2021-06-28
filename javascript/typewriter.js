class TypeWriter {
    constructor(textElement, mainText, wait = 1500) {
        this.textElement = textElement;
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
            this.textElement.innerHTML = `<span id="main-title">${this.txt}</span>`;

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
            this.textElement = document.getElementById('main-title');
            this.textElement.innerHTML = `<span>${this.mainText} ${this.txt}</span>`;

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

const init = () => {
    const txtElement = document.querySelector('.welcome-title');
    const displayTextMain = "Hello, my name is ";
    new TypeWriter(txtElement, displayTextMain);
    console.log("init");
}

document.addEventListener('DOMContentLoaded', init);