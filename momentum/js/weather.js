const weather = document.querySelector(".weather span:nth-child(1)");
const city = document.querySelector(".weather span:nth-child(2)");

function geoSuccess(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    console.log("you're in", latitude, longitude);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    fetch(url).then((response) => response.json()).then((data) => {
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp} cel`;
    });
}

function geoError() {
    alert("Can't find your geolocation's information")
}

navigator.geolocation.getCurrentPosition(geoSuccess, geoError)