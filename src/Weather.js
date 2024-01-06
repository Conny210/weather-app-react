import React from "react";
import Date from "./Date";
import Icon from "./Icon";
import "./Weather.css";

export default function Weather(props) {
  return (
    <div className="Weather">
      <div className="row">
        <div className="col-6">
          <h1>{props.data.city}</h1>
          <ul>
            <li>
              <Date date={props.data.date} /> 
            </li>
            <li>
              Humidity: <strong>{props.data.humidity}%</strong>, Wind:{" "}
              <strong>{props.data.wind}km/h</strong>
            </li>
          </ul>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-8">
          <div className="temp-container d-flex justify-content-end">
            <Icon code={props.data.icon} size={52} />
            <div>
              <span className="temperature">
                {Math.round(props.data.temperature)}
              </span>
              <span className="unit">°C</span>
              <p>{props.data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}