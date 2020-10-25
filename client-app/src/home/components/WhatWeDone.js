import React, { Component } from "react";
import { Done } from "./Done";
import { Carousel } from "../../components/Carousel";

export class WhatWeDone extends Component {
  render() {
    return (
      <React.Fragment>
        <Carousel isMultiItem={true}>
          <Done sayi="30" />
          <Done sayi="25" />
          <Done sayi="20" />
        </Carousel>
      </React.Fragment>
    );
  }
}
