import React from "react";
import { Container, Row, Col } from "../components/Grid";
import WorkShop from "./components/WorkShop";
import BaseComponent from "../utility/BaseComponent";

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
      <Container>
        <Row isCentered={true}>
          <p className="h3 font-weight-normal">Atölyelerimiz</p>
        </Row>
        <Row margins={{ l: 1, r: 1, t: 1, b: 1 }}>
          {this.state.workshops.map((workshop) => {
            return (
              <Col responsiveSystem={{ sm: 12, md: 3, lg: 3, xl: 3 }}>
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
      </Container>
    );
  }
}
