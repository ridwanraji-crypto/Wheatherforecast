// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Weather data elements
const locationElement = document.querySelector('.location h2');
const dateTimeElement = document.querySelector('.date-time');
const tempElement = document.querySelector('.temperature');
const descriptionElement = document.querySelector('.weather-description');
const weatherIconElement = document.querySelector('.weather-icon');
const errorElement = document.querySelector('.error'); // Added for error messages

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
    'sunny': 'fas fa-sun',
    'partly cloudy': 'fas fa-cloud-sun',
    'cloudy': 'fas fa-cloud',
    'rainy': 'fas fa-cloud-rain',
    'clear sky': 'fas fa-sun',
    'few clouds': 'fas fa-cloud-sun',
    'scattered clouds': 'fas fa-cloud',
    'broken clouds': 'fas fa-cloud',
    'shower rain': 'fas fa-cloud-showers-heavy',
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

// Current date and time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    dateTimeElement.textContent = now.toLocaleDateString('en-US', options);
}

// Update weather data (in a real app, this would come from an API)
function updateWeather(city) {
    hideError();

    // In a real application, you would make an API call here.
    // Example: fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`)
    
    // For now, we'll use a placeholder `setTimeout` to simulate a network delay.
    setTimeout(() => {
        // Update location
        locationElement.innerHTML = `<i class="fas fa-location-dot"></i> ${city}`;

        // Update current weather with placeholder data
        const description = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)];
        tempElement.textContent = `${Math.floor(Math.random() * 15) + 18}°C`;
        descriptionElement.textContent = description;
        
        // Use the map to set the icon
        const iconClass = weatherIcons[description.toLowerCase()] || 'fas fa-cloud';
        weatherIconElement.innerHTML = `<i class="${iconClass}"></i>`;
        
        // Update weather details
        windElement.textContent = `${Math.floor(Math.random() * 20) + 5} km/h`;
        humidityElement.textContent = `${Math.floor(Math.random() * 40) + 40}%`;
        pressureElement.textContent = `${Math.floor(Math.random() * 20) + 1000} hPa`;
        visibilityElement.textContent = `${Math.floor(Math.random() * 5) + 8} km`;
        
        // Update forecast
        const days = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        forecastDays.forEach((day, index) => {
            day.textContent = days[index];
        });
        
        forecastIcons.forEach(icon => {
            const descriptions = Object.keys(weatherIcons);
            const randDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
            icon.className = weatherIcons[randDescription];
        });
        
        forecastHighs.forEach(high => {
            high.textContent = `${Math.floor(Math.random() * 10) + 20}°`;
        });
        
        forecastLows.forEach(low => {
            low.textContent = `${Math.floor(Math.random() * 10) + 10}°`;
        });
    }, 500); // Simulate a 500ms API call delay
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

// Initialize
updateDateTime();
setInterval(updateDateTime, 60000); // Update time every minute

// Initial weather data
updateWeather('New York, US');