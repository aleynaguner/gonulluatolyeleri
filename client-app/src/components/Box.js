import React, { Component } from "react";

export class Box extends Component {
  createBox = () => {
    return (
      <div className="col m-3" style={this.props.customStyle}>
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
    if (this.props.type === BoxTypes.Row) {
      return <div className="row">{this.createBox()}</div>;
    } else if (this.props.type === BoxTypes.Wrapper) {
      return <div className="container-fluid">{this.props.children}</div>;
    } else if (this.props.type === BoxTypes.Wrapper.NotFluid) {
      return <div className="container">{this.props.children}</div>;
    } else {
      return this.createBox();
    }
  }
}

const Wrapper = {
  NotFluid: "notfluid",
};

export const BoxTypes = {
  Wrapper: Wrapper,
  Row: "row",
  Column: "column",
};
