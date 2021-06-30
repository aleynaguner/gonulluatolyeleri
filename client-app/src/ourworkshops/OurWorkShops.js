import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import WorkShop from "./components/WorkShop";
import BaseComponent from "../utility/BaseComponent";
import "./style/ourworkshops.css";

export class OurWorkShops extends BaseComponent {
  constructor(props) {
    super(props);
    this.loadWorkshops = this.componentHelper.createListDataLoader({
      componentReferrer: this,
      listStatePropName: "workshops",
      getDataEndpointKey: "getAllWorkShops",
    });
    this.state = {
      loading: false,
      workshops: [],
    };
  }
  async componentDidMount() {
    await this.loadWorkshops();
  }
  render() {
    return (
      <Grid fluid>
        <Row center="xs">
          <Col>
            <p className="h3 font-weight-normal">Atölyelerimiz</p>
          </Col>
        </Row>
        <Row className="workshops-row" start="xs">
          {this.state.workshops.map((workshop) => {
            return (
              <Col
                className="workshop-card"
                xs={12}
                sm={5}
                md={5}
                lg={2.5}
                xl={2.5}
              >
                <WorkShop
                  key={workshop._id}
                  id={workshop._id}
                  content={workshop}
                  margins={{ t: 3, l: 2, r: 2 }}
                />
              </Col>
            );
          })}
        </Row>
      </Grid>
    );
  }
}
