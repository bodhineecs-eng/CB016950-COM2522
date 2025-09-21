let timer;              // interval ID
let timeLeft = 0;       // time left in seconds
let isPaused = false;   // track pause state

// DOM elements
const minutesInput = document.getElementById("minutes");
const timeDisplay = document.getElementById("timeDisplay");
const startBtn = document.getElementById("startTimer");
const stopBtn = document.getElementById("BiniTimer");
const pauseBtn = document.getElementById("PauseTimer");
const resumeBtn = document.getElementById("ResumeTimer");

// Format seconds into MM:SS
function formatTime(seconds) {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Start Timer
startBtn.addEventListener("click", () => {
    clearInterval(timer);  // reset if already running
    let minutes = parseInt(minutesInput.value);
    if (isNaN(minutes) || minutes <= 0) {
        alert("Please enter valid minutes!");
        return;
    }
    timeLeft = minutes * 60;  // convert to seconds
    timeDisplay.textContent = formatTime(timeLeft);

    timer = setInterval(() => {
        if (!isPaused && timeLeft > 0) {
            timeLeft--;
            timeDisplay.textContent = formatTime(timeLeft);
        }
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Meditation complete 🌿");
        }
    }, 1000);
});

// Stop Timer (reset everything)
stopBtn.addEventListener("click", () => {
    clearInterval(timer);
    timeLeft = 0;
    timeDisplay.textContent = "00:00";
});

// Pause Timer
pauseBtn.addEventListener("click", () => {
    isPaused = true;
});

// Resume Timer
resumeBtn.addEventListener("click", () => {
    if (timeLeft > 0) {
        isPaused = false;
    }
});
