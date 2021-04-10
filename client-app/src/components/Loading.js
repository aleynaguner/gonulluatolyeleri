import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid";
import "./style/loading.css";

export default class Loading extends Component {
  render() {
    return (
      <Container>
        <Row isCentered={true}>
          <Col isCentered={true}>
            <div className="loading" />
          </Col>
        </Row>
      </Container>
    );
  }
}