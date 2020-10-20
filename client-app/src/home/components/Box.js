import React, { Component } from "react";
import "../style/homesection.css";

export class Box extends Component {
  constructor(props) {
    super(props);
  }

  createBox = () => {
    return (
      <div className="col m-2">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  };

  render() {
    if (this.props.type == BoxTypes.Row) {
      return <div class="row m-2">{this.createBox()}</div>;
    } else if (this.props.type == BoxTypes.Wrapper) {
      return <div class="container-fluid">{this.props.children}</div>;
    } else {
      return this.createBox();
    }
  }
}

export const BoxTypes = {
  Wrapper: "wrapper",
  Row: "row",
  Column: "column",
};
