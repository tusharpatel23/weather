const apiKey = 'dd67cf2849ae427e9a7132223240807';

async function getWeather() {
    try {
        const location = document.getElementById('locationInput').value;
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=no`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); 

        const weatherData = document.getElementById('weatherData');
        weatherData.innerHTML = '';

        for (let i = 0; i < data.forecast.forecastday.length; i++) {
            const day = data.forecast.forecastday[i];
            console.log(day);
            const card = document.createElement('div');
            card.className = 'weather-card';

            card.innerHTML = `
                <div>
                    <h3>Day${i+1}</h3>
                    <h3>${data.location.name}</h3>
                    <p>${day.date}</p>
                    <p>${day.day.condition.text}</p>
                    <p>Temp: ${day.day.avgtemp_c}°C / ${day.day.avgtemp_f}°F</p>
                </div>
                <img src="${day.day.condition.icon}" alt="weather icon">
            `;

            weatherData.appendChild(card);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        const weatherData = document.getElementById('weatherData');
        weatherData.innerHTML = `<p class="error">Error fetching weather data. Please try again later.</p>`;
    }
}


