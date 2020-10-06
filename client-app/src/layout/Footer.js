import React, { Component } from "react";
import "./style/footer.css";

export default class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="footer" className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <p className="footer-block">@2020, Gönüllü Atölyeleri</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
