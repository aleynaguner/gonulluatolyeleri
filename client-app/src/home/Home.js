import React, { Component } from "react";
import VolunteerButton from "../layout/components/VolunteerButton";
import { Navbar } from "./components/Navbar";
import { Box, BoxTypes } from "./components/Box";
import { ContactUsContent } from "../contactus/components/ContactUsContent";

export class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Box type={BoxTypes.Wrapper}>
          <Box type={BoxTypes.Wrapper}>
            <Box type={BoxTypes.Row}>
              <Box type={BoxTypes.Column}>
                <Navbar />
              </Box>
            </Box>
            <Box type={BoxTypes.Row}>
              <Box type={BoxTypes.Column}>
                <VolunteerButton
                  willBeBubbled={true}
                  customStyle={{ width: "25%" }}
                />
              </Box>
            </Box>
          </Box>
          <Box type={BoxTypes.Wrapper}>
            <Box type={BoxTypes.Row}>
              <p className="h3 font-weight-normal">Neler Yaptık ? </p>
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
          <Box type={BoxTypes.Row}>
            <Box type={BoxTypes.Column}>
              <ContactUsContent />
            </Box>
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}
