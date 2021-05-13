import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid";
import WorkShop from "./components/WorkShop";

export class OurWorkShops extends Component {
  render() {
    return (
      <Container>
        <Row isCentered={true}>
          <p className="h3 font-weight-normal">Atölyelerimiz</p>
        </Row>
        <Row margins={{ l: 1, r: 1, t: 1, b: 1 }}>
          <Col responsiveSystem={{ sm: 12, md: 3, lg: 3, xl: 3 }}>
            <WorkShop id="1" name="WorkShop!" margins={{ t: 3, l: 2, r: 2 }} />
          </Col>
          <Col responsiveSystem={{ sm: 12, md: 3, lg: 3, xl: 3 }}>
            <WorkShop id="2" name="WorkShop!" margins={{ t: 3, l: 2, r: 2 }} />
          </Col>
          <Col responsiveSystem={{ sm: 12, md: 3, lg: 3, xl: 3 }}>
            <WorkShop id="3" name="WorkShop!" margins={{ t: 3, l: 2, r: 2 }} />
          </Col>
          <Col responsiveSystem={{ sm: 12, md: 3, lg: 3, xl: 3 }}>
            <WorkShop id="4" name="WorkShop!" margins={{ t: 3, l: 2, r: 2 }} />
          </Col>
        </Row>
      </Container>
    );
  }
}
