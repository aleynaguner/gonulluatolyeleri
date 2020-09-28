import React, { Component } from "react";
import { Section } from "./Section.js";
import "./style/home.css";
import gonulluOlPhoto from "./image/testPhoto.jpg";

export class Home extends Component {
  render() {
    return (
      <div id="custUiGrid">
          <Section type="row" size="5">
            <Section type="column" size="5">
              <img
                src={gonulluOlPhoto}
                style={{ height: "auto", width: "100%" }}
              />
            </Section>
            <Section type="column" size="1">
              <p>Gönüllü Ol !</p>
            </Section>
          </Section>
      </div>
    );
  }
}
