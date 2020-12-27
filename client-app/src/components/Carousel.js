import React, { Component } from "react";
import { Container } from "./Grid";

export class Carousel extends Component {
  constructor(props) {
    super(props);
  }

  getChildrenAsArray = () => {
    if (Array.isArray(this.props.children)) return this.props.children;
    else return [this.props.children];
  };

  render() {
    let childrenAsArray = this.getChildrenAsArray();

    return (
      <React.Fragment>
        <Container>
          <div
            id="carouselComponent"
            className={`carousel slide${
              this.props.isMultiItem ? " carousel-multi-item" : ""
            }`}
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselComponent"
                data-slide-to="0"
                className="active"
              ></li>
              <li data-target="#carouselComponent" data-slide-to="1"></li>
              <li data-target="#carouselComponent" data-slide-to="2"></li>
            </ol>

            <div className="carousel-inner" role="listbox">
              {childrenAsArray.map((c, i) => (
                <div
                  key={i}
                  className={`carousel-item${i === 0 ? " active" : ""}`}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
