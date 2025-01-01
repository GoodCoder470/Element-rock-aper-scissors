let playerScore = 0;
let computerScore = 0;
let highScore = localStorage.getItem('highScore') || 0;
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
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

function updateLeaderboard(score) {
    const existingPlayer = leaderboard.find(entry => entry.username === username);
    if (existingPlayer) {
        existingPlayer.score = score;
    } else {
        leaderboard.push({ username, score });
    }
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5); // Keep only top 5 scores
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    displayLeaderboard();
}

function displayLeaderboard() {
    const leaderboardTable = document.getElementById('leaderboard').getElementsByTagName('tbody')[0];
    leaderboardTable.innerHTML = '';
    leaderboard.forEach((entry, index) => {
        const row = leaderboardTable.insertRow();
        const cellRank = row.insertCell(0);
        const cellPlayer = row.insertCell(1);
        const cellScore = row.insertCell(2);
        cellRank.innerText = index + 1;
        cellPlayer.innerText = entry.username;
        cellScore.innerText = entry.score;
    });
}

function displayHighScore() {
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
        displayHighScore();
    }
});