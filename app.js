function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}

const player = document.querySelector("#player");
const coin = document.querySelector("#coin");
const scoreDisplay = document.querySelector("#score");
const message = document.querySelector("#message");
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");
const coinSound = document.querySelector("#coinSound");
const winSound = document.querySelector("#winSound");
const bgMusic = document.querySelector("#bgMusic");

let score = 0;
let gameRunning = false;
const WIN_SCORE = 20;
const moveStep = 30;
let moveX = 0;
let moveY = 0;

function unpx(pos) {
  if (!pos) return 100;
  return parseInt(pos.slice(0, -2));
}

function moveCoin() {
  const x = Math.random() * (window.innerWidth - 80);
  const y = Math.random() * (window.innerHeight - 80);
  coin.style.left = `${x}px`;
  coin.style.top = `${y}px`;
}

function updateScore() {
  scoreDisplay.innerText = `Score: ${score}`;
}

function endGame() {
  gameRunning = false;
  winSound.play();
  bgMusic.pause();
  message.style.display = "block";
  message.innerText = "🎉 YOU WIN 🎉";
  restartBtn.style.display = "block";
}

function resetGame() {
  score = 0;
  updateScore();
  message.style.display = "none";
  restartBtn.style.display = "none";
  player.style.top = "300px";
  player.style.left = "200px";
  moveCoin();
  gameRunning = true;
  bgMusic.currentTime = 0;
  bgMusic.play();
}

function startGame() {
  startBtn.style.display = "none";
  resetGame();
}

// smooth player movement loop
function smoothMove() {
  if (!gameRunning) return;
  const currTop = unpx(player.style.top);
  const currLeft = unpx(player.style.left);

  let newTop = currTop + moveY;
  let newLeft = currLeft + moveX;

  // boundaries
  newTop = Math.max(0, Math.min(window.innerHeight - 100, newTop));
  newLeft = Math.max(0, Math.min(window.innerWidth - 100, newLeft));

  player.style.top = `${newTop}px`;
  player.style.left = `${newLeft}px`;

  // check coin touch
  if (isTouching(player, coin)) {
    coinSound.currentTime = 0;
    coinSound.play();
    moveCoin();
    score++;
    updateScore();
    if (score >= WIN_SCORE) endGame();
  }

  requestAnimationFrame(smoothMove);
}

// keyboard
window.addEventListener("keydown", (e) => {
  if (!gameRunning) return;
  switch (e.key) {
    case "ArrowUp":
      moveY = -moveStep;
      break;
    case "ArrowDown":
      moveY = moveStep;
      break;
    case "ArrowLeft":
      moveX = -moveStep;
      player.style.transform = "scale(-1, 1)";
      break;
    case "ArrowRight":
      moveX = moveStep;
      player.style.transform = "scale(1, 1)";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  moveX = 0;
  moveY = 0;
});

startBtn.addEventListener("click", () => {
  startGame();
  smoothMove();
});

restartBtn.addEventListener("click", () => {
  resetGame();
  smoothMove();
});

moveCoin();
updateScore();
