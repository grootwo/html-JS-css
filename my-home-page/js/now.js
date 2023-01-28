const today = document.querySelector(".today");
const clock = document.querySelector(".clock");
const weather = document.querySelector(".weather");
const city = document.querySelector(".city");

function setToday() {
    const dateObj = new Date();
    const year = String(dateObj.getFullYear());
    const month = String(dateObj.getMonth() + 1).padStart("2", "0");
    const date = String(dateObj.getDate()).padStart("2", "0");
    let day = dateObj.getDay();
    if (day == 0) {
        day = "일";
    } else if (day == 1) {
        day = "월";
    } else if (day == 2) {
        day = "화";
    } else if (day == 3) {
        day = "수";
    } else if (day == 4) {
        day = "목";
    } else if (day == 5) {
        day = "금";
    } else {
        day = "토";
    }
    today.innerText = `${year.slice(2, 4)}.${month}.${date}.${day}`;
}

setToday();