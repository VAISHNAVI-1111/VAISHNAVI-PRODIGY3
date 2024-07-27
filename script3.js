let startTime, updatedTime, difference, t;
let running = false;
let lapCount = 1;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        t = setInterval(updateTime, 10);
        running = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const formattedTime = 
        (hours < 10 ? "0" + hours : hours) + ":" + 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds);

    display.innerHTML = formattedTime;
}

function pauseTimer() {
    clearInterval(t);
    running = false;
}

function resetTimer() {
    clearInterval(t);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    lapsList.innerHTML = "";
    lapCount = 1;
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.textContent = Lap ${lapCount}: ${lapTime};
        lapsList.appendChild(lapItem);
        lapCount++;
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);