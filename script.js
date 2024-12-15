const apiKey = "591d936e3358840eabc14b9ce8b0c2de";
const cityInput = document.getElementById("city");
const getWeatherButton = document.getElementById("get-weather");

getWeatherButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            suggestOutfit(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Could not fetch weather data. Please try again.");
        });
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById("weather-display");
    weatherDisplay.innerHTML = `
        <p class="text-xl font-semibold text-gray-800">Temperature: ${data.main.temp}°C</p>
        <p class="text-lg text-gray-600">Conditions: ${data.weather[0].description}</p>
    `;
    weatherDisplay.classList.remove("invisible", "opacity-0");
}

function suggestOutfit(data) {
    const outfitDisplay = document.getElementById("outfit-suggestions");
    const temp = data.main.temp;
    let outfit = "";

    if (temp >= 25) {
        outfit = "It's warm! Wear light cotton clothes and sunglasses.";
    } else if (temp >= 15 && temp < 25) {
        outfit = "It's a bit chilly! A light jacket and jeans would be great.";
    } else if (temp < 15) {
        outfit = "It's cold! Wear a coat, scarf, and gloves.";
    }

    if (data.weather[0].main === "Rain") {
        outfit += " Don't forget an umbrella!";
    }

    outfitDisplay.innerHTML = `<p>${outfit}</p>`;
    outfitDisplay.classList.remove("invisible", "opacity-0");
}
