import React, { Component } from "react";
import { Box, BoxTypes } from "./Box";

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
        <Box type={BoxTypes.Wrapper}>
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
                <div className={`carousel-item${i === 0 ? " active" : ""}`}>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </Box>
      </React.Fragment>
    );
  }
}
