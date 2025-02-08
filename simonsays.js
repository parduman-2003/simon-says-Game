let gameSeq = [];
let userSeq = [];
let buttons = ["yellow", "red", "green", "purple"];
let started = false;
let level = 0;
let highScore = 0;

const h2 = document.querySelector("h2");
const scoreDisplay = document.querySelector(".score");
const highScoreDisplay = document.getElementById("high-score");
const allButtons = document.querySelectorAll(".btn");
const gameBody = document.getElementById("gamebody");

document.addEventListener("keypress", startGame);
document.querySelector(".score-btn").addEventListener("click", () => scoreDisplay.classList.remove("score-display"));
document.querySelector(".score-btn2").addEventListener("click", () => scoreDisplay.classList.add("score-display"));

// Add event listeners to the buttons for user interaction
allButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        const clickedColor = e.target.id;
        userSeq.push(clickedColor);
        animateButton(clickedColor);
        checkAnswer(userSeq.length - 1); // Check the answer when the user clicks
    });
});

// Start game function
function startGame() {
    if (!started) {
        started = true;
        level = 0;
        gameSeq = [];
        nextLevel();
    }
}

// Generate the next level sequence
function nextLevel() {
    userSeq = [];
    level++;
    h2.textContent = `Level ${level}`;
    const randomColor = buttons[Math.floor(Math.random() * 4)];
    gameSeq.push(randomColor);
    animateButton(randomColor);
}

// Animate button by adding the flash effect
function animateButton(color) {
    const button = document.getElementById(color);
    button.classList.add("flash");
    setTimeout(() => button.classList.remove("flash"), 250);
}

// User input checking
function checkAnswer(index) {
    if (userSeq[index] === gameSeq[index]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(nextLevel, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Score: <strong>${level}</strong>. Press Any Key to Restart`;
        updateHighScore();
        resetGame();
    }
}

// Update high score
function updateHighScore() {
    if (level > highScore) {
        highScore = level;
        highScoreDisplay.textContent = `Score: ${highScore}`;
    }
}

// Reset game after game over
function resetGame() {
    started = false;
    gameSeq = [];
    level = 0;
    gameBody.style.backgroundColor = "lightcoral"; // Flash red color
    setTimeout(() => gameBody.style.backgroundColor = "#fff7e6", 250);
}
