import React, { Component } from "react";
import logo from "./image/gonulluatolyeleri.png";
import { HeaderLink } from "./HeaderLink";

export default class Header extends Component {
  render() {
    return (
      <div className="ui borderless main menu">
        <div className="ui text container">
          <div className="header item">
            <img src={logo} />
          </div>
          <HeaderLink to="/home">Ana Sayfa</HeaderLink>
          <HeaderLink to="/ourworkshops">Atölyelerimiz</HeaderLink>
          <HeaderLink to="/aboutus">Hakkımızda</HeaderLink>
          <HeaderLink to="/contactus">İletişim</HeaderLink>
          <a className="item"></a>
          <div className="ui right floated item">
            <i className="facebook icon"></i>
            <i className="instagram icon"></i>
            <i className="twitter icon"></i>
          </div>
        </div>
      </div>
    );
  }
}
