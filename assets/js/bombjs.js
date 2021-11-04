/* Variables */

//Stores all necessary elements in variables.
const buttons = document.querySelectorAll(".button");
const newButton = document.querySelector(".restart-button");
const bombTimer = document.querySelector(".bomb-timer");
const bombCombination = document.querySelector(".bomb-combination");
const gameResult = document.querySelector(".result");
const timerReduce = document.querySelector(".reduce");
const nextButton = document.querySelector(".next-game");

//Stores all audio files in variables.
const plantAudio = document.querySelector(".planted");
const inputAudio = document.querySelector(".input");
const defusedAudio = document.querySelector(".defused");
const explosionAudio = document.querySelector(".explosion");
const ticksAudio = document.querySelector(".ticks");

//Necessary variables for the game.
let interval;
let interval1;
let counter;
let numbers;
let game;
let result;
let lastBut;
let sec;

/*AddEventListeners*/

//Starts a new game.
newButton.addEventListener('click', StartNewGame);

//Makes sure the buttons work when pressed.
for (let i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', (e) => {
        //Checks if a game has been started
        if (game) {
            inputAudio.play();
            //Switch case statement that checks how many numbers have been given and if the chosen number is correct.
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

/*Functions*/

//Start a new game, resetting all variables.
function StartNewGame() {
    //Sets up all variable for a new game.
    counter = 0;
    numbers = Randomize();
    game = true;
    bombCombination.textContent = "";
    console.clear();

    console.log("Unique randomized numbers : " + numbers);

    //Gets rid of the winner/loser indicator if played has played match already.
    if (result) {
        gameResult.classList.remove("winner");
    } else if (!result) {
        gameResult.classList.remove("loser");
    }

    TimerUpdate();
    plantAudio.play();
}

//Chooses 4 random and unique numbers(int) to use as the answer to the combination of the bomb.
function Randomize() {
    let numbers = [Math.floor(Math.random() * 10)];

    //While loop that keeps looping until the array numbers[] has 4 unique numbers.
    while(numbers.length < 4){
        let r = Math.floor(Math.random() * 10);
        let count = 0

        //Loops through all the numbers of the array to make sure the new number isn't a duplicate.
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

//Updates the timer if new game has been started.
function TimerUpdate() {
    sec = 221;

    //setInterval function that keeps on looping until there's either no time left or the player wins.
    interval = setInterval(function() {
        sec--;

        if (sec <= 0) {
            bombTimer.textContent = 0 + "s";
        } else {
            bombTimer.textContent = sec + "s";
        }

        if (sec <= 24) {
            ticksAudio.play();
        }

        if (sec <= 0) {
            Lose();
        }
    }, 1000);
}

//Function for if the player put in the correct answer.
function Correct(input) {
    counter++

    if (lastBut) {
        lastBut.classList.remove("button-incorrect");
    }

    bombCombination.textContent += input;
}

//Resets the correct answer counter and reduces the total time left.
function False(but) {
    buttons[but].classList.add("button-incorrect");

    if (lastBut) {
        lastBut.classList.remove("button-incorrect");
    }

    lastBut = buttons[but];
    bombCombination.textContent = "";

    //Switch case statement that reduces the total time left depending on how many correct answers the player has given already.
    switch (counter) {
        case 0: 
            reduce = 5;
            ReduceTimer(reduce);
            break;
        case 1:
            reduce = 7;
            ReduceTimer(reduce);
            break;
        case 2:
            reduce = 12;
            ReduceTimer(reduce);
            break;
        case 3:
            reduce = 20;
            ReduceTimer(reduce);
            break;
    }

    counter = 0;
}

//Updates the timer if wrong number has been answered.
function ReduceTimer(time) {
    let toggle = 0;
    sec -= reduce;

    timerReduce.textContent = "-" + time;
    timerReduce.classList.add("visible")

    //setInterval function it's core purpose is to make the time penalty indicator disappear.
    interval1 = setInterval(function() {
        timerReduce.classList.remove("visible");
        toggle++;

        if(toggle >= 1) {
            clearInterval(interval1);
        }
    }, 1000);
}

//Runs if player has won.
function Win() {
    clearInterval(interval);

    ticksAudio.pause();
    ticksAudio.currentTime = 0;

    defusedAudio.play();

    gameResult.classList.add("winner");
    gameResult.textContent = "Winner!";

    nextButton.classList.add("visible");

    game = false;
    result = true;
}

//Stops the game because the player has no time left.
function Lose() {
    clearInterval(interval);

    explosionAudio.play();

    ticksAudio.pause();
    ticksAudio.currentTime = 0;

    gameResult.textContent = "Loser!";
    gameResult.classList.add("loser");

    game = false;
    result = false;
}


console.log("js loaded");