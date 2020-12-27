import React, { Component } from "react";
import { CarouselSlide } from "../../components/CarouselSlide";
import { Container, Row } from "../../components/Grid";

export class Done extends Component {
  render() {
    return (
      <CarouselSlide>
        <Container>
          <Row isCentered={true}>
            <div
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
          </Row>
          <Row isCentered={true}>
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </p>
              <footer className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
          </Row>
        </Container>
        <Container>
          <Row isCentered={true}>
            <div
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
          </Row>
          <Row isCentered={true}>
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </p>
              <footer className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
          </Row>
        </Container>
        <Container>
          <Row isCentered={true}>
            <div
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
          </Row>
          <Row isCentered={true}>
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </p>
              <footer className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
          </Row>
        </Container>
      </CarouselSlide>
    );
  }
}
