import React, { Component } from "react";
import { Col } from "../../components/Grid";

export class Done extends Component {
  render() {
    return (
      <Col responsiveSystem={{ md: 4, lg: 4, xl: 4 }} isCentered={true}>
        <Col responsiveSystem={{ md: 12, lg: 12, xl: 12 }} isCentered={true}>
          <div
            className="mx-auto"
            style={{
              borderRadius: "50%",
              width: "200px",
              height: "200px",
              lineHeight: "200px",
              fontSize: "50px",
              textAlign: "center",
              color: "black",
              border: "3px solid black",
            }}
          >
            {this.props.sayi}
          </div>
        </Col>
        <Col responsiveSystem={{ md: 12, lg: 12, xl: 12 }} isCentered={true}>
          <blockquote className="blockquote text-center">
            <p className="mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.
            </p>
            <footer className="blockquote-footer">
              Someone famous in <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
        </Col>
      </Col>
    );
  }
}
