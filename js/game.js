document.addEventListener('DOMContentLoaded', () => {
    const gameStart = document.getElementById('gameStart');
    const gameTarget = document.getElementById('gameTarget');
    const gameScore = document.getElementById('gameScore');
    const gameTimer = document.getElementById('gameTimer');

    let score = 0;
    let time = 30;
    let active = false;
    let timer;

    gameStart.addEventListener('click', () => {
        if (active) return;

        active = true;
        score = 0;
        time = 30;
        gameScore.textContent = score;
        gameTimer.textContent = time;
        gameStart.textContent = "Playing...";
        gameStart.disabled = true;

        timer = setInterval(() => {
            time--;
            gameTimer.textContent = time;
            if (time === 0) endGame();
        }, 1000);
    });

    gameTarget.addEventListener('click', () => {
        if (!active) return;
        score++;
        gameScore.textContent = score;
    });

    function endGame() {
        active = false;
        clearInterval(timer);
        gameStart.textContent = "Play Again";
        gameStart.disabled = false;
        alert(`Game Over! Score: ${score}`);
    }
});
