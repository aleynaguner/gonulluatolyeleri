import React from "react";
import BaseComponent from "../../utility/BaseComponent";
import "../style/readMoreButton.css";

export default class ReadMoreButton extends BaseComponent {
  handleClick = (e) => {
    e.persist();
    this.props.handleClick(e);
  };
  render() {
    return (
      <button
        class="learn-more"
        style={this.props.customStyle}
        onClick={this.handleClick}
      >
        {this.context.Dictionary?.ReadMore}
      </button>
    );
  }
}
