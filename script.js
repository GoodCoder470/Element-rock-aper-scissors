let playerScore = 0;
let computerScore = 0;
let highScore = localStorage.getItem('highScore') || 0;
let username = localStorage.getItem('username') || '';

function startGame() {
    username = document.getElementById('username').value;
    const errorMessage = document.getElementById('error-message');
    if (username.trim() === '') {
        alert('Please enter a username');
        return;
    }
    const existingPlayer = leaderboard.find(entry => entry.username === username);
    if (existingPlayer) {
        errorMessage.style.display = 'block';
        return;
    }
    errorMessage.style.display = 'none';
    localStorage.setItem('username', username);
    document.getElementById('username-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    displayLeaderboard();
    displayHighScore();
}

function playGame(playerChoice) {
    const choices = ['Water', 'Earth', 'Fire', 'Air'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = '';

    if (playerChoice === computerChoice) {
        result = "It's a tie!";
    } else if (
        (playerChoice === 'Water' && computerChoice === 'Earth') ||
        (playerChoice === 'Earth' && computerChoice === 'Fire') ||
        (playerChoice === 'Fire' && computerChoice === 'Air') ||
        (playerChoice === 'Air' && computerChoice === 'Water')
    ) {
        result = `You win! ${playerChoice} beats ${computerChoice}.`;
        playerScore++;
    } else {
        result = `You lose! ${computerChoice} beats ${playerChoice}.`;
        computerScore++;
    }

    if (playerScore > highScore) {
        highScore = playerScore;
        localStorage.setItem('highScore', highScore);
    }

    document.getElementById('result').innerText = result;
    document.getElementById('score').innerText = `Player: ${playerScore} - Computer: ${computerScore}`;
    document.getElementById('highScore').innerText = `High Score: ${highScore}`;

    updateLeaderboard(playerScore);
}

function displayHighScore() {
    highScore = localStorage.getItem('highScore') || 0;
    document.getElementById('highScore').innerText = `High Score: ${highScore}`;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Display the username screen if no username is set
document.addEventListener('DOMContentLoaded', () => {
    if (username) {
        document.getElementById('username-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'block';
        displayLeaderboard();
    }
    displayHighScore();
});