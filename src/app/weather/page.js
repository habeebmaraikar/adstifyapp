"use client"; // Add this to use hooks

import axios from 'axios';
import { useEffect, useState } from 'react';

// Debounce function to delay API calls
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function Weather() {
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState('Singapore');
  const [error, setError] = useState(false);
  const debouncedLocation = useDebounce(location, 1000); // Delay API call by 1 second

  useEffect(() => {
    const fetchWeather = async (location) => {
      setError(false); // Reset error state
      try {
        const response = await axios.get(`/api/weather?location=${location}`);
        setWeather(response.data);
      } catch (err) {
        console.error('Error fetching weather:', err);
        setError(true);
        setWeather({}); // Reset weather data
      } 
    };

    if (debouncedLocation) {
      fetchWeather(debouncedLocation);
    }
  }, [debouncedLocation]);

  return (
    <div className="container weather">
      <div className="row justify-content-center align-self-center">
        <div className="col-12 mtop text-center">
          <h1>Adstify Weather</h1>
        </div>

        <div className="col-12 col-md-6 mtop text-center">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city"
          />
        </div>

        <div className="col-12">
          {/* Display loading */}
          {Object.keys(weather).length === 0 && <p className="text-left">Loading...</p>}

          {/* Display error message if location is invalid */}
          {error && <p className="text-left text-danger">Location not found. Please enter a valid city or country.</p>}

        </div>

          {/* Display weather data if available */}
          {weather && !error && (
            <div className="row mtop justify-content-center align-self-center">
              <h2 className="text-center">{weather.request?.query || ''}</h2>

              <div className="col-md-6 col-lg-3 mtop wcard">
                <p>Temperature: {weather.current?.temperature || ''} °C</p>
                <p>Humidity: {weather.current?.humidity || ''}</p>
                <p>Cloudcover: {weather.current?.cloudcover || ''}</p>
                <p>Pressure: {weather.current?.pressure || ''}</p>
                <p>Weather Descriptions: {weather.current?.weather_descriptions?.[0] || ''}</p>
                <p>
                  <img
                    src={weather.current?.weather_icons?.[0] || ''}
                    alt="Weather icon"
                    width="auto"
                    height="auto"
                  />
                </p>
              </div>

              <div className="col-md-6 col-lg-3 mtop wcard">
                <p>Wind Degree: {weather.current?.wind_degree || ''}</p>
                <p>Wind Direction: {weather.current?.wind_dir || ''}</p>
                <p>Wind Speed: {weather.current?.wind_speed || ''}</p>
                <p>Latitude: {weather.location?.lat || ''}</p>
                <p>Longitude: {weather.location?.lon || ''}</p>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}
