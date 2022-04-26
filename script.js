/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const gameUI = document.querySelector('#game'),
    minNumUI = document.querySelector('.min-num'),
    maxNumUI = document.querySelector('.max-num'),
    guessBtnUI = document.querySelector('#guess-btn'),
    guessInputUI = document.querySelector('#guess-input'),
    messageUI = document.querySelector('.message');

// Assign Min and Max
minNumUI.textContent = min;
maxNumUI.textContent = max;

// Play again event listener
gameUI.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

// Listen for guess
guessBtnUI.addEventListener('click', function() {
    let guess = parseInt(guessInputUI.value);

    // Validate input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}.`, 'red')
    } else {

        // Check if won
        if (guess === winningNum) {
            // Game over - won
            gameOver(true, `${winningNum} is correct.`)
        } else {
            // Wrong guess
            guessesLeft -= 1;
            
            if (guessesLeft === 0) {
                // Game over - lost
                gameOver(false, `Game over. You lost, the correct answer is ${winningNum}.`)
            } else {
                // Game continues - wrong answer
                // Change border color
                guessInputUI.style.borderColor = 'red';
                
                //   clear input field
                guessInputUI.value = '';
                //   Alert player guess is wrong
                setMessage(`${guess} is incorrect, ${guessesLeft} guesses left.`, 'red')
            }
        }
    };
});

// Game over function
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';
    // Game over - won
        // Disable input
        guessInputUI.disabled = true;
        // Change border color
        guessInputUI.style.borderColor = color;
        messageUI.style.color = color;
        // Set Message
        setMessage(msg);

        // Play again?
        guessBtnUI.value = 'Play again';
        guessBtnUI.className += 'play-again';
}

// Get winning number
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// Set message
function setMessage(msg, color) {
    messageUI.style.color = color
    messageUI.textContent = msg;
}