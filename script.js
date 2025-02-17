// Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
const API_KEY = 'YOUR_API_KEY';

document.getElementById('searchButton').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (city === '') {
    alert('Please enter a city name.');
    return;
  }
  getWeather(city);
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found or an error occurred.');
      }
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error => {
      document.getElementById('weatherResult').innerHTML = `<p>${error.message}</p>`;
    });
}

function displayWeather(data) {
  const html = `
    <h2>Weather in ${data.name}, ${data.sys.country}</h2>
    <p><strong>Temperature:</strong> ${data.main.temp} &deg;C</p>
    <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
  document.getElementById('weatherResult').innerHTML = html;
}
