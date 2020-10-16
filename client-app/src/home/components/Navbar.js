import React, { Component } from "react";
import "../style/navbar.css";

export class Navbar extends Component {
  render() {
    return (
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="img-fluid"
              src="https://www.guletyat.com/uploads/full/_0012_Katman%202.jpg"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              id="img2"
              className="img-fluid"
              src="https://www.guletyat.com/uploads/full/_0012_Katman%202.jpg"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              id="img3"
              className="img-fluid"
              src="https://www.guletyat.com/uploads/full/_0012_Katman%202.jpg"
              alt="Third slide"
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}
