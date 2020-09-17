import React, { Component } from "react";
import "../style/home/Header.css";
import logo from "../assets/gonulluatolyeleri.png";

export default class Header extends Component {
  render() {
    return (
      <div id="navbar" className="ui borderless main menu fixed">
        <div className="ui text container">
          <div className="header item">
            <img src={logo} />
          </div>
          <a className="item">Ana Sayfa</a>
          <a className="item">Hakkımızda</a>
          <a className="item">Atölyelerimiz</a>
          <a className="item">İletişim</a>
          <div className="ui right floated item">
            <i class="facebook icon"></i>
            <i class="instagram icon"></i>
            <i class="twitter icon"></i>
          </div>
        </div>
      </div>
    );
  }
}
