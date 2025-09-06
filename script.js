// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const locationElement = document.querySelector('.location h2');
const dateTimeElement = document.querySelector('.date-time');
const tempElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.weather-description');
const weatherIconElement = document.querySelector('.weather-icon');
const errorElement = document.querySelector('.error');

// Weather details elements
const windElement = document.querySelector('.detail-item:nth-child(1) p');
const humidityElement = document.querySelector('.detail-item:nth-child(2) p');
const pressureElement = document.querySelector('.detail-item:nth-child(3) p');
const visibilityElement = document.querySelector('.detail-item:nth-child(4) p');

// Forecast elements
const forecastDays = document.querySelectorAll('.forecast-day');
const forecastIcons = document.querySelectorAll('.forecast-icon i');
const forecastHighs = document.querySelectorAll('.forecast-high');
const forecastLows = document.querySelectorAll('.forecast-low');

// Mapping for weather icons
const weatherIcons = {
    'clear sky': 'fas fa-sun',
    'few clouds': 'fas fa-cloud-sun',
    'scattered clouds': 'fas fa-cloud',
    'broken clouds': 'fas fa-cloud',
    'shower rain': 'fas fa-cloud-showers-heavy',
    'rain': 'fas fa-cloud-rain',
    'thunderstorm': 'fas fa-bolt',
    'snow': 'fas fa-snowflake',
    'mist': 'fas fa-smog'
};

// Function to display an error message
function displayError(message) {
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Function to hide the error message
function hideError() {
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Function to fetch weather data from API
async function fetchWeatherData(city) {
    // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found. Please try again.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        displayError(error.message);
        return null;
    }
}

// Function to fetch forecast data (separate API call)
async function fetchForecastData(city) {
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Forecast data not available.');
        }
        const data = await response.json();
        const dailyForecast = data.list.filter(item => item.dt_txt.includes('12:00:00'));
        return dailyForecast.slice(0, 5);
    } catch (error) {
        return null;
    }
}

// Update weather data with a real API call
async function updateWeather(city) {
    hideError();

    const weatherData = await fetchWeatherData(city);
    if (!weatherData) return;

    locationElement.innerHTML = `<i class="fas fa-location-dot"></i> ${weatherData.name}, ${weatherData.sys.country}`;

    // Calculate and update local date and time using the timezone offset
    const timezoneOffset = weatherData.timezone;
    const localTime = new Date(Date.now() + timezoneOffset * 1000);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    dateTimeElement.textContent = localTime.toLocaleDateString('en-US', options);

    // Update current weather
    const description = weatherData.weather[0].description;
    tempElement.textContent = `${Math.round(weatherData.main.temp)}°C`;
    descriptionElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    
    const iconClass = weatherIcons[description.toLowerCase()] || 'fas fa-cloud';
    weatherIconElement.innerHTML = `<i class="${iconClass}"></i>`;
    
    // Update weather details
    windElement.textContent = `${weatherData.wind.speed} m/s`;
    humidityElement.textContent = `${weatherData.main.humidity}%`;
    pressureElement.textContent = `${weatherData.main.pressure} hPa`;
    visibilityElement.textContent = `${weatherData.visibility / 1000} km`;
    
    // Update forecast
    const forecastData = await fetchForecastData(city);
    if (forecastData) {
        forecastDays.forEach((dayElement, index) => {
            if (forecastData[index]) {
                const date = new Date(forecastData[index].dt * 1000);
                dayElement.textContent = date.toLocaleDateString('en-US', { weekday: 'long' });
            }
        });
        
        forecastIcons.forEach((iconElement, index) => {
            if (forecastData[index]) {
                const description = forecastData[index].weather[0].description;
                const iconClass = weatherIcons[description.toLowerCase()] || 'fas fa-cloud';
                iconElement.className = iconClass;
            }
        });
        
        forecastHighs.forEach((highElement, index) => {
            if (forecastData[index]) {
                highElement.textContent = `${Math.round(forecastData[index].main.temp_max)}°`;
            }
        });
        
        forecastLows.forEach((lowElement, index) => {
            if (forecastData[index]) {
                lowElement.textContent = `${Math.round(forecastData[index].main.temp_min)}°`;
            }
        });
    }
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city !== '') {
        updateWeather(city);
        searchInput.value = '';
    } else {
        displayError('Please enter a city name.');
    }
});

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city !== '') {
            updateWeather(city);
            searchInput.value = '';
        } else {
            displayError('Please enter a city name.');
        }
    }
});

// Initial weather data
updateWeather('New York, US');