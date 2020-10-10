import React, { Component } from "react";
import { ContactForm } from "./ContactForm";
import "./style/contactUs.css";

export class ContactUs extends Component {
  render() {
    return (
      <div id="body" className="container">
        <ContactForm />
      </div>
    );
  }
}
