import React, { useState, useEffect } from "react";
import ForecastPreview from "./ForecastPreview";
import axios from "axios";
import "./Forecast.css";

export default function Forecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function handleForecastResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  if (loaded) {
    return (
      <div className="Forecast row">
        {forecast.map(function (day, index) {
          if (index < 5) {
            return (
              <div className="col" key={index}>
                <ForecastPreview data={day} />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  } else {
    let apiKey = "0ffeeb933d0b51c0bd7ob493d69aftd6";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${props.city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleForecastResponse);

    return null;
  }
}