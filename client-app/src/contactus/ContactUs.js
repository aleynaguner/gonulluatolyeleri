import React, { Component } from "react";
import { ContactForm } from "./ContactForm";
import { Map } from "./Map";

export class ContactUs extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="mx-auto">
            <p className="h3 font-weight-normal">Bize istediğini sor</p>
          </div>
        </div>
        <div className="container-fluid">
          <ContactForm />
          <Map />
        </div>
      </React.Fragment>
    );
  }
}
