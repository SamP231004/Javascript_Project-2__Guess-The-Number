// +1 as we dont want 0 and *100 bcoz want from 1-100 not 0-1 and parseInt bcoz we want integers
let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p')

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if(playGame) {
    submit.addEventListener('click', function(sam) {
        sam.preventDefault();
        const guess = parseInt(userInput.value);    
        console.log(guess);
        validateGuess(guess);
    })
}

function validateGuess(guess) {
    if(isNaN(guess)) {
        alert("Please add a valid nubmer.")
    }
    else if (guess < 1 || guess > 100) {
        alert("Please enter a number between 1 to 100.")
    }
    else {
        prevGuess.push(guess)
        if(numGuess >= 10) {
            displayGuess(guess)
            displayMessage(`Game Over. Random Number was ${randomNumber}`)
            endGame()
        }
        else {
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess) {
    if(guess === randomNumber) {
        displayMessage(`You guessed it right`);
        endGame();
    }
    else if (guess < randomNumber) {
        displayMessage(`Guessed number is low.`);
    }
    else if (guess > randomNumber) {
        displayMessage(`Guessed number is high.`);
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess} `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h4>${message}</h4>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start a new Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click', function(sam) {
        randomNumber = console.log(parseInt(Math.random() * 100 + 1));
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = ''
        remaining.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    })
}