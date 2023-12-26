import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Weather from "./Weather";

const cityRoutes = [
  { path: "/", city: "Johannesburg" },
  { path: "/pretoria", city: "Pretoria" },
  { path: "/randburg", city: "Randburg" },
  { path: "/polokwane", city: "Polokwane" },
];

export default class App extends Component {
  renderRoutes() {
    return cityRoutes.map(({ path, city }) => (
      <Routes>
        <Route
        key={path}
        exact
        path={path}
        render={() => (
          <div className="App">
            <Weather city={city} />
          </div>
        )}
      />
      </Routes>
    ));
  }

  render() {
    return <div>{this.renderRoutes()}</div>;
  }
}
