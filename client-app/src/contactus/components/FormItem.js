import React, { Component } from "react";
import { FormValidationError } from "./FormValidationError";
import { hasDefaultValue } from "../../utility/Utils";

export class FormItem extends Component {
  render() {
    return (
      <div className="form-group" style={{ marginBottom: "0rem" }}>
        <label className="mb-0 small">{this.props.tag}</label>
        {React.createElement(this.props.itemType, {
          className: this.props.erroneous
            ? "form-control has-error"
            : "form-control ",
          type: hasDefaultValue(this.props.inputType)
            ? "text"
            : this.props.inputType,
          name: this.props.name,
          value: this.props.value,
          onChange: this.props.onChange,
          placeholder: this.props.tag,
          style: this.props.customStyles,
          ...this.props.customAttributes,
        })}
        <FormValidationError
          valName={this.props.tag}
          display={this.props.erroneous}
          errorCode={this.props.errorCode}
        />
      </div>
    );
  }
}
