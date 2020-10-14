import React, { Component } from "react";
import logo from "./image/gonulluatolyeleri.png";
import { HeaderLink } from "./HeaderLink";
import VolunteerButton from "./VolunteerButton";
import "./style/header.css";

export default class Header extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-md navbar-light bg-light shadow fixed-top">
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
          <div class="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav mr-auto headerLink">
              <HeaderLink to="/home">Ana Sayfa</HeaderLink>
              <HeaderLink to="/ourworkshops">Atölyelerimiz</HeaderLink>
              <HeaderLink to="/projects">Projelerimiz</HeaderLink>
              <HeaderLink to="/aboutus">Hakkımızda</HeaderLink>
              <HeaderLink to="/blog">Blog</HeaderLink>
              <HeaderLink to="/contactus">İletişim</HeaderLink>
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
