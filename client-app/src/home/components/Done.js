import React, { Component } from "react";
import { Box, BoxTypes } from "./Box";

export class Done extends Component {
  render() {
    return (
      <Box type={BoxTypes.Row}>
        <div class="col-md-4">
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere erat a ante.
                </p>
                <footer className="blockquote-footer">
                  Someone famous in{" "}
                  <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </Box>
          </Box>
        </div>

        <div class="col-md-4 clearfix d-none d-md-block">
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere erat a ante.
                </p>
                <footer className="blockquote-footer">
                  Someone famous in{" "}
                  <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </Box>
          </Box>
        </div>

        <div class="col-md-4 clearfix d-none d-md-block">
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere erat a ante.
                </p>
                <footer className="blockquote-footer">
                  Someone famous in{" "}
                  <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </Box>
          </Box>
        </div>
      </Box>
    );
  }
}
