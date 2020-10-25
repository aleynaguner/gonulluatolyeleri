import React, { Component } from "react";
import { Box, BoxTypes } from "../../components/Box";
import { CarouselSlide } from "../../components/CarouselSlide";

export class Done extends Component {
  render() {
    return (
      <CarouselSlide>
        <Box type={BoxTypes.Wrapper}>
          <Box type={BoxTypes.Row}>
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
          </Box>
          <Box type={BoxTypes.Row}>
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </p>
              <footer className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
          </Box>
        </Box>
        <Box type={BoxTypes.Wrapper}>
          <Box type={BoxTypes.Row}>
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
          </Box>
          <Box type={BoxTypes.Row}>
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </p>
              <footer className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
          </Box>
        </Box>
        <Box type={BoxTypes.Wrapper}>
          <Box type={BoxTypes.Row}>
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
          </Box>
          <Box type={BoxTypes.Row}>
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </p>
              <footer className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
          </Box>
        </Box>
      </CarouselSlide>
    );
  }
}
