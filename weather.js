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
        document.body.style.backgroundImage = "url(https://img.freepik.com/premium-vector/light-blue-background-vector_889056-107345.jpg)";

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
        document.body.className = "";
        let weather = data.weather[0].main;

       if (weather === "Clear") {
       document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/58341.jpg')";
       }
else if (weather === "Clouds") {
    document.body.style.backgroundImage = "url('https://th.bing.com/th/id/R.f20ccfa5b239e0e9864dd27946d1408c?rik=Ptej69VpR36Q4Q&riu=http%3a%2f%2fimages.unsplash.com%2fphoto-1499956827185-0d63ee78a910%3fcrop%3dentropy%26cs%3dtinysrgb%26fit%3dmax%26fm%3djpg%26ixid%3dMnwxMjA3fDB8MXxzZWFyY2h8M3x8b3ZlcmNhc3R8fDB8fHx8MTYzMTY5ODQzMg%26ixlib%3drb-1.2.1%26q%3d80%26w%3d1080&ehk=x%2f5Hqv0sGffSrZEvVRmshjwVYF6gjwolHbxbIFahXfo%3d&risl=&pid=ImgRaw&r=0')";
}
else if (weather === "Rain") {
    document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/164284.jpg')";
}
else if (weather === "Thunderstorm") {
    document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/3969209.jpg')";
}
else if (weather === "Snow") {
    document.body.style.backgroundImage = "url('https://img.freepik.com/premium-photo/merry-christmas-tree-winter-snow-background-image-ai-generated-art_1017715-1845.jpg')";
}


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