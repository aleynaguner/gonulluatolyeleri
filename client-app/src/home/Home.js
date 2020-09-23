import React, { Component } from "react";
import { Section } from "./Section.js";
import "./style/home.css";
import gonulluOlPhoto from "./image/testPhoto.jpg";

export class Home extends Component {
  render() {
    return (
      <div id="custUiGrid">
        <Section type="row" height="80">
          <Section type="column" size="1">
            <img
              src={gonulluOlPhoto}
              style={{ height: "auto", width: "80%" }}
            />
          </Section>
          <Section type="column">
            <p>Gönüllü Ol !</p>
          </Section>
        </Section>
      </div>
    );
  }
}
