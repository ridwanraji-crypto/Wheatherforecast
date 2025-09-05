        // DOM Elements
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        
        // Weather data elements
        const locationElement = document.querySelector('.location h2');
        const dateTimeElement = document.querySelector('.date-time');
        const tempElement = document.querySelector('.temperature');
        const descriptionElement = document.querySelector('.weather-description');
        const weatherIconElement = document.querySelector('.weather-icon');
        
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
            // Update location
            locationElement.innerHTML = `<i class="fas fa-location-dot"></i> ${city}`;
            
            // Update current weather
            tempElement.textContent = `${Math.floor(Math.random() * 15) + 18}°C`;
            descriptionElement.textContent = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)];
            
            // Update weather icon based on description
            const description = descriptionElement.textContent.toLowerCase();
            let iconClass = 'fas fa-cloud';
            
            if (description.includes('sunny')) iconClass = 'fas fa-sun';
            else if (description.includes('partly')) iconClass = 'fas fa-cloud-sun';
            else if (description.includes('cloudy')) iconClass = 'fas fa-cloud';
            else if (description.includes('rainy')) iconClass = 'fas fa-cloud-rain';
            
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
                const rand = Math.floor(Math.random() * 4);
                const icons = [
                    'fas fa-sun',
                    'fas fa-cloud-sun',
                    'fas fa-cloud',
                    'fas fa-cloud-rain'
                ];
                icon.className = icons[rand];
            });
            
            forecastHighs.forEach(high => {
                high.textContent = `${Math.floor(Math.random() * 10) + 20}°`;
            });
            
            forecastLows.forEach(low => {
                low.textContent = `${Math.floor(Math.random() * 10) + 10}°`;
            });
        }
        
        // Event Listeners
        searchBtn.addEventListener('click', () => {
            if (searchInput.value.trim() !== '') {
                updateWeather(searchInput.value);
                searchInput.value = '';
            }
        });
        
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter' && searchInput.value.trim() !== '') {
                updateWeather(searchInput.value);
                searchInput.value = '';
            }
        });
        
        // Initialize
        updateDateTime();
        setInterval(updateDateTime, 60000); // Update time every minute
        
        // Initial weather data
        updateWeather('New York, US');