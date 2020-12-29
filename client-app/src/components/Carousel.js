import React, { Component } from "react";
import { Container, Row } from "./Grid";

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

            <Row margins={{ t: 5 }}>
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselComponent"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li data-target="#carouselComponent" data-slide-to="1"></li>
                <li data-target="#carouselComponent" data-slide-to="2"></li>
              </ol>
            </Row>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export class CarouselSlide extends Component {
  render() {
    return <Row isCentered={true}>{this.props.children}</Row>;
  }
}
