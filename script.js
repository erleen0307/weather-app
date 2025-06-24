const apiKey = "2e2e10797342220aabb26497c2a7df59";

const searchBtn = document.querySelector(".searchBtn");
const cityInput = document.querySelector(".cityInput");
const weatherCard = document.querySelector(".weatherCard");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        weatherCard.innerHTML = "Please enter a city name.";
        return;
    }
    weatherCard.innerHTML = `<div class="loader">⏳ Fetching weather...</div>`;

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(res => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then(data => {
            const cityName = data.city.name;
            const country = data.city.country;

            const today = new Date().toISOString().split("T")[0];

            const todayData = data.list.filter(item => item.dt_txt.startsWith(today));

            const temps = todayData.map(item => item.main.temp);
            const minTemp = Math.min(...temps).toFixed(1);
            const maxTemp = Math.max(...temps).toFixed(1);

            const weatherDesc = todayData[0].weather[0].description;
            const weatherMain = todayData[0].weather[0].main;

            const weatherIcon = todayData[0].weather[0].icon;
            const iconURL = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

            // To apply spin animation on sun icon
            const isSunny = weatherIcon.startsWith("01");
            const className = isSunny ? "sunny" : "";
            `<img src="${iconURL}" class="${className}" />`

            const rainChances = todayData.map(item => item.pop || 0);
            const rainChance = Math.max(...rainChances) * 100;

            weatherCard.innerHTML = `
            <h2>${cityName}, ${country}</h2>
            <img src="${iconURL}" alt="${weatherDesc}" style="width: 100px; height: 100px;" />
            <p><strong>Condition:</strong> ${weatherMain} (${weatherDesc})</p>
            <p><strong>Min:</strong> ${minTemp}°C | <strong>Max:</strong> ${maxTemp}°C</p>
            <p><strong>Chance of rain:</strong> ${rainChance.toFixed(0)}%</p>
            `;
        })
        .catch(err => {
            weatherCard.innerHTML = `Error: ${err.message}`;
        });
});
