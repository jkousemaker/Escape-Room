/* To do:
    1. Improve styling.
    2. Photoshop buttons of original picture.
*/

const buttons = document.querySelectorAll(".button");
const newButton = document.querySelector(".restart-button");
const bombTimer = document.querySelector(".bomb-timer");
const bombCombination = document.querySelector(".bomb-combination");
const gameResult = document.querySelector(".result");
const timerReduce = document.querySelector(".reduce");

const plantAudio = document.querySelector(".planted");
const inputAudio = document.querySelector(".input");
const defusedAudio = document.querySelector(".defused");
const explosionAudio = document.querySelector(".explosion");
const ticksAudio = document.querySelector(".ticks");

let interval;
let interval1;
let counter;
let numbers;
let game;
let result;
let lastBut;
let sec;

/*addEventListeners*/

//Starts a new game.
newButton.addEventListener('click', StartNewGame);


for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', (e) => {
        if (game) {
            inputAudio.play();
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
    plantAudio.play();
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
    sec = 40;
    interval = setInterval(function() {
        sec--;
        bombTimer.textContent = sec + "s";
        console.log(sec);
        if (sec <= 24) {
            ticksAudio.play();
        }
        if (sec <= 0) {
            console.log("Time over.");
            Lose();
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
    console.log("false");
    buttons[but].classList.add("button-incorrect");
    if (lastBut) {
        lastBut.classList.remove("button-incorrect");
    }
    lastBut = buttons[but];
    bombCombination.textContent = "";

    switch (counter) {
        case 0: 
            reduce = 10;
            ReduceTimer(reduce);
            break;
        case 1:
            reduce = 15;
            ReduceTimer(reduce);
            break;
        case 2:
            reduce = 25;
            ReduceTimer(reduce);
            break;
        case 3:
            reduce = 30;
            ReduceTimer(reduce);
            break;
    }

    counter = 0;
}

function ReduceTimer(time) {
    let toggle = 0;
    sec -= reduce;
    timerReduce.textContent = "-" + time;
    timerReduce.classList.add("visible")
    interval1 = setInterval(function() {
        timerReduce.classList.remove("visible");
        toggle++;
        console.log(toggle);
        if(toggle >= 1) {
            clearInterval(interval1);
        }
    }, 1000);
}

//Runs if player has won.
function Win() {
    clearInterval(interval);
    console.log("you've won");
    ticksAudio.pause();
    ticksAudio.currentTime = 0;
    defusedAudio.play();
    gameResult.classList.add("winner");
    gameResult.textContent = "Winner!";
    game = false;
    result = true;
}

//Stops the game because the player has no time left.
function Lose() {
    clearInterval(interval);

    explosionAudio.play();
    ticksAudio.pause();
    ticksAudio.currentTime = 0;

    console.log("you've lost");
    gameResult.textContent = "Loser!";
    gameResult.classList.add("loser");
    game = false;
    result = false;
}


console.log("js loaded");