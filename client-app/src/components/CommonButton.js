import React, { Component } from "react";
import "./style/volunteerButton.css";

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
        style={this.props.style !== undefined ? { ...this.props.style } : {}}
      >
        {this.props.text}
      </button>
    );
  }
}
