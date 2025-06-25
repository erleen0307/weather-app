const apiKey = "2e2e10797342220aabb26497c2a7df59";

const searchBtn = document.querySelector(".searchBtn");
const cityInput = document.querySelector(".cityInput");
const weatherCard = document.querySelector(".weatherCard");
const recentContainer = document.querySelector("#recent-container");
const clearBtn = document.querySelector("#clear-history"); // 🛠️ Moved up here

// Fetch weather
function SearchWeather(city) {
    if (!city) {
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
}

// Save recent city to localStorage
function updateRecentCities(citySearch) {
    let cities = JSON.parse(localStorage.getItem("recentCities")) || [];
    const alreadyExists = cities.some(city => city.toLowerCase() === citySearch.toLowerCase());

    if (!alreadyExists) {
        cities.unshift(citySearch);
        if (cities.length > 5) cities.pop();
        localStorage.setItem("recentCities", JSON.stringify(cities));
    }
}

// Show buttons for recent cities
function displayRecentCities() {
    const recentSearches = JSON.parse(localStorage.getItem("recentCities")) || [];
    recentContainer.innerHTML = '';

    for (let search of recentSearches) {
        const recentCityBtn = document.createElement("button");
        recentCityBtn.innerText = search.toUpperCase();
        recentCityBtn.classList.add("recent-btn");

        recentCityBtn.addEventListener("click", () => {
            SearchWeather(search);
        });

        recentContainer.appendChild(recentCityBtn);
    }
}

// Search button click
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) return;

    SearchWeather(city);
    updateRecentCities(city);
    displayRecentCities();
});

// Clear history
clearBtn.addEventListener("click", () => {
    localStorage.removeItem("recentCities");
    displayRecentCities();
});

// Show buttons on load
displayRecentCities();
