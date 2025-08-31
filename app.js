let userScore = 0;
let compScore = 0;
let maxAttempts = 3;
let currentAttempts = 0;

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const msg = document.querySelector("#msg");
const attemptsLeftDisplay = document.createElement("p");
attemptsLeftDisplay.id = "attempts-left";
attemptsLeftDisplay.style.fontWeight = "bold";
document.querySelector(".controls").appendChild(attemptsLeftDisplay);

// Set attempts from dropdown
function setAttempts(value) {
    maxAttempts = parseInt(value);
    resetGame();
}

// Theme change
document.getElementById("theme").addEventListener("change", function () {
    if (this.value === "dark") {
        document.body.classList.add("dark");
        attemptsLeftEl.style.color = "#000";
    } else {
        document.body.classList.remove("dark");
        attemptsLeftEl.style.color = "#000"
    }
});

// Generate computer choice
function genCompChoice() {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

// Handle winner
function showWinner(userWin, userChoice, compChoice) {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lose! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}

// Draw
function draw() {
    msg.innerText = "It's a Draw!";
    msg.style.backgroundColor = "#081b31";
}

// Update attempts left display
function updateAttemptsLeft() {
    attemptsLeftDisplay.innerText = `Attempts Left: ${maxAttempts - currentAttempts}`;
}

// Final winner after all attempts
function declareFinalWinner() {
    if (userScore > compScore) {
        msg.innerText = "🎉 Game Over! You are the Final Winner!";
        msg.style.backgroundColor = "green";
    } else if (compScore > userScore) {
        msg.innerText = "💻 Game Over! Computer Wins the Game!";
        msg.style.backgroundColor = "red";
    } else {
        msg.innerText = "🤝 Game Over! It's a Tie!";
        msg.style.backgroundColor = "#555";
    }
}

// Main game
function playGame(choiceId) {
    if (currentAttempts >= maxAttempts) {
        msg.innerText = "Game Over! Reset to play again.";
        return;
    }

    document.getElementById("user-choice").innerText = choiceId;
    const compChoice = genCompChoice();
    document.getElementById("comp-choice").innerText = compChoice;

    if (choiceId === compChoice) {
        draw(); // draw doesn't count as attempt
        return;
    }

    let userWin = true;
    if (choiceId === "rock") {
        userWin = compChoice !== "paper";
    } else if (choiceId === "paper") {
        userWin = compChoice !== "scissors";
    } else {
        userWin = compChoice !== "rock";
    }

    showWinner(userWin, choiceId, compChoice);
    currentAttempts++;
    updateAttemptsLeft();

    if (currentAttempts >= maxAttempts) {
        declareFinalWinner();
    }
}

// Reset game
function resetGame() {
    userScore = 0;
    compScore = 0;
    currentAttempts = 0;
    userScorePara.innerText = 0;
    compScorePara.innerText = 0;
    msg.innerText = "Play your Move";
    msg.style.backgroundColor = "#081b31";
    document.getElementById("user-choice").innerText = "";
    document.getElementById("comp-choice").innerText = "";
    updateAttemptsLeft();
}

// Add event listeners
document.querySelectorAll(".choice").forEach(choice => {
    choice.addEventListener("click", () => playGame(choice.id));
});

document.getElementById("reset-btn").addEventListener("click", resetGame);

// Initialize display
updateAttemptsLeft();
