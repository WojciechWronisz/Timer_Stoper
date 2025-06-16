export function saveState(laps, mode) {
    try {
        localStorage.setItem("lapList", JSON.stringify(laps));
        localStorage.setItem("mode", mode);
    } catch (err) {
        console.error("Błąd zapisu do localStorage:", err);
    }
}

export function loadState() {
    try {
        const laps = JSON.parse(localStorage.getItem("lapList")) || [];
        const mode = localStorage.getItem("mode") || "stopwatch";
        return { laps, mode };
    } catch (err) {
        console.error("Błąd odczytu z localStorage:", err);
        return { laps: [], mode: "stopwatch" };
    }
}
function incrementUsageCounter() {
    const current = parseInt(localStorage.getItem("launchCount") || "0");
    localStorage.setItem("launchCount", current + 1);
    console.log(`🔁 Liczba uruchomień aplikacji: ${current + 1}`);
}

incrementUsageCounter();
function logAction(action) {
    console.log(`🧭 [${new Date().toLocaleTimeString()}] ${action}`);
}

