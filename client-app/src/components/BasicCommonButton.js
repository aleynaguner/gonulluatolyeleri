import React from "react";
import { Component } from "react";
import { hasDefaultValue } from "../utility/Utils";
import "./style/basicCommonButton.css";

export const BasicCommonButtonColor = {
  Blue: "#397a9a",
  Green: "#80C08C",
};

export const BasicCommonButtonType = {
  Shadow: "shadow",
  ShadowOnHover: "shadowonhover",
};

export class BasicCommonButton extends Component {
  constructor(props) {
    super(props);
    this.style = this.buildStyle();
  }

  buildStyle = () => {
    let color =
      this.props.color === BasicCommonButtonColor.Green
        ? BasicCommonButtonColor.Green
        : BasicCommonButtonColor.Blue;
    let style = {
      width: "100%",
      height: "auto",
      backgroundColor: color,
      borderColor: color,
    };

    if (!hasDefaultValue(this.props.customStyle)) {
      style = {
        ...style,
        ...this.props.customStyle,
      };
    }

    return style;
  };

  handleClick = (e) => {
    e.persist();
    this.props.handleClick(e);
  };

  render() {
    return (
      <button
        type="submit"
        className="button button1"
        style={this.style}
        onClick={(e) => this.handleClick(e)}
      >
        {this.props.text}
      </button>
    );
  }
}
