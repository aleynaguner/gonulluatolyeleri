import React, { Component } from "react";
import "./style/footer.css";

export default class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer>
          <div className="footer-copyright py-3 container-fluid">
            <p className="footer-block">@2020, Gönüllü Atölyeleri</p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}
