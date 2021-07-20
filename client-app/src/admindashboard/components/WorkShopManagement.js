import React from "react";
import BaseComponent from "../../utility/BaseComponent";
import { Container, Row, Col } from "../../components/Grid";
import WorkShopCreator, { NEW_WORKSHOP_ID } from "./WorkShopCreator";
import Loading from "../../components/Loading";
import config from "../../config.json";
import { Constants, hasDefaultValue } from "../../utility/Utils";

const NEW_WORKSHOP = { 
  _id: NEW_WORKSHOP_ID, 
  name: "Create New Workshop" 
};

export default class WorkShopManagement extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      workShops: [NEW_WORKSHOP],
      selectedWorkShop: NEW_WORKSHOP,
    };
  }

  loadWorkshops = async () => {
    let allWorkshops;
    try {
      allWorkshops = await this.getAllWorkShops();
    } catch (error) {
      console.error(error);
      allWorkshops = [];
    } finally {
      this.setState((state) => {
        return {
          loading: false,
          selectedWorkShop: NEW_WORKSHOP,
          workShops: [NEW_WORKSHOP, ...allWorkshops],
        };
      });
    }
  };

  getAllWorkShops = async () => {
    let getAllWorkShopsResponse =
      await this.context.Services.RequestSender.AwaitableSendRequest(
        Constants.HttpMethods.GET,
        config.EndPoints.getAllWorkShops
      );

    return getAllWorkShopsResponse.isSuccess
      ? getAllWorkShopsResponse.responseData
      : [];
  };

  setSelectedWorkShop = (e) => {
    e.persist();
    this.setState(
      (state) => {
        let selected = state.workShops.filter(
          (workShop) => workShop._id === e.target.id
        )[0];
        return { selectedWorkShop: selected };
      }
    );
  };

  onWorkshopCreated = async () => {
    // TO-DO: çalışmıyor check et
    await this.loadWorkshops();
  }

  deleteWorkShop = (e) => {
    if (window.confirm("Are you sure ?")) {
      let toBeDeletedWorkshopId = this.state.selectedWorkShop._id;
      if (hasDefaultValue(toBeDeletedWorkshopId)) return;
      
      this.sendDeleteWorkshopByIdRequest(toBeDeletedWorkshopId, async (res) => {
        // will be changed
        if (!res.isSuccess) alert("deleteWorkshopById unsuccessful");
        else {
          alert("deleteUserById successful");
          await this.loadWorkshops();
        }
      });
    }
  }

  sendDeleteWorkshopByIdRequest = (id, callback) => {
    this.context.Services.RequestSender.SendRequest(
      Constants.HttpMethods.DELETE,
      `${config.EndPoints["deleteWorkshopById"]}/${id}`,
      callback,
      this.context.AuthorityInfo.Token
    );
  }

  async componentDidMount() {
    await this.loadWorkshops();
  }

  render() {
    console.log(this.state)
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <Container>
        <Row>
          <Col responsiveSystem={{ sm: 12, md: 5 }}>
            <Row>
              <Col margins={{ t: 2, b: 2 }}>
                <h2>{this.context.Dictionary?.OurworkshopsPage_Name}</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <div
                  className="list-group"
                  style={{
                    overflow: "scroll",
                    overflowX: "hidden",
                    height: "400px",
                  }}
                >
                  {this.state.workShops.map((workShop) => {
                    return (
                      <button
                        id={workShop._id}
                        type="button"
                        className="list-group-item list-group-item-action"
                        style={{
                          backgroundColor: "#80C08C",
                          borderColor: "#F7F7F7",
                        }}
                        onClick={this.setSelectedWorkShop}
                      >
                        {workShop?.name}
                      </button>
                    );
                  })}
                </div>
              </Col>
            </Row>
            <Row>
              <Col margins={{ t: 2, r: 2 }}>
                <button
                  className="btn btn-danger float-right"
                  style={{ width: "20%" }}
                  onClick={this.deleteWorkShop}
                >
                  Remove
                </button>
              </Col>
            </Row>
          </Col>
          <Col responsiveSystem={{ sm: 12, md: 7 }}>
            <WorkShopCreator 
              selectedWorkshop={this.state.selectedWorkShop} 
              onWorkshopCreated={this.onWorkshopCreated} />
          </Col>
        </Row>
      </Container>
    );
  }
}
