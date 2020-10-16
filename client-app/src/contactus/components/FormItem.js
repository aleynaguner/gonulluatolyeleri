import React, { Component } from "react";
import { FormValidationError } from "./FormValidationError";

export class FormItem extends Component {
  render() {
    return (
      <div className="form-group">
        <label className="mb-0 small">
          {this.props.tag}
          <FormValidationError
            valName={this.props.tag}
            display={this.props.erroneous}
            errorCode={this.props.errorCode}
          />
        </label>
        {React.createElement(this.props.itemType, {
          className: "form-control",
          type: "text",
          name: this.props.name,
          value: this.props.value,
          onChange: this.props.onChange,
          placeholder: this.props.tag,
          style: this.props.customStyles,
          ...this.props.customAttributes,
        })}
      </div>
    );
  }
}
