import React, { Component } from "react";

export const Constant = {
  Alignment: {
    L: "Left",
    R: "Right",
  },
};

export class InfoCard extends Component {
  getContent = (textAlign) => {
    let result = [];

    if (textAlign === Constant.Alignment.L) {
      result = [this.getTextContent(), this.getImgContent()];
    } else {
      result = [this.getImgContent(), this.getTextContent()];
    }

    return result;
  };
  getTextContent = () => (
    <div className="col-lg-8 col-md-12 col-sm-12">
      <p style={{ fontSize: "20px" }}>{this.props.children}</p>
    </div>
  );
  getImgContent = () => (
    <div className="col-lg-4 col-md-12 col-sm-12">
      <div className="d-flex justify-content-center">
        <img src={this.props.imgsrc} class="img-fluid" alt="..."></img>
      </div>
    </div>
  );

  render() {
    return (
      <div className="row mt-5">{this.getContent(this.props.textAlign)}</div>
    );
  }
}
