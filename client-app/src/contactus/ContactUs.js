import React, { Component } from "react";
import { ContactUsContent } from "./components/ContactUsContent";
import { Loading } from "../layout/components/Loading";

export class ContactUs extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="mx-auto">
            <p className="h3 font-weight-normal">Bize istediğini sor</p>
          </div>
        </div>
        <ContactUsContent />
      </React.Fragment>
    );
  }
}
