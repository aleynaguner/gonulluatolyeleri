import React, { Component } from "react";

export const Constant = {
  Alignment: {
    L: "Left",
    R: "Right",
  },
};

export class InfoCard extends Component {
  constructor(props) {
    super(props);

    this.state = { windowWidth: window.innerWidth };
  }

  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  }

  getContent = (textAlign) => {
    let result = [];

    if (this.state.windowWidth <= 990) {
      result = [
        this.getImgContent(),
        <div className="col mt-4"></div>,
        this.getTextContent(),
      ];
    } else if (textAlign === Constant.Alignment.L) {
      result = [this.getTextContent(), this.getImgContent()];
    } else {
      result = [this.getImgContent(), this.getTextContent()];
    }

    return result;
  };

  getTextContent = () => (
    <div className="col-sm-12 col-md-12 col-lg-8">
      <p style={{ fontSize: "1.3em" }}>{this.props.children}</p>
    </div>
  );

  getImgContent = () => (
    <div className="col-sm-12 col-md-12 col-lg-4">
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
