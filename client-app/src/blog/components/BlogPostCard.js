import React from "react";
import BaseComponent from "../../utility/BaseComponent";
import { Container, Row, Col } from "../../components/Grid";
import { CommonButton } from "../../components/CommonButton";
import {
  BasicCommonButton,
  BasicCommonButtonColor,
  BasicCommonButtonType,
} from "../../components/BasicCommonButton";
import ReadMoreButton from "./ReadMoreButton";

export default class BlogPostCard extends BaseComponent {
  render() {
    return (
      <Col
        responsiveSystem={this.props.responsiveSystem}
        margins={this.props.margins}
      >
        <Container
          customStyle={{
            padding: "2em",
            backgroundColor: "#F7F7F7",
            borderStyle: "outset",
            borderRadius: "1em",
          }}
        >
          <Row margins={{ b: 2 }}>
            <Col>
              <h3>{this.props.postInfo.header}</h3>
            </Col>
          </Row>
          <Row margins={{ b: 2 }}>
            <Col>
              <p>{`${this.props.postInfo.content?.substring(0, 500)}...`}</p>
            </Col>
          </Row>
          <Row>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                marginLeft: "0.8em",
              }}
            >
              {/* <BasicCommonButton
                text={this.context.Dictionary?.ReadMore}
                type={BasicCommonButtonType.ShadowOnHover}
                color={BasicCommonButtonColor.Green}
                
                handleClick={(e) => {}}
              /> */}
              <ReadMoreButton customStyle={{ marginRight: "1.5em" }} />
              <strong style={{ whiteSpace: "nowrap" }}>No Comment</strong>
            </div>
            <div className="mx-auto"></div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <a href="#" className="fa fa-lg fa-twitter"></a>
              <a href="#" className="fa fa-lg fa-instagram"></a>
            </div>
          </Row>
        </Container>
      </Col>
    );
  }
}
