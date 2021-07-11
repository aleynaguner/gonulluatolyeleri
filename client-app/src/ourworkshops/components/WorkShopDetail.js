import React from "react";
import config from "../../config.json";
import { withRouter } from "react-router-dom";
import { CommonButton } from "../../components/CommonButton";
import {
  formatByDynamicValueIfExist,
  Constants,
  convertStringArrayToStringWithCommas,
  formatDateString,
} from "../../utility/Utils";
import BaseComponent from "../../utility/BaseComponent";
import { Grid, Row, Col } from "react-flexbox-grid";

class WorkShopDetailContent extends BaseComponent {
  constructor(props) {
    super(props);
    this.workshopImgSourceLink = `${config.BASE_URL}${config.EndPoints["getWorkshopImageById"]}/${this.props.id}`;
    this.detailInfo = this.props.location.state;
  }

  checkSpeakerExist = () => {
    return this.detailInfo.responsibles.some(
      (responsible) =>
        responsible.role === Constants.WorkshopResponsibleRole.Speaker
    );
  };

  render() {
    return (
      <Grid fluid>
        <br />
        <Row center>
          <Col xs={12} sm={12} md={12} lg={6}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={4} />
              <Col xs={12} sm={12} md={12} lg={8}>
                <img
                  src={this.workshopImgSourceLink}
                  style={{
                    float: "right",
                    width: "400px",
                    height: "400px",
                    objectFit: "cover",
                  }}
                />
              </Col>
            </Row>
            <Row end="xs">
              <Col xs={12} sm={12} md={12} lg={12}>
                <CommonButton
                  text="Apply"
                  customStyle={{
                    width: "15%",
                    height: "auto",
                    marginTop: "1em",
                    float: "right",
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={12} lg={5}>
            <p>
              {formatByDynamicValueIfExist(
                this.context.Dictionary["DATE"],
                formatDateString(this.detailInfo.workshopDate)
              )}
            </p>
            <p>
              {formatByDynamicValueIfExist(
                this.context.Dictionary["LOCATION"],
                this.detailInfo.location
              )}
            </p>
            <p>
              {formatByDynamicValueIfExist(
                this.context.Dictionary["PARTICIPANTS_COUNT"],
                this.detailInfo.participantCount
              )}
            </p>
            <p>
              {this.checkSpeakerExist()
                ? formatByDynamicValueIfExist(
                    this.context.Dictionary["WORKSHOP_SPEAKERS"],
                    convertStringArrayToStringWithCommas(
                      this.detailInfo.responsibles.filter(
                        (responsible) =>
                          responsible.role ===
                          Constants.WorkshopResponsibleRole.Speaker
                      )
                    )
                  )
                : null}
            </p>
            <p>
              {this.checkSpeakerExist()
                ? formatByDynamicValueIfExist(
                    this.context.Dictionary["WORKSHOP_ORGANIZERS"],
                    convertStringArrayToStringWithCommas(
                      this.detailInfo.responsibles.filter(
                        (responsible) =>
                          responsible.role ===
                          Constants.WorkshopResponsibleRole.Organizer
                      )
                    )
                  )
                : null}
            </p>
            <br />
            <p>
              {formatByDynamicValueIfExist(
                this.context.Dictionary["WORKSHOP_CONTENT"],
                this.detailInfo.content
              )}
            </p>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const WorkShopDetail = withRouter((props) => (
  <WorkShopDetailContent {...props} />
));

export default WorkShopDetail;