import React, { Component } from "react";
import { ContactForm } from "./ContactForm";
import { Map } from "./Map";
import "./style/contactUs.css";

export class ContactUs extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="body" className="container-fluid">
          <ContactForm />
          <Map />
        </div>
      </React.Fragment>
    );
  }
}
