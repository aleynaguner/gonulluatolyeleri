import React from "react";
import BaseComponent from "../../utility/BaseComponent";
import { Container, Row, Col } from "../../components/Grid";
import { CommonButton } from "../../components/CommonButton";

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
            borderStyle: "inset",
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
              <p>{this.props.postInfo.content}</p>
            </Col>
          </Row>
          <Row>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                marginLeft: "1em",
              }}
            >
              <CommonButton
                text={this.context.Dictionary?.ReadMore}
                customStyle={{ marginRight: "1.5em" }}
              />
              <strong>No Comment</strong>
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
