import React, { Component } from "react";
import "./style/footer.css";

export default class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="footer">
          <div class="container">
            <p class="footer-block">@2020, Gönüllü Atölyeleri</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
