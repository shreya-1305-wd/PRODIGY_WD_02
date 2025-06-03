let startTime = 0;
let elapsedTime = 0;
let interval;
let isRunning = false;

const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

document.getElementById('startBtn').addEventListener('click', start);
document.getElementById('pauseBtn').addEventListener('click', pause);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', lap);

function formatTime(ms) {
  const date = new Date(ms);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
  const time = Date.now() - startTime + elapsedTime;
  display.textContent = formatTime(time);
}

function start() {
  if (isRunning) return;
  startTime = Date.now();
  interval = setInterval(updateDisplay, 10);
  isRunning = true;
}

function pause() {
  if (!isRunning) return;
  elapsedTime += Date.now() - startTime;
  clearInterval(interval);
  isRunning = false;
}

function reset() {
  clearInterval(interval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = '00:00:00:000';
  lapsContainer.innerHTML = '';
}

function lap() {
  if (!isRunning) return;
  const lapTime = display.textContent;
  const lapElement = document.createElement('div');
  lapElement.classList.add('lap');
  lapElement.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
  lapsContainer.prepend(lapElement);
}
