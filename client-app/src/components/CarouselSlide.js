import React, { Component } from "react";
import { Row } from "../components/Grid";

export class CarouselSlide extends Component {
  getChildrenAsArray = () => {
    if (Array.isArray(this.props.children)) return this.props.children;
    else return [this.props.children];
  };

  render() {
    let childrenAsArray = this.getChildrenAsArray();

    return (
      <Row isCentered={true}>
        {childrenAsArray.map((c, i) => (
          <div
            key={i}
            className={`col-md-5${i > 0 ? " clearfix d-none d-md-block" : ""}`}
          >
            {c}
          </div>
        ))}
      </Row>
    );
  }
}
