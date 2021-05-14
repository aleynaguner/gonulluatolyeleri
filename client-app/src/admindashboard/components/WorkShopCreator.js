import React from "react";
import BaseComponent from "../../utility/BaseComponent";
import { Container, Row, Col } from "../../components/Grid";
import { FormItem } from "../../contactus/components/FormItem";
import { BasicCommonButton } from "../../components/BasicCommonButton";
import { Modal } from "../../components/Modal";
import "../style/workshopcreator.css";

export const NEW_WORKSHOP_ID = "0";
export default class WorkShopCreator extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
      category: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
      content: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
      workshopDate: {
        value: "",
      },
      applicationDeadline: {
        value: "",
      },
      location: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
      image: null,
    };
  }

  updateFormValues = (e) => {
    let updatedFormValueName = e.target.name.toString();
    let updateFormValue = e.target.value.toString();
    this.setState(
      (state) => {
        return {
          ...state,
          [updatedFormValueName]: {
            ...state[updatedFormValueName],
            value: updateFormValue,
          },
        };
      },
      () => console.log(this.state)
    );
  };

  setStateByToBeUpdatedWorkshopValues = () => {
    this.setState((state) => {
      let newValues = {};
      for (const valueKey in state) {
        if (valueKey === "image") continue;

        state[valueKey]["value"] = this.props.selectedWorkshop[valueKey];
        if (
          !(valueKey == "workshopDate" && valueKey === "applicationDeadline")
        ) {
          state[valueKey]["erroneous"] = false;
          state[valueKey]["errorCode"] = "";
        }
        newValues[valueKey] = state[valueKey];
      }
      return { ...state, newValues };
    });
  };

  clearState = () => {
    this.setState({
      name: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
      category: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
      content: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
      workshopDate: {
        value: "",
      },
      applicationDeadline: {
        value: "",
      },
      location: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
      image: null,
    });
  };

  componentDidUpdate(prevProps) {
    let selectedWorkshopChanged =
      prevProps.selectedWorkshop._id !== this.props.selectedWorkshop._id;
    if (!selectedWorkshopChanged) return;

    let creationProcessStarting =
      this.props.selectedWorkshop._id === NEW_WORKSHOP_ID;
    if (creationProcessStarting) this.clearState();
    else this.setStateByToBeUpdatedWorkshopValues();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Row>
              <Col margins={{ t: 2, b: 2 }}>
                <h2 style={{ textAlign: "center" }}>
                  {this.context.Dictionary?.SaveWorkShop}
                </h2>
              </Col>
            </Row>
            <Row>
              <Col responsiveSystem={{ sm: 12, md: 6 }}>
                <FormItem
                  itemType="input"
                  tag="Name"
                  name="name"
                  value={this.state.name.value}
                  erroneous={this.state.name.erroneous}
                  errorCode={
                    this.state.name.erroneous ? this.state.name.errorCode : null
                  }
                  onChange={this.updateFormValues}
                  customAttributes={
                    this.props.selectedWorkshop._id !== NEW_WORKSHOP_ID
                      ? { disabled: "disabled" }
                      : {}
                  }
                />
              </Col>
              <Col responsiveSystem={{ sm: 12, md: 6 }}>
                <FormItem
                  itemType="input"
                  tag="Category"
                  name="category"
                  value={this.state.category.value}
                  erroneous={this.state.category.erroneous}
                  errorCode={
                    this.state.category.erroneous
                      ? this.state.category.errorCode
                      : null
                  }
                  onChange={this.updateFormValues}
                />
              </Col>
            </Row>
            <Row>
              <Col responsiveSystem={{ sm: 6, md: 3 }}>
                <label className="mb-0 small">Work Shop Date</label>
                <br />
                <input
                  id="workshopDate"
                  name="workshopDate"
                  type="datetime-local"
                  value={this.state.workshopDate.value}
                  onChange={this.updateFormValues}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col responsiveSystem={{ sm: 6, md: 3 }}>
                <label className="mb-0 small">Application Deadline</label>
                <br />
                <input
                  id="applicationDeadline"
                  name="applicationDeadline"
                  type="datetime-local"
                  value={this.state.applicationDeadline.value}
                  onChange={this.updateFormValues}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col responsiveSystem={{ sm: 12, md: 6 }}>
                <FormItem
                  itemType="input"
                  tag="Location"
                  name="location"
                  value={this.state.location.value}
                  erroneous={this.state.location.erroneous}
                  errorCode={
                    this.state.location.erroneous
                      ? this.state.location.errorCode
                      : null
                  }
                  onChange={this.updateFormValues}
                />
              </Col>
            </Row>
            <Row>
              <Col isCentered>
                <label className="mb-0 small">Responsibles</label>
                <select
                  id="responsibles"
                  multiple
                  class="form-control"
                  style={{ height: "58%" }}
                ></select>
                <Row isCentered margins={{ t: 2 }}>
                  <Col>
                    <button className="btn btn-danger float-right">
                      Remove
                    </button>
                    <button
                      type="button"
                      className="btn btn-dark"
                      data-toggle="modal"
                      data-target=".bd-example-modal-lg"
                      style={{ float: "right", marginRight: "0.5em" }}
                    >
                      Add Responsible
                    </button>
                    <Modal
                      heading="New Responsible"
                      content={<div>Hi !</div>}
                    />
                  </Col>
                </Row>
              </Col>
              <Col>
                <FormItem
                  itemType="textarea"
                  name="content"
                  tag={"Content"}
                  value={this.state.content.value}
                  erroneous={this.state.content.erroneous}
                  errorCode={
                    this.state.content.erroneous
                      ? this.state.content.errorCode
                      : null
                  }
                  customAttributes={{ id: "messageTextArea", rows: "6" }}
                  onChange={this.updateFormValues}
                />
              </Col>
            </Row>
            <Row isCentered>
              <Col isCentered={true}>
                <label>{this.context.Dictionary?.UploadPhoto}</label>
                <input
                  type="file"
                  class="form-control-file"
                  accept="image/*"
                  ref={this.imageRef}
                  onChange={(e) => {
                    this.setState({ image: e.target.files[0] });
                  }}
                />
              </Col>
              <Col
                isCentered={true}
                responsiveSystem={{ sm: 3, md: 3, lg: 3, xl: 3 }}
              >
                <BasicCommonButton
                  text={this.context.Dictionary?.Send}
                  handleClick={this.sendPost}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
