const ROWS = 6;
const COLS = 5;
let currentRow = 0;
let currentCol = 0;
let secretWord = "";
let gameOver = false;

const grid = document.getElementById("grid");
const messageEl = document.getElementById("message");
const guesses = Array(ROWS).fill().map(() => Array(COLS).fill(""));

// Initialize game grid
function initGrid() {
    for (let r = 0; r < ROWS; r++) {
        const rowDiv = document.createElement("div");
        rowDiv.className = "row";
        for (let c = 0; c < COLS; c++) {
            const tileDiv = document.createElement("div");
            tileDiv.className = "tile";
            tileDiv.setAttribute("id", `r-${r}-c-${c}`);
            rowDiv.appendChild(tileDiv);
        }
        grid.appendChild(rowDiv);
    }
}

// Fetch the daily word from the text file
async function fetchSecretWord() {
    try {
        const response = await fetch('today.txt');
        const text = await response.text();
        secretWord = text.trim().toUpperCase().substring(0, 5);
        if (secretWord.length !== 5) {
            showMessage("Error: Secret word must be 5 letters.");
        }
    } catch (err) {
        showMessage("Error loading daily word.");
    }
}

function showMessage(msg) {
    messageEl.textContent = msg;
}

// Handle typing mechanics
document.addEventListener("keydown", (e) => {
    if (gameOver || secretWord.length !== 5) return;

    if (e.key === "Enter") {
        if (currentCol === COLS) {
            checkGuess();
        } else {
            showMessage("Not enough letters");
        }
    } else if (e.key === "Backspace") {
        if (currentCol > 0) {
            currentCol--;
            guesses[currentRow][currentCol] = "";
            const tile = document.getElementById(`r-${currentRow}-c-${currentCol}`);
            tile.textContent = "";
            tile.classList.remove("filled");
            showMessage("");
        }
    } else if (/^[a-zA-Z]$/.test(e.key)) {
        if (currentCol < COLS) {
            guesses[currentRow][currentCol] = e.key.toUpperCase();
            const tile = document.getElementById(`r-${currentRow}-c-${currentCol}`);
            tile.textContent = e.key.toUpperCase();
            tile.classList.add("filled");
            currentCol++;
        }
    }
});

function checkGuess() {
    const guess = guesses[currentRow].join("");
    
    // Check letter match cases
    for (let i = 0; i < COLS; i++) {
        const tile = document.getElementById(`r-${currentRow}-c-${i}`);
        const letter = guess[i];

        if (secretWord[i] === letter) {
            tile.classList.add("correct");
        } else if (secretWord.includes(letter)) {
            tile.classList.add("present");
        } else {
            tile.classList.add("absent");
        }
    }

    if (guess === secretWord) {
        showMessage("Splendid! You won! 🎉");
        gameOver = true;
        return;
    }

    if (currentRow === ROWS - 1) {
        showMessage(`Game Over! The word was: ${secretWord}`);
        gameOver = true;
        return;
    }

    currentRow++;
    currentCol = 0;
}

// Startup
initGrid();
fetchSecretWord();