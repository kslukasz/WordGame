class RandomPhrase {
    constructor() {
        this.arrayOfPhrase = ["bez ciekawości nie ma mądrości", "lepiej z mądrym zgubić niż z głupim znaleźć", "mądry Polak po szkodzie", "fortuna kołem się toczy"]
        this.phraseRandom = this.getRandom();
    }
    getRandom() {
        let index = Math.floor(Math.random() * this.arrayOfPhrase.length);
        return this.arrayOfPhrase[index];
    }
}
class Hiden {
    constructor(phrase) {
        this.phrase = [...phrase];
        this.hidenPhrase = [];
        this.hidenPhraseCreate();
    }
    hidenPhraseCreate() {
        this.phrase.forEach((element, i) => {
            this.hidenPhrase.push(`<span class="hide">&nbsp</span>`);
        })
    }
}
class ShowHiden {
    constructor(arrayHiden) {
        this.arrayHiden = arrayHiden;
    }
    arrayToString() {
        let stringResult = "";
        this.arrayHiden.forEach(element => {
            stringResult += element;
        });
        return stringResult;
    }
}
class Choice {
    constructor(letter, phraseRandom, hiden) {
        this.letter = letter;
        this.phraseRandom = [...phraseRandom];
        this.hiden = hiden;
    }
    compare() {
        this.phraseRandom.forEach((element, i) => {
            if (element === this.letter) {
                this.hiden[i] = element;
            }
        })
        return this.hiden;
    }
}
class Game {
    constructor() {
        this.randomWords = (new RandomPhrase().phraseRandom).toUpperCase();
        this.hiden = new Hiden(this.randomWords).hidenPhrase;
        this.showHiden = new ShowHiden(this.hiden);
        this.mystery = document.querySelector(".mystery");
        document.querySelector("button.check").addEventListener("click", this.checkResult.bind(this));
    }
    showGame(stringResult = "Gra Zgadnij przysłowie") {
        this.mystery.innerHTML = stringResult;
    }
    checkResult() {
        this.letter = document.querySelector(".one").value.toUpperCase();
        this.choice = new Choice(this.letter, this.randomWords, this.hiden).compare();
        this.choiceToString = new ShowHiden(this.choice).arrayToString();
        this.showGame(this.choiceToString);
    }
    startGame() {
        this.letter = " ";
        this.choice = new Choice(this.letter, this.randomWords, this.hiden).compare();
        this.choiceToString = new ShowHiden(this.choice).arrayToString();
        this.showGame(this.choiceToString);
    }
}
const newGame = new Game();
newGame.showGame();
newGame.startGame();
