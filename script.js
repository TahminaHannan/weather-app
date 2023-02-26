// Link to HTML elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const todaySection = document.getElementById('today');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const cityName = searchInput.value.trim();
  getWeather(cityName);
});

function getWeather(cityName) {
    // API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=8f5a3cdf30395c81fc9b8d76f028fb1f`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const date = new Date();
  
        const html = `
          <h2>${cityName} (${date.toLocaleDateString()}) </h2>
          <br>
          <p>Temperature: ${temperature}°C</p>
          <p>Conditions: ${description}</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind Speed: ${windSpeed} m/s</p>
          <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${description}" />
        `;
        todaySection.innerHTML = html;
  
        todaySection.style.display = "block";
      })
      .catch(error => {
        const errorMessage = `<p>Could not get weather data for ${cityName}. Please try again.</p>`;
        todaySection.innerHTML = errorMessage;
      });
  }
  
