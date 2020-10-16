import React, { Component } from "react";
import { ContactForm } from "./ContactForm";
import { Map } from "./Map";

export class ContactUsContent extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <ContactForm />
          <Map />
        </div>
      </React.Fragment>
    );
  }
}
