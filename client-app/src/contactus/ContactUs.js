import React, { Component } from "react";
import { ContactUsContent } from "./components/ContactUsContent";
import { Row } from "../components/Grid";

export class ContactUs extends Component {
  render() {
    console.log(this.context);
    return (
      <React.Fragment>
        <Row isCentered={true}>
          <p className="h3 font-weight-normal">Bize istediğini sor</p>
        </Row>
        <ContactUsContent />
      </React.Fragment>
    );
  }
}
