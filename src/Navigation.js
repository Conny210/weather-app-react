import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

export default class Navigation extends Component {
  render() {
    return (
      <header>
        <ul className="navigation-items">
          <li className="navigation-item">
            <Link to="/">Johannesburg</Link>
          </li>
          <li className="navigation-item">
            <Link to="/pretoria">Pretoria</Link>
          </li>
          <li className="navigation-item">
            <Link to="/randburg">Randburg</Link>
          </li>
          <li className="navigation-item">
            <Link to="/polokwane">Polokwane</Link>
          </li>
        </ul>
      </header>
    );
  }
}