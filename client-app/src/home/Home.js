import React, { Component } from "react";
import { Section } from "./Section.js";
import "./style/home.css";

export class Home extends Component {
  render() {
    return (
      <div id="custUiGrid" className="ui grid">
        <Section type="row">
          <Section size="6">makamela</Section>
          <Section size="1">makamela</Section>
        </Section>
        <Section size="6">Section 2</Section>
        <Section>Section 2</Section>
        <Section>Section 2</Section>
        <Section>Section 2</Section>
      </div>
    );
  }
}
