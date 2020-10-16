import React, { Component } from "react";

const errorMessages = {
  REQUIRED_VALUE: (valName) => `${valName} alanı boş bırakılamaz !`,
  REQUIRED_FORMAT_FOR_EMAIL: () =>
    "Email formatında yazınız. 'example@example.com'",
};

export class FormValidationError extends Component {
  render() {
    return (
      <span
        className="badge badge-danger"
        style={{
          display: `${this.props.display ? "block" : "none"}`,
        }}
      >
        {this.props.display
          ? errorMessages[this.props.errorCode](this.props.valName)
          : ""}
      </span>
    );
  }
}
