import React, { Component } from "react";
import "../style/home/Footer.css";
import logo from "../assets/gonulluatolyeleri.png";

export default class Footer extends Component {
  render() {
    return (
      <div className="ui text bottom fixed menu">
        <div className="item">
          <img src={logo} />
        </div>
        <a className="item">@2020, Gönüllü Atölyeleri</a>
        <div className="ui right floated item" style={{ marginRight: "2em" }}>
          <i class="facebook icon"></i>
          <i class="instagram icon"></i>
          <i class="twitter icon"></i>
        </div>
      </div>
    );
  }
}
