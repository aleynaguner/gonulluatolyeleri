import React, { Component } from "react";
import VolunteerButton from "../components/VolunteerButton";
import { Navbar } from "./components/Navbar";
import { WhatWeDone } from "./components/WhatWeDone";
import { ContactUsContent } from "../contactus/components/ContactUsContent";
import { Row, Container } from "../components/Grid";
import "./style/home.css";

export class Home extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Container>
            <Row isCentered={true}>
              <Navbar />
            </Row>
            <Row id="volunteer-button-row" isCentered={true} margins={{ t: 5 }}>
              <VolunteerButton id="volunteer-button" willBeBubbled={true} />
            </Row>
          </Container>
        </Row>
        <Row>
          <Container>
            <Row isCentered={true} margins={{ t: 5 }}>
              <p className="h3 font-weight-normal">Neleri Amaçlıyoruz ? </p>
            </Row>
            <Row isCentered={true} margins={{ t: 5 }}>
              <blockquote className="blockquote text-center">
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere erat a ante.
                </p>
                <footer className="blockquote-footer">
                  Someone famous in{" "}
                  <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </Row>
          </Container>
        </Row>
        <Row>
          <Container>
            <Row isCentered={true} margins={{ t: 5, b: 5 }}>
              <p className="h3 font-weight-normal">Neler Yaptık ? </p>
            </Row>
            <Row margins={{ l: 3, r: 3 }}>
              <WhatWeDone />
            </Row>
          </Container>
        </Row>
        <Row>
          <Container>
            <Row>
              <ContactUsContent />
            </Row>
          </Container>
        </Row>
      </Container>
    );
  }
}
