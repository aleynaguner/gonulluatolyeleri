import React from "react";
import { Container, Row, Col } from "../../components/Grid";
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

class WorkShopDetailContent extends BaseComponent {
  constructor(props) {
    super(props);
    this.workshopImgSourceLink = `${config.BASE_URL}${config.EndPoints["getWorkshopImageById"]}/${this.props.id}`;
  }

  checkSpeakerExist = () => {
    return this.props.location.state.responsibles.some(
      (responsible) =>
        responsible.role === Constants.WorkshopResponsibleRole.Speaker
    );
  };

  render() {
    const {
      name,
      workshopDate,
      location,
      participantCount,
      responsibles,
      content,
    } = this.props.location.state;
    return (
      <Container customStyle={{ marginTop: "7%" }}>
        <Row isCentered>
          <Col responsiveSystem={{ sm: 12, md: 1 }} />
          <Col id="workshopcard" responsiveSystem={{ sm: 12, md: 5 }}>
            <Row isCentered>
              <div style={{ width: "70%", height: "auto" }}>
                <img
                  src={this.workshopImgSourceLink}
                  alt="Avatar"
                  class="topContentImage"
                />
                <CommonButton
                  text="Apply"
                  customStyle={{
                    width: "10em",
                    height: "auto",
                    marginTop: "1em",
                    float: "right",
                  }}
                />
              </div>
            </Row>
          </Col>
          <Col responsiveSystem={{ sm: 12, md: 5 }}>
            <p>
              {formatByDynamicValueIfExist(
                this.context.Dictionary["DATE"],
                formatDateString(workshopDate)
              )}
            </p>
            <p>
              {formatByDynamicValueIfExist(
                this.context.Dictionary["LOCATION"],
                location
              )}
            </p>
            <p>
              {formatByDynamicValueIfExist(
                this.context.Dictionary["PARTICIPANTS_COUNT"],
                participantCount
              )}
            </p>
            <p>
              {this.checkSpeakerExist()
                ? formatByDynamicValueIfExist(
                    this.context.Dictionary["WORKSHOP_SPEAKERS"],
                    convertStringArrayToStringWithCommas(
                      responsibles.filter(
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
                      responsibles.filter(
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
                content
              )}
            </p>
          </Col>
          <Col responsiveSystem={{ sm: 12, md: 1 }} />
        </Row>
      </Container>
    );
  }
}

const WorkShopDetail = withRouter((props) => (
  <WorkShopDetailContent {...props} />
));

export default WorkShopDetail;
