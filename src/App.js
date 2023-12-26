import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navigation from "./Navigation";
import Preset from "./Preset";
import Forecast from "./Forecast";

export default class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Preset />
        <Forecast />
      </div>
    );
  }
}