import React from "react";
import { Col } from "../../components/Grid";
import ResponsiveBaseComponent from "../../utility/ResponsiveBaseComponent";

export const Constant = {
  Alignment: {
    L: "Left",
    R: "Right",
  },
};

export class InfoCard extends ResponsiveBaseComponent {
  constructor(props) {
    super(props);
  }

  getContent = (textAlign) => {
    let result = [];

    if (this.state.windowWidth <= 990) {
      result = [
        this.getImgContent(),
        <Col id="empty-div" margins={{ t: 4 }} />,
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
    <Col id="text" responsiveSystem={{ sm: 12, md: 12, lg: 8 }}>
      <p style={{ fontSize: "1.3em" }}>{this.props.children}</p>
    </Col>
  );

  getImgContent = () => (
    <Col id="img" responsiveSystem={{ sm: 12, md: 12, lg: 4 }}>
      <div className="d-flex justify-content-center">
        <img src={this.props.imgsrc} className="img-fluid" alt="..."></img>
      </div>
    </Col>
  );

  render() {
    return (
      <React.Fragment>{this.getContent(this.props.textAlign)}</React.Fragment>
    );
  }
}
