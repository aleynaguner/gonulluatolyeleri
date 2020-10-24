import React, { Component } from "react";
import { Box, BoxTypes } from "./Box";
import { Done } from "./Done";

export class WhatWeDone extends Component {
  render() {
    return (
      <React.Fragment>
        <Box type={BoxTypes.Wrapper}>
          <div
            id="multi-item-example"
            class="carousel slide carousel-multi-item"
            data-ride="carousel"
          >
            <ol class="carousel-indicators">
              <li
                data-target="#multi-item-example"
                data-slide-to="0"
                class="active"
              ></li>
              <li data-target="#multi-item-example" data-slide-to="1"></li>
              <li data-target="#multi-item-example" data-slide-to="2"></li>
            </ol>

            <div class="carousel-inner" role="listbox">
              <div class="carousel-item active">
                <Done sayi="30" />
              </div>
              <div class="carousel-item ">
                <Done sayi="25" />
              </div>
              <div class="carousel-item ">
                <Done sayi="20" />
              </div>
            </div>
          </div>
        </Box>
      </React.Fragment>
    );
  }
}
