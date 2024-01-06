import React from "react";
import CurrentWeather from "./CurrentWeather";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <CurrentWeather defaultCity="Johannesburg" />
      </div>
    </div>
  );
}