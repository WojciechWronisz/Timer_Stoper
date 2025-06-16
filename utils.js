/**
 * Formatuje czas w milisekundach do postaci mm:ss.cs
 * @param {number} ms - Czas w milisekundach
 * @returns {string} Sformatowany czas
 */

export function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${minutes}:${seconds}.${centiseconds}`;
}
