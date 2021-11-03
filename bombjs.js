/* To do:
    1. Add sound effects for win/lose and button press.
    2. Improve button styling.
    3. Fix "Loser" Position.
    4. Photoshop buttons of original picture.
*/

const buttons = document.querySelectorAll(".button");
const newButton = document.querySelector(".restart-button");
const bombTimer = document.querySelector(".bomb-timer");
const bombCombination = document.querySelector(".bomb-combination");
const gameResult = document.querySelector(".result");
let interval;
let counter;
let numbers;
let game;
let result;
let lastBut;

/*addEventListeners*/

//Starts a new game.
newButton.addEventListener('click', StartNewGame);


for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', (e) => {
        if (game) {
            switch(counter) {
                case 0: if(buttons[i].textContent == numbers[0]) {
                    Correct(buttons[i].textContent);
                    break;
                } else {
                    False(i);
                    break;
                };
                case 1: if(buttons[i].textContent == numbers[1]) {
                    Correct(buttons[i].textContent);
                    break;
                } else {
                    False(i);
                    break;
                };
                case 2: if(buttons[i].textContent == numbers[2]) {
                    Correct(buttons[i].textContent);
                    break;
                } else {
                    False(i);
                    break;
                };
                case 3: if(buttons[i].textContent == numbers[3]) {
                    Correct(buttons[i].textContent);
                    Win();
                    break;
                } else {
                    False(i);
                    break;
                };
            }
        } else {
            alert("You have to start a game!");
        }
    })
}

/*functions*/

//Start a new game, resetting all variables.
function StartNewGame() {
    counter = 0;
    numbers = Randomize();
    console.log("Unique randomized numbers : " + numbers);
    game = true;
    if (result) {
        gameResult.classList.remove("winner");
    } else if (!result) {
        gameResult.classList.remove("loser");
    }
    bombCombination.textContent = "";
    TimerUpdate();
}

//Chooses 4 random and unique numbers(int) to use as the answer to the combination of the bomb.
function Randomize() {
    let numbers = [Math.floor(Math.random() * 10)];
    while(numbers.length < 4){
        let r = Math.floor(Math.random() * 10);
        let count = 0

        for (let i = 0; i < numbers.length; i++) {
            if(r != numbers[i]) {
                count++;
            }
        }

        if (count == numbers.length) {
            numbers.push(r);
        }
    }
    return numbers;
}

function TimerUpdate() {
    let sec = 101;
    interval = setInterval(function() {
        sec--;
        bombTimer.textContent = sec + "s";
        console.log(sec);
        if (sec == 0) {
            console.log("Time over.");
            Lose();
            clearInterval(interval);
        }
    }, 1000);
}

function Correct(input) {
    counter++
    console.log("correct");
    if (lastBut) {
        lastBut.classList.remove("button-incorrect");
    }
    bombCombination.textContent += input;
}

//Resets the correct answer counter and reduces the total time left.
function False(but) {
    counter = 0;
    console.log("false");
    buttons[but].classList.add("button-incorrect");
    if (lastBut) {
        lastBut.classList.remove("button-incorrect");
    }
    lastBut = buttons[but];
    bombCombination.textContent = "";
}

//Runs if player has won.
function Win() {
    clearInterval(interval);
    console.log("you've won");
    gameResult.classList.add("winner");
    gameResult.textContent = "Winner!";
    game = false;
    result = true;
}

//Stops the game because the player has no time left.
function Lose() {
    console.log("you've lost");
    gameResult.textContent = "Loser!";
    gameResult.classList.add("loser");
    game = false;
    result = false;
}


console.log("js loaded");