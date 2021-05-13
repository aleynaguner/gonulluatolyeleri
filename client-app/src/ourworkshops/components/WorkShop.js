import React, { Component } from "react";
import { Row, Col } from "../../components/Grid";
import { Link } from "react-router-dom";
import "../style/workshop.css";

export default class WorkShop extends Component {
  render() {
    return (
      <Col isCentered={true} margins={this.props.margins}>
        <Link to={`/ourworkshops/${this.props.id}`}>
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
        </Link>
      </Col>
    );
  }
}
