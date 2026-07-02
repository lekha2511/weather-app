const apiKey = "5abbbdee5d2b7b64243535c590cfad05";
setInterval(() => {
    const now = new Date();

    document.getElementById("datetime").innerHTML =
    `📅 ${now.toLocaleDateString()}
     🕒 ${now.toLocaleTimeString()}`;
}, 1000);

async function getWeather() {

    // Your weather code here

}

document.getElementById("city").addEventListener("keypress", function (e) {
    if (e.key === "Enter") getWeather();
});

function clearCity() {
    document.getElementById("city").value = "";
    document.getElementById("weather").innerHTML = "";
        document.body.className = "";
        document.body.style.backgroundImage = "url(https://wallpaperaccess.com/full/1540049.jpg)";

}

async function getWeather() {
    document.getElementById("weather").innerHTML = "<p>Loading...</p>";

    const city = document.getElementById("city").value.trim();
    if (!city) {
        document.getElementById("weather").innerHTML = "<p>Please enter a city name</p>";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod != 200) {
            document.getElementById("weather").innerHTML = "<p>City not found</p>";
            return;
        }

        let weather = data.weather[0].main;

        if (weather === "Clear") document.body.className = "sunny";
        else if (weather === "Clouds") document.body.className = "cloudy";
        else if (weather === "Rain") document.body.className = "rainy";
        else if (weather === "Thunderstorm") document.body.className = "storm";
        else if (weather === "Snow") document.body.className = "snowy";
        else document.body.className = "";

        document.getElementById("weather").innerHTML = `
            <div class="weather">
                <h2>${data.name}, ${data.sys.country}</h2>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>
                <div class="temp">${Math.round(data.main.temp)}°C</div>
                <div class="desc">${data.weather[0].description}</div>
                <div class="details">
                    <div class="card"><h3>💧 Humidity</h3><p>${data.main.humidity}%</p></div>
                    <div class="card"><h3>🌬 Wind Speed</h3><p>${data.wind.speed} m/s</p></div>
                    <div class="card"><h3>🌡 Feels Like</h3><p>${Math.round(data.main.feels_like)}°C</p></div>
                    <div class="card"><h3>📊 Pressure</h3><p>${data.main.pressure} hPa</p></div>
                    <div class="card"><h3>☁ Clouds</h3><p>${data.clouds.all}%</p></div>
                    <div class="card"><h3>👀 Visibility</h3><p>${data.visibility/1000} km</p></div>
                    <div class="card"><h3>🌅 Sunrise</h3><p>${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p></div>
                    <div class="card"><h3>🌇 Sunset</h3><p>${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p></div>
                    <div class="card"><h3>🌧 Precipitation</h3><p>${data.rain ? (data.rain["1h"] + " mm") : "0 mm"}</p></div>
                    <div class="card"><h3>📍 Coordinates</h3><p>${data.coord.lat}, ${data.coord.lon}</p></div>
                </div>
            </div>
        `;
    } catch (error) {
        document.getElementById("weather").innerHTML = "<p>Error fetching weather data</p>";
    }
}