 const timerDisplay = document.getElementById("timer");
const modeDisplay = document.getElementById("mode");
const music = document.getElementById("battle-music");
music.playbackRate = 2.5; 



const focusTime = 25 * 60; // 25 mins
const breakTime = 5 * 60;  // 5 mins
let time = focusTime;

let isRunning = false;
let isFocus = true;
let interval;

function updateDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    music.play(); // 🔊 Start music on first user interaction

    isRunning = true;
    interval = setInterval(() => {
      if (time > 0) {
        time--;
        updateDisplay();
      } else {
        clearInterval(interval);
        isRunning = false;
        isFocus = !isFocus;
        time = isFocus ? focusTime : breakTime;
        modeDisplay.textContent = isFocus ? "Focus Mode" : "Break Time!";
        triggerAttackAnimation(); // ⚡ Attack animation
        startTimer(); // restart for the new mode
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(interval);
  isRunning = false;
  music.pause(); // 🛑 Pause music if user pauses timer
}


function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  time = isFocus ? focusTime : breakTime;
  updateDisplay();
}

updateDisplay();

const energyBall = document.getElementById("energyBall");

function triggerAttackAnimation() {
  energyBall.style.display = "block";
  energyBall.style.left = "80%";
  energyBall.style.top = "20%";
  energyBall.style.animation = "energyAttack 1s linear forwards";

  setTimeout(() => {
    energyBall.style.display = "none";
    energyBall.style.animation = "";
  }, 1000);
}
