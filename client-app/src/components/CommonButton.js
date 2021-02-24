import React from "react";
import "./style/volunteerButton.css";
import { Component } from "react";

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
            : {}
        }
      >
        {this.props.text}
      </button>
    );
  }
}
