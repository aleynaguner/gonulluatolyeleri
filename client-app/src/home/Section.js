import React, { Component } from "react";
import "./style/section.css";

const buildSectionStyle = (type, size) => {
  let sectionStyle = {};

  if (type === "row") {
    sectionStyle["width"] = `100%`;
    sectionStyle["height"] = `${size * 10}%`;
  } else {
    sectionStyle["height"] = `auto`;
    sectionStyle["width"] = `${size * 10}%`;
  }

  return sectionStyle;
};

export class Section extends Component {
  constructor(props) {
    super(props);

    this.sectionStyle = buildSectionStyle(this.props.type, this.props.size);
  }

  render() {
    if (this.props.type === "row") {
      console.log(this.props.children);
      return (
        <div style={this.sectionStyle}>
          {React.Children.map(this.props.children, (child) => (
            <div className="columnOfRow">{child}</div>
          ))}
        </div>
      );
    } else {
      return <div style={this.sectionStyle}>{this.props.children}</div>;
    }
  }
}
