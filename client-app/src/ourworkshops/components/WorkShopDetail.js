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
    //#region
    // return (
    //   <div className="container-fluid">
    //     <div className="row">
    //       <div className="col-sm-12 col-md-12 col-lg-6">
    //         <div style={{ display: "flex", justifyContent: "flex-end" }}>
    //           <img src={this.workshopImgSourceLink} style={{ width: "70%" }} />
    //         </div>
    //         <br />
    //         <CommonButton
    //           text="Apply"
    //           customStyle={{
    //             width: "15%",
    //             height: "auto",
    //             marginTop: "1em",
    //             float: "right",
    //           }}
    //         />
    //       </div>
    //       <div className="col-sm-12 col-md-12 col-lg-6">
    //         <p>
    //           {formatByDynamicValueIfExist(
    //             this.context.Dictionary["DATE"],
    //             formatDateString(workshopDate)
    //           )}
    //         </p>
    //         <p>
    //           {formatByDynamicValueIfExist(
    //             this.context.Dictionary["LOCATION"],
    //             location
    //           )}
    //         </p>
    //         <p>
    //           {formatByDynamicValueIfExist(
    //             this.context.Dictionary["PARTICIPANTS_COUNT"],
    //             participantCount
    //           )}
    //         </p>
    //         <p>
    //           {this.checkSpeakerExist()
    //             ? formatByDynamicValueIfExist(
    //                 this.context.Dictionary["WORKSHOP_SPEAKERS"],
    //                 convertStringArrayToStringWithCommas(
    //                   responsibles.filter(
    //                     (responsible) =>
    //                       responsible.role ===
    //                       Constants.WorkshopResponsibleRole.Speaker
    //                   )
    //                 )
    //               )
    //             : null}
    //         </p>
    //         <p>
    //           {this.checkSpeakerExist()
    //             ? formatByDynamicValueIfExist(
    //                 this.context.Dictionary["WORKSHOP_ORGANIZERS"],
    //                 convertStringArrayToStringWithCommas(
    //                   responsibles.filter(
    //                     (responsible) =>
    //                       responsible.role ===
    //                       Constants.WorkshopResponsibleRole.Organizer
    //                   )
    //                 )
    //               )
    //             : null}
    //         </p>
    //         <br />
    //         <p>
    //           {formatByDynamicValueIfExist(
    //             this.context.Dictionary["WORKSHOP_CONTENT"],
    //             content
    //           )}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // );
    //#endregion
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
                  style={{ minWidth: "100%", maxWidth: "100%" }}
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
        </Row>
      </Grid>
    );
  }
}

const WorkShopDetail = withRouter((props) => (
  <WorkShopDetailContent {...props} />
));

export default WorkShopDetail;
