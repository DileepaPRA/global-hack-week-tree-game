const startBtn = document.getElementById('startBtn');
const plantBtn = document.getElementById('plantBtn');
const gameSection = document.getElementById('game');
const treeCountEl = document.getElementById('treeCount');

let treeCount = 0;

startBtn.addEventListener('click', () => {
  gameSection.classList.remove('hidden');
  startBtn.disabled = true;
});

plantBtn.addEventListener('click', () => {
  treeCount += 1;
  treeCountEl.textContent = treeCount;
});
