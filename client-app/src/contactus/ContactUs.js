import React, { Component } from "react";
import { ContactForm } from "./ContactForm";
import { Map } from "./Map";
import "./style/contactUs.css";

export class ContactUs extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="body" className="container-fluid">
          <Map />
        </div>
        <div className="container mt-3 ml-3">
          <ContactForm />
        </div>
      </React.Fragment>
    );
  }
}
