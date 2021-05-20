import React from "react";
import { Container, Row, Col } from "../../components/Grid";
import config from "../../config.json";
import { withRouter } from "react-router-dom";
import { CommonButton } from "../../components/CommonButton";
import { formatByDynamicValueIfExist, Constants } from "../../utility/Utils"
import BaseComponent from "../../utility/BaseComponent";

class WorkShopDetailContent extends BaseComponent {
  constructor(props) {
    super(props);
    this.workshopImgSourceLink = `${config.BASE_URL}${config.EndPoints["getWorkshopImageById"]}/${this.props.id}`;
  }

  checkSpeakerExist = () => {
    return this.props.location.state.responsibles.some(responsible => responsible.role === Constants.WorkshopResponsibleRole.Speaker)
  }

  convertStringArrayToStringWithComma = (stringArray) => {
    console.log(stringArray)
    let stringWithComma = "";
    for (let ix = 0; ix < stringArray.length; ix++) {
      stringWithComma += stringArray[ix];
      if (ix !== stringArray.length - 1)
        stringArray += ", ";
    }
    return stringWithComma;
  }

  formatDate = () => {

  }

  render() {
    const { name, workshopDate, location, participantCount, responsibles, content } = this.props.location.state;
    console.log(this.props.location.state)
    return (
      <Container>
        <Row isCentered><p className="h3 font-weight-normal">{this.props.id}</p></Row>
        <Row isCentered><p className="h3 font-weight-normal">{name}</p></Row>
        <Row isCentered>
          <Col responsiveSystem={{ sm: 12, md: 6 }} id="workshopcard">
            <img
              src={this.workshopImgSourceLink}
              alt="Avatar"
              class="topContentImage"
            />
            <CommonButton
              text="Apply"
              customStyle={{ width: "10em", height: "auto", float: "left" }}
            />
          </Col>
          <Col responsiveSystem={{ sm: 12, md: 6 }}>
            <p>{formatByDynamicValueIfExist(this.context.Dictionary["DATE"], workshopDate)}</p>
            <p>{formatByDynamicValueIfExist(this.context.Dictionary["LOCATION"], location)}</p>
            <p>{formatByDynamicValueIfExist(this.context.Dictionary["PARTICIPANTS_COUNT"], participantCount)}</p>
            <p>{this.checkSpeakerExist() ? formatByDynamicValueIfExist(this.context.Dictionary["WORKSHOP_SPEAKERS"], this.convertStringArrayToStringWithComma(responsibles.filter(responsible => responsible.role === Constants.WorkshopResponsibleRole.Speaker))) : null}</p>
            <p>{this.checkSpeakerExist() ? formatByDynamicValueIfExist(this.context.Dictionary["WORKSHOP_ORGANIZERS"], this.convertStringArrayToStringWithComma(responsibles.filter(responsible => responsible.role === Constants.WorkshopResponsibleRole.Organizer))) : null}</p>
            <p>{formatByDynamicValueIfExist(this.context.Dictionary["WORKSHOP_CONTENT"], content)}</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

const WorkShopDetail = withRouter((props) => (
  <WorkShopDetailContent {...props} />
));

export default WorkShopDetail;
