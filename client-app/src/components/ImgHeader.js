import React, { Component } from "react";
import "./style/imgHeader.css";

const headerCss = (imgSrc) => {
  return {
    position: "relative",
    height: "500px",
    overflow: "hidden",
    background: `url("${imgSrc}") no-repeat center`,
    backgroundSize: "cover",
  };
};

export class ImgHeader extends Component {
  render() {
    return (
      <div style={headerCss(this.props.imgSrc)}>
        <div className="header-content">
          <h3 style={this.props.headerTextStyle}>{this.props.headerText}</h3>
        </div>
      </div>
    );
  }
}

export default ImgHeader;
