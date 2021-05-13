import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid";

export default class WorkShopDetail extends Component {
  render() {
    return (
      <Container>
        <Row isCentered>
          <p className="h3 font-weight-normal">{this.props.id}</p>
        </Row>
      </Container>
    );
  }
}
