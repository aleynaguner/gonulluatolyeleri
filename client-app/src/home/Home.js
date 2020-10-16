import React, { Component } from "react";
import VolunteerButton from "../layout/VolunteerButton";
import { HomeSection } from "./HomeSection";
import { ContactUs } from "../contactus/ContactUs";
import "./style/home.css";

export class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row m-5">
            <div className="mx-auto">
              <div className="row mb-5">
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="0"
                      className="active"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="1"
                    ></li>
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to="2"
                    ></li>
                  </ol>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        className="img-fluid"
                        src="https://www.guletyat.com/uploads/full/_0012_Katman%202.jpg"
                        alt="First slide"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        id="img2"
                        className="img-fluid"
                        src="https://www.guletyat.com/uploads/full/_0012_Katman%202.jpg"
                        alt="Second slide"
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        id="img3"
                        className="img-fluid"
                        src="https://www.guletyat.com/uploads/full/_0012_Katman%202.jpg"
                        alt="Third slide"
                      />
                    </div>
                  </div>
                  <a
                    className="carousel-control-prev"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a
                    className="carousel-control-next"
                    href="#carouselExampleIndicators"
                    role="button"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="mx-auto">
                  <VolunteerButton willBeBubbled={true} />
                </div>
              </div>
            </div>
          </div>
          <HomeSection header="Neler Amaçlıyoruz?">
            <blockquote className="blockquote text-center">
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                posuere erat a ante.
              </p>
              <footer className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </footer>
            </blockquote>
          </HomeSection>
          <HomeSection header="Neler Yaptık ?">
            <div>İçerik</div>
          </HomeSection>
          <HomeSection header="Neredeyiz?">
            <div>İçerik</div>
          </HomeSection>
          <HomeSection header="Bize istediğini sor...">
            <ContactUs />
          </HomeSection>
        </div>
      </React.Fragment>
    );
  }
}
