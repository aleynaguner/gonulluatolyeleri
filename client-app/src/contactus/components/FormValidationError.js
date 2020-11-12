import React, { Component } from "react";

const errorMessages = {
  REQUIRED_VALUE: (valName) => `${valName} alanı boş bırakılamaz !`,
  REQUIRED_FORMAT_FOR_EMAIL: () =>
    "Email formatında yazınız. 'example@example.com'",
  REQUIRED_NONNUMERIC_FORMAT: () => "Sayısal olmayan değer girin !",
  MAX_LENGTH: () => "Maksimum uzunluk sınırını geçtiniz !",
};

export class FormValidationError extends Component {
  render() {
    if (this.props.display) {
      return (
        <span className="errorClass">
          {errorMessages[this.props.errorCode](this.props.valName)}
        </span>
      );
    } else {
      return <span className="defaultBadge">A</span>;
    }
  }
}
