import React from "react";
import BaseComponent from "../../utility/BaseComponent";
import { Container, Row, Col } from "../../components/Grid";
import WorkShopCreator from "./WorkShopCreator";

export default class WorkShopManagement extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      workShops: [],
    };
  }

  setSelectedWorkShop = (e) => console.log("setSelectedWorkShop");
  deleteWorkShop = (e) => console.log("deleteWorkShop");

  render() {
    return (
      <Container>
        <Row>
          <Col responsiveSystem={{ sm: 12, md: 6 }}>
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
          <Col responsiveSystem={{ sm: 12, md: 6 }}>
            <WorkShopCreator />
          </Col>
        </Row>
      </Container>
    );
  }
}
