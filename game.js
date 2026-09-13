const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const plantBtn = document.getElementById('plantBtn');
const waterBtn = document.getElementById('waterBtn');
const gameSection = document.getElementById('game');
const treeCountEl = document.getElementById('treeCount');
const scoreEl = document.getElementById('score');
const timeLeftEl = document.getElementById('timeLeft');
const waterMeter = document.getElementById('waterMeter');
const growthMeter = document.getElementById('growthMeter');
const eventLog = document.getElementById('eventLog');

let treeCount = 0;
let score = 0;
let water = 60;
let growth = 0;
let timeLeft = 45;
let timerId = null;
let isRunning = false;

function updateUi() {
  treeCountEl.textContent = treeCount;
  scoreEl.textContent = score;
  timeLeftEl.textContent = timeLeft;
  waterMeter.value = water;
  growthMeter.value = growth;
}

function setMessage(message) {
  eventLog.textContent = message;
}

function endGame() {
  isRunning = false;
  clearInterval(timerId);
  timerId = null;
  startBtn.disabled = false;
  startBtn.textContent = 'Play Again';
  setMessage(`Time is up! Final score: ${score}.`);
}

function tick() {
  if (!isRunning) {
    return;
  }

  timeLeft -= 1;
  water = Math.max(0, water - (3 + treeCount));

  if (treeCount > 0 && water > 0) {
    growth = Math.min(100, growth + treeCount * 4);
    score += treeCount;
  }

  if (growth >= 100) {
    growth = 0;
    treeCount += 1;
    score += 15;
    setMessage('A mature tree spread new seeds! +1 tree');
  } else if (water === 0 && treeCount > 0 && Math.random() < 0.4) {
    treeCount -= 1;
    setMessage('Drought damaged your forest. You lost a tree.');
  } else if (timeLeft % 8 === 0 && Math.random() < 0.3) {
    water = Math.max(0, water - 15);
    setMessage('A heatwave hit! Water dropped by 15.');
  }

  updateUi();

  if (timeLeft <= 0) {
    endGame();
  }
}

function resetGame() {
  treeCount = 0;
  score = 0;
  water = 60;
  growth = 0;
  timeLeft = 45;
  updateUi();
  setMessage('Plant saplings and keep water above zero to score points.');
}

function startGame() {
  if (isRunning) {
    return;
  }

  resetGame();
  isRunning = true;
  gameSection.classList.remove('hidden');
  restartBtn.classList.remove('hidden');
  startBtn.disabled = true;
  timerId = setInterval(tick, 1000);
}

startBtn.addEventListener('click', () => {
  startGame();
});

restartBtn.addEventListener('click', () => {
  clearInterval(timerId);
  timerId = null;
  isRunning = false;
  startGame();
});

plantBtn.addEventListener('click', () => {
  if (!isRunning) {
    setMessage('Press Start Game first.');
    return;
  }

  if (water < 10) {
    setMessage('Not enough water to plant right now.');
    return;
  }

  treeCount += 1;
  water -= 10;
  score += 10;
  setMessage('You planted a new sapling. +10 points');
  updateUi();
});

waterBtn.addEventListener('click', () => {
  if (!isRunning) {
    setMessage('Press Start Game first.');
    return;
  }

  water = Math.min(100, water + 20);
  score = Math.max(0, score - 2);
  setMessage('You watered the forest. Water +20, score -2.');
  updateUi();
});
