import React from "react";
import BaseComponent from "../../utility/BaseComponent";
import { formatByDynamicValueIfExist } from "../../utility/Utils";
export class FormValidationError extends BaseComponent {
  render() {
    if (this.props.display) {
      return (
        <span className="errorClass">
          {formatByDynamicValueIfExist(
            this.context.Dictionary[this.props.errorCode],
            this.props.valName
          )}
        </span>
      );
    } else {
      return <span className="defaultBadge">A</span>;
    }
  }
}
