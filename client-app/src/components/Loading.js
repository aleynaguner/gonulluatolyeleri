import React, { Component } from "react";
import "./style/loading.css";

export class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    );
  }
}
