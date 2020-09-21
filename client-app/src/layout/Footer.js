import React, { Component } from "react";
import logo from "./image/gonulluatolyeleri.png";

export default class Footer extends Component {
  render() {
    return (
      <div className="ui text bottom fixed menu">
        <div className="item">
          <img src={logo} />
        </div>
        <a className="item">@2020, Gönüllü Atölyeleri</a>
        <div className="ui right floated item" style={{ marginRight: "2em" }}>
          <i className="facebook icon"></i>
          <i className="instagram icon"></i>
          <i className="twitter icon"></i>
        </div>
      </div>
    );
  }
}
