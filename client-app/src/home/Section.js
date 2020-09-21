import React, { Component } from "react";
import "./style/section.css";

const sizes = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fiveteen",
  16: "sixteen",
};

export class Section extends Component {
  render() {
    let isItRow = this.props.type === "row";

    let className = `${
      this.props.size !== undefined ? sizes[this.props.size] : "three"
    } ${!isItRow ? "wide" : ""} ${isItRow ? "olive" : "black"} column centered${
      isItRow ? " row" : ""
    }`;

    return (
      <div id="custRow" className={className}>
        {this.props.children}
      </div>
    );
  }
}
