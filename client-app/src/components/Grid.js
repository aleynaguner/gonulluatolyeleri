import React, { Component } from "react";

const addMarginSettings = (className, margins) => {
  if (margins !== undefined) {
    if (margins.l !== undefined && !isNaN(Number(margins.l))) {
      className += ` ml-${margins.l}`;
    }

    if (margins.r !== undefined || !isNaN(Number(margins.r))) {
      className += ` mr-${margins.r}`;
    }

    if (margins.t !== undefined || !isNaN(Number(margins.t))) {
      className += ` mt-${margins.t}`;
    }

    if (margins.b !== undefined || !isNaN(Number(margins.b))) {
      className += ` mb-${margins.b}`;
    }
  }
  return className;
};

export class Container extends Component {
  render() {
    return (
      <div
        className={`container${this.props.notFluid ? "" : "-fluid"}`}
        style={this.props.customStyle !== undefined ? this.props.customStyle : {}}
      >
        {this.props.children}
      </div>
    );
  }
}

export class Row extends Component {
  constructor(props) {
    super(props);

    this.className = this.createClassName();
  }

  createClassName = () => {
    return addMarginSettings(
      this.props.isCentered ? "row justify-content-center" : "row",
      this.props.margins
    );
  };

  render() {
    return (
      <div
        className={this.className}
        style={this.props.customStyle !== undefined ? this.props.customStyle : {}}
      >
        {this.props.children}
      </div>
    );
  }
}

export class Col extends Component {
  constructor(props) {
    super(props);

    this.className = this.createClassName(
      this.props.responsiveSystem,
      this.props.margins,
      this.props.isCentered
    );
  }

  createClassName = (responsiveSystem, margins, isCentered) => {
    let className = "col";

    if (responsiveSystem !== undefined && responsiveSystem !== null) {
      if (
        responsiveSystem.sm !== undefined &&
        !isNaN(Number(responsiveSystem.sm))
      ) {
        className += ` col-sm-${responsiveSystem.sm}`;
      }

      if (
        responsiveSystem.md !== undefined &&
        !isNaN(Number(responsiveSystem.md))
      ) {
        className += ` col-md-${responsiveSystem.md}`;
      }

      if (
        responsiveSystem.lg !== undefined &&
        !isNaN(Number(responsiveSystem.lg))
      ) {
        className += ` col-lg-${responsiveSystem.lg}`;
      }

      if (
        responsiveSystem.xl !== undefined &&
        !isNaN(Number(responsiveSystem.xl))
      ) {
        className += ` col-xl-${responsiveSystem.xl}`;
      }
    }

    className =
      margins !== undefined ? addMarginSettings(className, margins) : className;

    className = isCentered ? `${className} align-self-center` : className;

    return className;
  };

  render() {
    return (
      <div
        id={this.props?.id}
        className={this.className}
        style={this.props.customStyle !== undefined ? this.props.customStyle : {}}
      >
        {this.props.children}
      </div>
    );
  }
}
