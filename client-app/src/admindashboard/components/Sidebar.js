import React, { Component } from "react";
import "../style/sidebar.css";

export class Sidebar extends Component {
  render() {
    return (
      <div
        className="d-flex"
        id="wrapper"
        style={{ height: "100%", overflow: "hidden", margin: "0" }}
      >
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">{this.props.heading}</div>
          <div className="list-group list-group-flush">
            {this.props.links.map((link, ix) => {
              return (
                <a
                  key={ix}
                  className="list-group-item list-group-item-action bg-light"
                  style={{ cursor: "pointer" }}
                  onClick={link.onClick}
                >
                  {link.text}
                </a>
              );
            })}
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
