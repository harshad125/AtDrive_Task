/**
 * Weather Service
 * Optimized for Open-Meteo (100% Free, No API Key Required)
 * Handles Geocoding and Weather Data fetching.
 */

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Fetches current weather for a specific city.
 * Uses a two-step process: 1. Geocode City -> 2. Fetch Weather by Lat/Lon
 * 
 * @param {string} city - Name of the city
 * @returns {Promise<Object>} - Weather data
 */
const fetchCurrentWeather = async (city) => {
    try {
        // Step 1: Geocoding - Convert city name to Coordinates
        const geoResponse = await fetch(`${GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);

        if (!geoResponse.ok) {
            throw new Error('Geocoding service unavailable');
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error('City not found. Please check the spelling.');
        }

        const { latitude, longitude, name, country, admin1 } = geoData.results[0];

        // Step 2: Fetch Weather Data using coordinates
        // Using current_weather=true and some additional variables
        const weatherResponse = await fetch(
            `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
        );

        if (!weatherResponse.ok) {
            throw new Error('Weather service unavailable');
        }

        const data = await weatherResponse.json();
        const current = data.current;

        // Requirement: Properly map weather codes to human-readable strings
        // WMO Weather interpretation codes (WW)
        const weatherCodes = {
            0: 'Clear sky',
            1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
            45: 'Fog', 48: 'Depositing rime fog',
            51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
            61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
            71: 'Slight snow fall', 73: 'Moderate snow fall', 75: 'Heavy snow fall',
            77: 'Snow grains',
            80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
            85: 'Slight snow showers', 86: 'Heavy snow showers',
            95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail',
        };

        // Transform data for UI consumption
        return {
            name: name,
            country: country,
            region: admin1,
            temp: Math.round(current.temperature_2m),
            condition: weatherCodes[current.weather_code] || 'Cloudy',
            description: weatherCodes[current.weather_code] || 'Atmospheric conditions',
            humidity: current.relative_humidity_2m,
            windSpeed: current.wind_speed_10m,
            // Open-Meteo doesn't provide icons directly, we'll map codes to a general cloud icon or use dummy logic
            iconCode: current.weather_code
        };
    } catch (error) {
        throw error;
    }
};

export default {
    fetchCurrentWeather
};
