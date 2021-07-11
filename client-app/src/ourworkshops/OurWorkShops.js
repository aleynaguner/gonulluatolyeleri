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
      <div class="container-fluid">
        <div className="row justify-content-center">
          <div className="mx-auto">
            <p className="h3 font-weight-normal">Atölyelerimiz</p>
          </div>
        </div>
        <div className="row">
          {this.state.workshops.map((workshop) => {
            return (
              <div className="col-xl-3 col-lg-6 col-md-12 col-sm-12 mb-3">
                <WorkShop
                  key={workshop._id}
                  id={workshop._id}
                  content={workshop}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
