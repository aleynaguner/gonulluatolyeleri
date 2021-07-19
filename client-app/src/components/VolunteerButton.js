import React from "react";
import "./style/volunteerButton.css";
import BaseComponent from "../utility/BaseComponent";

export default class VolunteerButton extends BaseComponent {
  constructor(props) {
    super(props);

    this.defaultButtonClassName = "bubbly-button";
    this.animateButton = "animate";

    this.state = {
      buttonClassName: this.defaultButtonClassName,
    };
  }

  handleClick = (e, willBeBubbled) => {
    if (willBeBubbled) {
      e.persist();

      this.setState((state) => {
        state.buttonClassName = `${this.defaultButtonClassName} ${this.animateButton}`;
        return state;
      });

      setTimeout(
        () =>
          this.setState({
            ...this.state,
            buttonClassName: this.defaultButtonClassName,
          }),
        700
      );
    } else {
      e.stopPropagation();
    }
  };

  render() {
    if (this.props.id) {
      return (
        <button
          id={this.props.id}
          className={this.state.buttonClassName}
          onClick={(e) => this.handleClick(e, this.props.willBeBubbled)}
          style={
            this.props.customStyle !== undefined
              ? { ...this.props.customStyle }
              : {}
          }
        >
          {this.context.Dictionary?.VolunteerButton_Text}
        </button>
      );
    }
    return (
      <button
        className={this.state.buttonClassName}
        onClick={(e) => this.handleClick(e, this.props.willBeBubbled)}
        style={
          this.props.customStyle !== undefined
            ? { ...this.props.customStyle }
            : {}
        }
      >
        {this.context.Dictionary?.VolunteerButton_Text}
      </button>
    );
  }
}
