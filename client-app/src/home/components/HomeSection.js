import React, { Component } from "react";
import { Navbar } from "./Navbar";
import "../style/homesection.css";

export class HomeSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row m-5">
        <div className="mx-auto">
          <div
            className={`row mb-${
              this.props.sectionType === "navbar" ? "5" : "2"
            } `}
          >
            {this.props.sectionType === "navbar" ? (
              <Navbar />
            ) : (
              <div className="mx-auto">
                <p className="h3 font-weight-normal">{this.props.header}</p>
              </div>
            )}
          </div>
          <div className="row">
            <div className="mx-auto">
              <div>{this.props.children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
