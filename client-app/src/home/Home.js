import React, { Component } from "react";
import VolunteerButton from "../components/VolunteerButton";
import { Navbar } from "./components/Navbar";
import { Box, BoxTypes } from "../components/Box";
import { WhatWeDone } from "./components/WhatWeDone";
import { ContactUsContent } from "../contactus/components/ContactUsContent";

export class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Box type={BoxTypes.Wrapper}>
          <Box type={BoxTypes.Wrapper}>
            <Box type={BoxTypes.Row}>
              <Navbar />
            </Box>
            <Box type={BoxTypes.Row}>
              <VolunteerButton
                willBeBubbled={true}
                customStyle={{ width: "25%" }}
              />
            </Box>
          </Box>
          <Box type={BoxTypes.Wrapper}>
            <Box type={BoxTypes.Row}>
              <p className="h3 font-weight-normal">Neleri Amaçlıyoruz ? </p>
            </Box>
            <Box type={BoxTypes.Row}>
              <blockquote className="blockquote text-center">
                <p className="mb-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer posuere erat a ante.
                </p>
                <footer className="blockquote-footer">
                  Someone famous in{" "}
                  <cite title="Source Title">Source Title</cite>
                </footer>
              </blockquote>
            </Box>
          </Box>
          <Box type={BoxTypes.Wrapper.NotFluid}>
            <Box type={BoxTypes.Row}>
              <p className="h3 font-weight-normal">Neler Yaptık ? </p>
            </Box>
            <Box type={BoxTypes.Row}>
              <WhatWeDone />
            </Box>
          </Box>
          <Box type={BoxTypes.Row}>
            <ContactUsContent />
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}
