import React, { Component } from "react";
import { Done } from "./Done";
import { Carousel, CarouselSlide } from "../../components/Carousel";

export class WhatWeDone extends Component {
  render() {
    return (
      <React.Fragment>
        <Carousel isMultiItem={true}>
          <CarouselSlide>
            <Done sayi="30" />
            <Done sayi="30" />
            <Done sayi="30" />
          </CarouselSlide>
          <CarouselSlide>
            <Done sayi="25" />
            <Done sayi="25" />
            <Done sayi="25" />
          </CarouselSlide>
          <CarouselSlide>
            <Done sayi="20" />
            <Done sayi="20" />
            <Done sayi="20" />
          </CarouselSlide>
        </Carousel>
      </React.Fragment>
    );
  }
}
