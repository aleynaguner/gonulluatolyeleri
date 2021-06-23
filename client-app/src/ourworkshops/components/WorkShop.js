import React from "react";
import { Row, Col } from "../../components/Grid";
import config from "../../config.json";
import { withRouter } from "react-router-dom";
import BaseComponent from "../../utility/BaseComponent";
import { Constants } from "../../utility/Utils";
import PropTypes from "prop-types";
import "../style/workshop.css";
class WorkShopContent extends BaseComponent {
  constructor(props) {
    super(props);
    this.workshopImgSourceLink = `${config.BASE_URL}${config.EndPoints["getWorkshopImageById"]}/${this.props.content._id}`;
  }
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  goDetail = (e) => {
    e.preventDefault();
    this.incrementViewCount();
    this.props.history.push({
      pathname: `/ourworkshops/${this.props.content._id}`,
      state: this.props.content,
    });
  };

  incrementViewCount = () => this.sendIncrementViewCountRequest();

  sendIncrementViewCountRequest = () => {
    try {
      this.context.Services.RequestSender.SendRequest(
        Constants.HttpMethods.PUT,
        `${config.EndPoints["incrementViewCount"]}/${this.props.content._id}`
      );
    } catch (error) {}
  };

  render() {
    return (
      <Col isCentered={true} margins={this.props.margins} style={{minWidth: "30%"}}>
        <a onClick={this.goDetail}>
          <Row>
            <Col id="workshopcard">
              <img
                src={this.workshopImgSourceLink}
                alt="Avatar"
                class="topContentImage"
              />
              <div className="overlay">{this.props.content.name}</div>
            </Col>
          </Row>
        </a>
        <Row margins={{ t: 2 }} pushToRight={true}>
          <div className="ml-auto">
            <i class="fa fa-heart" aria-hidden="true" />
            <span style={{ textAlign: "center" }}>
              {this.props.content.likeCount}
            </span>
            <i class="fa fa-eye" aria-hidden="true" />
            <span style={{ textAlign: "center" }}>
              {this.props.content.viewCount}
            </span>
          </div>
        </Row>
      </Col>
    );
  }
}

const WorkShop = withRouter((props) => <WorkShopContent {...props} />);

export default WorkShop;
