import React from "react";
import logo from "./image/gonulluatolyeleri.png";
import { HeaderLink } from "./components/HeaderLink";
import VolunteerButton from "../components/VolunteerButton";
import "./style/header.css";
import BaseComponent from "../utility/BaseComponent";

export default class Header extends BaseComponent {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light shadow fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand">
            <img src={logo} width="75" height="75" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav mr-auto headerLink">
              <HeaderLink to="/home">
                {this.context.Dictionary?.HomePage_Name}
              </HeaderLink>
              <HeaderLink to="/ourworkshops">
                {this.context.Dictionary?.OurworkshopsPage_Name}
              </HeaderLink>
              <HeaderLink to="/projects">
                {this.context.Dictionary?.ProjectsPage_Name}
              </HeaderLink>
              <HeaderLink to="/aboutus">
                {this.context.Dictionary?.AboutusPage_Name}
              </HeaderLink>
              <HeaderLink to="/blog">
                {this.context.Dictionary?.BlogPage_Name}
              </HeaderLink>
              <HeaderLink to="/contactus">
                {this.context.Dictionary?.ContactUsPage_Name}
              </HeaderLink>
            </div>
            <div className="navbar-nav navbar-right ml-auto d-none d-lg-block d-xl-block mr-3">
              <a href="#" className="fa fa-lg fa-twitter"></a>
              <a href="#" className="fa fa-lg fa-linkedin"></a>
              <a href="#" className="fa fa-lg fa-youtube"></a>
              <a href="#" className="fa fa-lg fa-instagram"></a>
            </div>
            <div className="navbar-nav d-none d-lg-block d-xl-block">
              <VolunteerButton willBeBubbled={false} />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
