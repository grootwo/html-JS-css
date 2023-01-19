const clockText = document.querySelector(".clock");

// 초마다 현재 시:분:초를 나타내기
function printClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    clockText.innerText = `${hours}:${minutes}:${seconds}`;
}

printClock();
setInterval(printClock, 1000);