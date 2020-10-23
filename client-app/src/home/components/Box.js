import React, { Component } from "react";

export class Box extends Component {
  // constructor(props) {
  //   super(props);
  // }

  createBox = () => {
    return (
      <div className="col m-3">
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
    } else if (this.props.type === BoxTypes.Wrapper.Manuel) {
      return <div className="container">{this.props.children}</div>;
    } else {
      return this.createBox();
    }
  }
}

const Wrapper = {
  Manuel: {
    Small: "1",
    Medium: "2",
    Large: "3",
  },
};

// const setManuelWrapper = (size) => {
//   if(size === Wrapper.Manuel.Small) {

//   }
// }

export const BoxTypes = {
  Wrapper: Wrapper,
  Row: "row",
  Column: "column",
};
