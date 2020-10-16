import React, { Component } from "react";
import VolunteerButton from "../layout/components/VolunteerButton";
import { HomeSection } from "./components/HomeSection";

export class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <HomeSection sectionType="navbar">
            <VolunteerButton willBeBubbled={true} />
          </HomeSection>
          <HomeSection header="Neler Amaçlıyoruz?">
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </p>
              <footer className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
          </HomeSection>
          <HomeSection header="Neler Yaptık ?">
            <div>İçerik</div>
          </HomeSection>
          <HomeSection header="Neredeyiz?">
            <div>İçerik</div>
          </HomeSection>
        </div>
      </React.Fragment>
    );
  }
}
