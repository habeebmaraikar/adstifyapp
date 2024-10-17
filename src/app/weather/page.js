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
  const [weather, setWeather] = useState('');
  const [location, setLocation] = useState('Singapore');
  const debouncedLocation = useDebounce(location, 1000); // Delay API call by 1sec


  useEffect(() => {
    const fetchWeather = async (location) => {
      try {
        const response = await axios.get(`/api/weather?location=${location}`);
        //console.log(response.data, "edata");
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather', error);
      }
    };

    if (debouncedLocation) {
      fetchWeather(debouncedLocation);
    }

  }, [debouncedLocation]);

  return (
    <>
    <div className="container">

       <div className="row justify-content-center align-self-center">
            
            <div className="col-12 mtop text-center">
              <h1>Adstify Weather</h1>
            </div>

            <div className="col-12 mtop text-center">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter city"
                />
            </div>

            <div className="col-12 ">
              {/* Check if weather are not yet available and show Loading... */}
              {Object.keys(weather).length === 0 && <p className="text-left">Loading...</p>}

              {weather && (
                <div className="row mtop justify-content-center align-self-center">
                  <h2 className="text-center">{weather.request.query ? weather.request.query : ''}</h2>

                  <div className="col-md-6 col-lg-3 mtop">
                      <p>Temperature: {weather.current.temperature ? weather.current.temperature : '' } °C</p>
                      <p>Humidity: {weather.current.humidity ? weather.current.humidity : ''}</p>
                      <p>Cloudcover: {weather.current.cloudcover ? weather.current.cloudcover : '' }</p>
                      <p>Pressure: {weather.current.pressure ? weather.current.pressure : ''}</p>
                      <p>Weather Descriptions: {weather.current.weather_descriptions[0] ? weather.current.weather_descriptions[0] : '' }</p>
                      <p><img src={weather.current.weather_icons[0] ? weather.current.weather_icons[0] : '' } width="auto" height="auto" /> </p>
                   </div>

                  <div className="col-md-6 col-lg-3 mtop">
                    <p>Wind Degree: {weather.current.wind_degree ? weather.current.wind_degree : '' }</p>
                    <p>Wind Direction: {weather.current.wind_dir ? weather.current.wind_dir : ''}</p>
                    <p>Wind Speed: {weather.current.wind_speed ? weather.current.wind_speed : '' }</p>
                    <p>Latitude: {weather.location.lat ? weather.location.lat : ''}</p>
                    <p>Longitude: {weather.location.lon ? weather.location.lon : '' }</p>
                  </div>


                </div>
              )}
            </div>
        </div>

    </div>

    </>
  );
}
