import React, { useState } from "react";
import Weather from "./Weather";
import Forecast from "./Forecast";
import axios from "axios";
import "./CurrentWeather.css";

export default function CurrentWeather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coordinates,
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      date: new Date(response.data.time * 1000),
      description: response.data.condition.description,
      icon: response.data.condition.icon,
      wind: response.data.wind.speed,
      city: response.data.city,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    const apiKey = "0ffeeb933d0b51c0bd7ob493d69aftd6";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(handleResponse);
  }

  if (weatherData.ready) {
    return (
      <div className="CurrentWeather">
        <div className="row align-items-center">
          <div className="col-md-2">
            <img src="/images/logo.png" className="logo" alt="My Logo" />
          </div>
          <div className="col-md-10">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-9 ">
                  <input
                    type="search"
                    placeholder="Enter a city..."
                    className="form-control search-input"
                    onChange={handleCityChange}
                  />
                </div>
                <div className="col-3 p-0">
                  <input
                    type="submit"
                    value="Search"
                    className="btn btn-primary w-100"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <Weather data={weatherData} />
        <Forecast coordinates={weatherData.coordinates} city={weatherData.city}/>
        <footer>
          This project was coded by{" "}
          <a
            href="https://conny-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Conny Serite
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/Conny210/weather-app-react"
            target="_blank"
            rel="noopener noreferrer"
          >
            open-sourced on GitHub
          </a>{" "}
          and{" "}
          <a
            href="https://conny-reactweatherapp.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            hosted on Netlify
          </a>
        </footer>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}