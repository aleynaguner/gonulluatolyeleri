import React, { Component } from "react";
import { ContactForm } from "./ContactForm";
import { Map } from "./Map";

export class ContactUsContent extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row mb-4">
            <ContactForm />
          </div>
          <div className="row">
            <Map />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
