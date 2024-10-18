"use client"; // Add this to use hooks

import Image from "next/image";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debouncedLocation = useDebounce(location, 600); // Delay API call by 1 second

  useEffect(() => {
    const fetchWeather = async (location) => {
     
      try {
        setLoading(true); // Set loading to true when the fetch starts
        setError(''); // Reset error state

        const response = await axios.get(`/api/weather?location=${location}`);
        //setWeather(response.data);

       // Manually check if the API response includes success: false
        if (response.data.success === false) {
          // This triggers when there's an error in the API response (e.g., usage limit)
          setError(response.data.error.info); // Set error message based on the API response
          setWeather({}); // Clear weather data
        } else {
          // If the API responds successfully with valid data, set the weather data
          setWeather(response.data);
        }
       
      } catch (err) {
        console.error('Error fetching weather:', err);

      // Check if the API response includes the specific error for the usage limit
      if (err.response && err.response.data.error) {
        setError(err.response.data.error.info); // Set specific error if available
      } else {
        setError('Failed to fetch weather data. Please try again later.');
      }

        setWeather({}); // Reset weather data
      } finally {
        setLoading(false); // Set loading to false when the fetch is complete
      }
    };

    if (debouncedLocation && typeof window !== "undefined") {  // Ensures this runs only on the client side
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

          {loading ? (
            <p className="text-center">Loading...</p> // Show loading message when `loading` is true
          ) : error ? (
            <p className="text-center text-danger">{error}</p> // Display error message if API returns an error
          ) : Object.keys(weather).length > 0 ? (
            // Show weather data if available
          <div className="row mtop justify-content-center align-self-center">
                <h2 className="text-center">{weather.request?.query || ''}</h2>

                <div className="col-md-6 col-lg-3 mtop wcard">
                  <p><strong>Temperature:</strong> {weather.current?.temperature || ''} °C</p>
                  <p><strong>Humidity:</strong> {weather.current?.humidity || ''}</p>
                  <p><strong>Cloudcover:</strong> {weather.current?.cloudcover || ''}</p>
                  <p><strong>Pressure:</strong> {weather.current?.pressure || ''}</p>
                  <p><strong>Weather Descriptions:</strong> {weather.current?.weather_descriptions?.[0] || ''}</p>
                  <p>
                    <Image
                      src={weather.current?.weather_icons?.[0] || '/images/logo.png'}
                      alt="Weather icon"
                      width={150}
                      height={150}
                    />
                  </p>
                </div>

                <div className="col-md-6 col-lg-3 mtop wcard">
                  <p><strong>Wind Degree:</strong> {weather.current?.wind_degree || ''}</p>
                  <p><strong>Wind Direction:</strong> {weather.current?.wind_dir || ''}</p>
                  <p><strong>Wind Speed:</strong> {weather.current?.wind_speed || ''}</p>
                  <p><strong>Latitude:</strong> {weather.location?.lat || ''}</p>
                  <p><strong>Longitude:</strong> {weather.location?.lon || ''}</p>
                  <p><strong>Observation Time:</strong> {weather.current?.observation_time || ''}</p>
                </div>
          </div>
          ) : (
            <p className="text-center">No weather data available</p>
          )}

        </div>
    </div>
  );
}


