import { formatTime } from './utils.js';
import { saveState, loadState } from './storage.js';

let startTime, elapsedTime = 0, timerInterval;
let isRunning = false;
let mode = "stopwatch";
let lapCounter = 1;

const display = document.getElementById("display");

function updateDisplay(ms) {
    display.textContent = formatTime(ms);
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay(elapsedTime);
    }, 10);
}

function startTimer(duration) {
    try {
        const endTime = Date.now() + duration;
        timerInterval = setInterval(() => {
            const remaining = endTime - Date.now();
            if (remaining <= 0) {
                clearInterval(timerInterval);
                updateDisplay(0);
                document.getElementById("beep").play();
                showMessage("⏰ Timer zakończony!");
                isRunning = false;
            } else {
                updateDisplay(remaining);
            }
        }, 10);
    } catch (e) {
        console.error("Błąd w odliczaniu timera:", e);
    }
}

document.getElementById("startBtn").onclick = () => {
    if (isRunning) return;
    isRunning = true;

    if (mode === "stopwatch") {
        startStopwatch();
    } else {
        const sanitize = (value) => Math.max(0, parseInt(value) || 0);

        const min = sanitize(document.getElementById("minutesInput").value);
        const sec = sanitize(document.getElementById("secondsInput").value);

        const totalMs = (min * 60 + sec) * 1000;
        startTimer(totalMs);
    }
};

document.getElementById("pauseBtn").onclick = () => {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timerInterval);
};

document.getElementById("resetBtn").onclick = () => {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapCounter = 1;
    updateDisplay(0);
    document.getElementById("laps").innerHTML = "";
    save();
};

document.getElementById("lapBtn").onclick = () => {
    if (!isRunning || mode !== "stopwatch") return;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapCounter++}: ${display.textContent}`;
    document.getElementById("laps").appendChild(li);
    save();
};

document.querySelectorAll('input[name="mode"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        mode = e.target.value;
        document.getElementById("timerInput").classList.toggle("hidden", mode === "stopwatch");
        elapsedTime = 0;
        updateDisplay(0);
        clearInterval(timerInterval);
        isRunning = false;
        save();
    });
});

document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
        document.getElementById("startBtn").click();
    } else if (e.code === "KeyR") {
        document.getElementById("resetBtn").click();
    } else if (e.code === "KeyL") {
        document.getElementById("lapBtn").click();
    }
});

function save() {
    const laps = Array.from(document.querySelectorAll("#laps li")).map(li => li.textContent);
    saveState(laps, mode);
}

function restore() {
    const { laps, mode: savedMode } = loadState();
    laps.forEach(text => {
        const li = document.createElement("li");
        li.textContent = text;
        document.getElementById("laps").appendChild(li);
    });
    document.querySelector(`input[value="${savedMode}"]`).checked = true;
    mode = savedMode;
    document.getElementById("timerInput").classList.toggle("hidden", mode === "stopwatch");
}

async function fetchQuote() {
    try {
        const res = await fetch("https://api.quotable.io/random");
        const data = await res.json();
        document.getElementById("quote").textContent = `"${data.content}" – ${data.author}`;
    } catch (err) {
        console.error("Błąd pobierania cytatu:", err);
    }
}

function showMessage(text) {
    const msg = document.createElement("div");
    msg.className = "alert";
    msg.textContent = text;
    document.getElementById("messages").appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
}

restore();
updateDisplay(0);
fetchQuote();
