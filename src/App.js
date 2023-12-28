import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const WeatherApp = () => {
  //const [dateTime, setDateTime] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState('Polokwane');
  const [currentWeather, setCurrentWeather] = useState({
    temperature: '',
    humidity: '',
    wind: '',
    icon: '',
    weatherDescription: '',
  });
  const [value, setValue] = useState('');

  const formatDate = (dateDay) => {
    const date = new Date(dateDay * 1000);
    const day = date.getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return days[day];
  };

  const displayForecast = (response) => {
    const forecast = response.data.daily.slice(0, 6);

    setForecastData(
      forecast.map((forecastDay) => ({
        time: formatDate(forecastDay.time),
        icon: forecastDay.condition.icon,
        maxTemp: Math.round(forecastDay.temperature.maximum),
        minTemp: Math.round(forecastDay.temperature.minimum),
      }))
    );
  };

  const search = (cityName) => {
    const units = 'metric';
    const apiKey = '0ffeeb933d0b51c0bd7ob493d69aftd6';
    const url = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=${units}`;
    
    axios.get(url).then((response) => {
      const data = response.data;

      setCurrentWeather({
        temperature: Math.round(data.temperature.current),
        humidity: data.temperature.humidity,
        wind: data.wind.speed,
        icon: data.condition.icon,
        weatherDescription: data.condition.description,
      });

      setCity(data.city);
      getForecast(data.city);
    });
  };

  const getForecast = (cityName) => {
    const units = 'metric';
    const apiKey = '0ffeeb933d0b51c0bd7ob493d69aftd6';
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(displayForecast);
  };

  const initialLoad = () => {
    const initialSearch = 'Polokwane';
    setCity(initialSearch);
    search(initialSearch);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    search(value);
  };   
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    initialLoad();
  }, []);

  return (
    <div>
      <h1>Weather App</h1>
      <form className="float-left" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a city..."
          autoComplete="off"
          autoFocus="on"
          onChange={handleChange}
          value={value}
        />
        <input type="submit" value="Search" className="btn btn-primary" />
      </form>
      <div>
      <h2>{city}</h2>
      <p>Current Temperature: {currentWeather.temperature}°C</p>
      <p>Humidity: {currentWeather.humidity}%</p>
      <p>Wind Speed: {currentWeather.wind} km/h</p>
      <p>Weather Description: {currentWeather.weatherDescription}</p>
      <img
        src={`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${currentWeather.icon}.png`}
        alt={currentWeather.weatherDescription}
      />
    </div>
      <h2>Forecast</h2>
      <div className="forecast">
      {forecastData.map((forecastDay, index) => (
        <div className="forecast-day" key={index}>
          <p>Date: {forecastDay.time}</p>
          <img
            src={`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.icon}.png`}
            alt="Weather Icon"
          />
          <p>Max Temp: {forecastDay.maxTemp}°C</p>
          <p>Min Temp: {forecastDay.minTemp}°C</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default WeatherApp;

