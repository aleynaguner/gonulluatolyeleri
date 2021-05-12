import React, { Component } from "react";
import { Row, Col } from "../../components/Grid";
import "../style/workshop.css";

export default class WorkShop extends Component {
  render() {
    return (
      <Col isCentered={true} margins={this.props.margins}>
        <a href="google.com.tr" style={{ color: "inherit" }}>
          <Row>
            <Col id="workshopcard">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Avatar"
                class="topContentImage"
              />
              <div className="overlay">{this.props.name}</div>
            </Col>
          </Row>
          <Row margins={{ t: 2 }} pushToRight={true}>
            <div className="ml-auto">
              <i class="fa fa-heart" aria-hidden="true" />
              <span style={{ textAlign: "center" }}>1234</span>
              <i class="fa fa-eye" aria-hidden="true" />
              <span style={{ textAlign: "center" }}>1234</span>
            </div>
          </Row>
        </a>
      </Col>
    );
  }
}
