import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export class HeaderLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doRedirect: false,
    };
  }

  handleClick = () => {
    this.setState({ doRedirect: true }, () =>
      this.setState({ doRedirect: false })
    );
  };

  render() {
    return (
      <Route
        path={this.props.to}
        exact={this.props.exact}
        children={() => {
          return (
            <React.Fragment>
              {this.state.doRedirect && <Redirect to={this.props.to} />}
              <a
                className="nav-item nav-link"
                style={{ cursor: "pointer" }}
                onClick={this.handleClick}
              >
                {this.props.children}
              </a>
            </React.Fragment>
          );
        }}
      />
    );
  }
}
