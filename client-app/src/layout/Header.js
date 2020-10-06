import React, { Component } from "react";
import logo from "./image/gonulluatolyeleri.png";
import { HeaderLink } from "./HeaderLink";

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand">
            <img src={logo} width="50" height="50" />
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
            <div className="navbar-nav">
              <HeaderLink to="/home">Ana Sayfa</HeaderLink>
              <HeaderLink to="/ourworkshops">Atölyelerimiz</HeaderLink>
              <HeaderLink to="/aboutus">Hakkımızda</HeaderLink>
              <HeaderLink to="/blog">Blog</HeaderLink>
              <HeaderLink to="/contactus">İletişim</HeaderLink>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
