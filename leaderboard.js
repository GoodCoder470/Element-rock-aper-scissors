let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

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