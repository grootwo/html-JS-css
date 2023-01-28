const now = document.querySelector(".now");
const today = document.querySelector(".today");
const clock = document.querySelector(".clock");
const weather = document.querySelector(".weather");
const city = document.querySelector(".city");

const dateObj = new Date();

function setToday() {
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
function setClock() {
    const hour = String(dateObj.getHours()).padStart("2", "0");
    const minute = String(dateObj.getMinutes()).padStart("2", "0");
    clock.innerText = `${hour}:${minute}`;
}
function geoSuccess(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log("you're in", latitude, longitude);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    fetch(url).then((response) => response.json()).then((data) => {
        city.innerText = data.name;
        weather.innerText = `${data.main.temp} °C / ${data.weather[0].main}`;
    });
}
function geoError() {
    alert("위치 정보를 불러올 수 없습니다.");
    city.innerText = "지역 정보 없음";
    weather.innerText = `기온 / 날씨 정보 없음`;
}

setToday();
setClock();
setInterval(setClock, 30000);
navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

now.style.background = `linear-gradient(135deg, ${getRandomColor()} 0%, ${getRandomColor()} 100%)`;