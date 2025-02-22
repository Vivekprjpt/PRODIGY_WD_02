const timeDisplay = document.getElementById('timeDisplay');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('lapsContainer');

let time = 0;
let isRunning = false;
let intervalId = null;

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
}

function updateTime() {
    time += 10;
    timeDisplay.textContent = formatTime(time);
}

function startStopwatch() {
    if (!isRunning) {
        intervalId = setInterval(updateTime, 10);
        startPauseBtn.textContent = 'Pause';
        timeDisplay.style.animation = 'pulse 1s infinite';
        isRunning = true;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(intervalId);
        startPauseBtn.textContent = 'Start';
        timeDisplay.style.animation = 'none';
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(intervalId);
    time = 0;
    isRunning = false;
    timeDisplay.textContent = formatTime(time);
    startPauseBtn.textContent = 'Start';
    timeDisplay.style.animation = 'none';
    lapsContainer.innerHTML = '';
}

function addLap() {
    if (isRunning) {
        const lapTime = formatTime(time);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
        lapsContainer.insertBefore(lapItem, lapsContainer.firstChild);
    }
}

// Event Listeners
startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', addLap);