class TypeWriter {
    constructor(textElement, mainText, wait = 3000) {
        this.textElement = textElement;
        this.mainText = mainText;
        this.wait = wait;
        this.txt = '';
        this.isMainTextComplete = false;
        this.isDeleting = false;
        this.wordBank = ['Ivan', 'CodingTeeRex'];
        this.currentWordIdx = 0;
        this.type();
    }

    type() {
        if (!this.isMainTextComplete) {
            // Type main text

            let typeSpeed = 50;

            const typeMain = (typeSpeed) => {
                console.log("Typing Main Text");
                this.txt = this.mainText.substring(0, this.txt.length + 1);
                console.log("this.txt: " + this.txt);
                
                // Insert word into HTML
                this.textElement.innerHTML = `<span id="main-title">${this.txt}</span>`;

                if (this.txt === this.mainText) {
                    typeSpeed = 800;
                    this.isMainTextComplete = true;
                }
                setTimeout(() => this.type(), typeSpeed);
            }

            typeMain(typeSpeed);
            console.log(this.isMainTextComplete);
        } else {
            console.log("Main Text Complete");
            console.log(this.txt);

            // Type secondary text
            this.txt = '';
            const index = this.currentWordIdx % this.wordBank.length; // get idx of current word in wordBank
            const currentWord = this.wordBank[index]; // get current word
            console.log("Current Idx: " + index + "\n" + "Current Word: " + currentWord);

            if (!this.isDeleting) {
                console.log("Not Deleting");
                this.txt = currentWord.substring(0, this.txt.length + 1);
                console.log("before");
                console.log("this.txt: " + this.txt);
                console.log("after");
            } else {
                console.log("Deleting");
                this.txt = currentWord.substring(0, this.txt.length - 1);
                console.log("this.txt: " + this.txt);
            }
            
            // Insert secondary text into HTML
            // this.textElement = document.querySelector('.welcome-title');
            console.log("Type Sec");
            this.textElement = document.getElementById('main-title');
            this.textElement.innerHTML += `${this.txt}`;
            console.log(this.isMainTextComplete);

            setTimeout(() => this.type(), typeSpeed);

            if (!this.isDeleting && this.txt === currentWord) {
                console.log("del");
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                console.log("!del");
                this.currentWordIdx++;
                typeSpeed = 3000;
            }
            
            
        }
    }
}

const init = () => {
    const txtElement = document.querySelector('.welcome-title');
    const displayTextMain = "Hello, my name is ";
    new TypeWriter(txtElement, displayTextMain);
    console.log("init");
}

document.addEventListener('DOMContentLoaded', init);