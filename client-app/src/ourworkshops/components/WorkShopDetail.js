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
import "../style/workshopdetail.css";

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
      <div className="container-fluid">
        <br />
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="row d-flex justify-content-end">
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-xs-12">
                <img id="workshop-img" src={this.workshopImgSourceLink} />
              </div>
            </div>
            <div className="row justify-content-end">
              <div className="col-3" style={{}}>
                <CommonButton text="Apply" />
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg- col-md-12 col-sm-12 col-xs-12">
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
            <p>{this.context.Dictionary["WORKSHOP_CONTENT"]}</p>
            <div style={{ height: "40vh", overflow: "auto", width: "100%" }}>
              <p>{this.detailInfo.content}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const WorkShopDetail = withRouter((props) => (
  <WorkShopDetailContent {...props} />
));

export default WorkShopDetail;
