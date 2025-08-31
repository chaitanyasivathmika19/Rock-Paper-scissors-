let userScore = 0;
let compScore = 0;
let currentRound = 0;
let maxAttempts = 3; // Default, but you should update this dynamically based on dropdown
let gameOver = false;
 
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");


const genCompChoice = () => {
    const options = ["rock","paper","scissors"]; 
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
    //rock, paper, scissors
}

const draw = () => {
    console.log("Game was Draw...");
    msg.innerText = "Game was Draw. Play Again..";
    msg.style.backgroundColor = "#081b31";
}

const showWinner = (userWin, choiceId, compChoice) => {
    if(userWin){
        userscore++;
        userScorePara.innerText = userscore;
        console.log("You Win!!...");
        msg.innerText = `You Win! Your ${choiceId} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else{
        comscore++;
        compScorePara.innerText = comscore;
        console.log("You Lose!!..");
        msg.innerText = `You Lose! ${compChoice} beats Your ${choiceId}`;
        msg.style.backgroundColor = "red";
    }
}

function setAttempts(value) {
    maxAttempts = parseInt(value);
    resetGame();
}
// // my code
// const playGame = (choiceId) => {

//     console.log("user Choice = ",choiceId);
//     document.getElementById("user-choice").innerHTML = choiceId;
//     // Generate Computer choie -> modular way of programming 
//     const compChoice = genCompChoice();
//     console.log("comp choice = ",compChoice);
//     document.getElementById("comp-choice").innerText = compChoice;

//     if(choiceId === compChoice){
//         //Draw
//         draw();
//     } else {
//         let userWin = true;
//         if(choiceId === "rock"){
//             userWin = compChoice === "paper" ? false : true;
//         }
//         else if(choiceId === "paper"){
//             userWin = compChoice === "scissors" ? false : true;
//         } else{
//             userWin = compChoice === "rock" ? false : true;
//         }
//         showWinner(userWin, choiceId, compChoice);
//     }



// }

// rectified code cgc
const playGame = (choiceId) => {
    if (gameOver) return;

    console.log("user Choice = ", choiceId);
    document.getElementById("user-choice").innerHTML = choiceId;

    const compChoice = genCompChoice();
    console.log("comp choice = ", compChoice);
    document.getElementById("comp-choice").innerText = compChoice;

    if (choiceId === compChoice) {
        // Draw - do not count attempt
        draw();
        return;
    } else {
        let userWin = true;
        if (choiceId === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (choiceId === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, choiceId, compChoice);

        // Count only non-draw attempt
        currentAttempt++;

        if (currentAttempt >= maxAttempts) {
            gameOver = true;
            showFinalResult();
        }
    }
};

//cgc
function declareFinalWinner() {
    const msgContainer = document.querySelector(".msg-container");
    let finalMsg = "";

    if (userScore > compScore) {
        finalMsg = "🎉 Game Over! You Win!";
    } else if (compScore > userScore) {
        finalMsg = "💻 Game Over! Computer Wins!";
    } else {
        finalMsg = "🤝 Game Over! It's a Draw!";
    }
}
//cg
function showFinalResult() {
    const msg = document.querySelector(".msg-container");
    let finalMessage = "";

    if (userScore > compScore) {
        finalMessage = "🎉 Game Over! You Win!";
    } else if (compScore > userScore) {
        finalMessage = "💻 Game Over! Computer Wins!";
    } else {
        finalMessage = "🤝 Game Over! It's a Draw!";
    }

    msg.innerText = finalMessage;
    msg.style.backgroundColor = "#222";
    msg.style.color = "#fff";
    msg.style.padding = "1rem";
    msg.style.borderRadius = "10px";
}



choices.forEach( (choice) => {
    choice.addEventListener("click" , () => {
        const choiceId = choice.getAttribute("id");
        console.log("choice was clicked "+choiceId);
        playGame(choiceId);
    });
});

// let maxAttempts = 3;
let currentAttempts = 0;

const attemptsSelect = document.getElementById("attempts");
const themeSelect = document.getElementById("theme");
const resetBtn = document.getElementById("reset-btn");

// Update attempts when dropdown changes
attemptsSelect.addEventListener("change", () => {
    maxAttempts = parseInt(attemptsSelect.value);
    resetGame();
});

// Theme toggle
themeSelect.addEventListener("change", () => {
    document.body.classList.toggle("dark", themeSelect.value === "dark");
});

// Reset
resetBtn.addEventListener("click", resetGame);

// Override playGame while keeping original logic
const originalPlayGameFn = playGame;

// playGame = (choiceId) => {
//     if (currentAttempts >= maxAttempts) {
//         msg.innerText = "Game Over! Please reset to play again.";
//         return;
//     }

//     const prevUserScore = userscore;
//     const prevCompScore = comscore;

//     originalPlayGameFn(choiceId);

//     if (userscore !== prevUserScore || comscore !== prevCompScore) {
//         currentAttempts++;
//     }

//     if (currentAttempts >= maxAttempts) {
//         msg.innerText += " 🎯 Attempts over!";
//     }
// };

// Reset Game
function resetGame() {
    userscore = 0;
    comscore = 0;
    currentAttempts = 0;
    document.getElementById("user-score").innerText = 0;
    document.getElementById("comp-score").innerText = 0;
    document.getElementById("user-choice").innerText = "";
    document.getElementById("comp-choice").innerText = "";
    msg.innerText = "Game Reset. Start playing!";
}
