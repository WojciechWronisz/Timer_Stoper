import { formatTime } from './utils.js';

function assertEqual(actual, expected, msg) {
    if (actual !== expected) {
        console.error(`❌ ${msg} → expected: ${expected}, got: ${actual}`);
    } else {
        console.log(`✅ ${msg}`);
    }
}

// TEST: formatTime
assertEqual(formatTime(0), "00:00.00", "Zero time");
assertEqual(formatTime(61500), "01:01.50", "Normal time");
assertEqual(formatTime(3600000), "60:00.00", "One hour");

console.log("🧪 Testy zakończone.");
