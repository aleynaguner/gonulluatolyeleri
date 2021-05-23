import React, { Component } from "react";
import "./style/volunteerButton.css";

const defaultStyles = {
  width: "100%",
  height: "auto",
};
export class CommonButton extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.persist();
    this.props.handleClick(e);
  };

  render() {
    return (
      <button
        className="bubbly-button"
        onClick={(e) => this.handleClick(e)}
        style={
          this.props.customStyle !== undefined
            ? { ...this.props.customStyle }
            : defaultStyles
        }
      >
        {this.props.text}
      </button>
    );
  }
}
