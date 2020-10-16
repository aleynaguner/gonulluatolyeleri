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
        {this.props.itemType === "input" ? (
          <input
            className="form-control"
            type="text"
            name={this.props.valName}
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder={this.props.tag}
            style={this.props.customerStyle}
          />
        ) : (
          <textarea
            id="messageTextArea"
            className="form-control"
            rows="5"
            name={this.props.valName}
            value={this.props.value}
            onChange={this.props.onChange}
            placeholder={this.props.tag}
            style={this.props.customerStyle}
          ></textarea>
        )}
      </div>
    );
  }
}
