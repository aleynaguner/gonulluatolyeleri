import React from "react";
import BaseComponent from "../../utility/BaseComponent";
import { Container, Row, Col } from "../../components/Grid";
import { FormItem } from "../../contactus/components/FormItem";
import { BasicCommonButton } from "../../components/BasicCommonButton";
import { Modal } from "../../components/Modal";
import "../style/workshopcreator.css";
import { Constants } from "../../utility/Utils";
import config from "../../config.json";
import ResponsibleForm from "./ResponsibleForm";
import componentHelper from "../../utility/componentHelper";

export const NEW_WORKSHOP_ID = "0";
export default class WorkShopCreator extends BaseComponent {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.updateFormValues =
      componentHelper.FormManagement.createFromValuesUpdater(this);
    this.updateFormDataByErroneousState =
      componentHelper.FormManagement.createFormDataUpdaterByErroneousState(
        this
      );
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
        erroneous: false,
        errorCode: "",
      },
      applicationDeadline: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
      location: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
      responsibles: [],
      image: null,
      selectedResponsibleId: 0,
    };
  }

  setStateByToBeUpdatedWorkshopValues = (exceptions) => {
    this.setState((state) => {
      let newValues = {};
      for (const fieldName in state) {
        if (exceptions.includes(fieldName)) continue;
        state[fieldName]["value"] = this.props.selectedWorkshop[fieldName];
        state[fieldName]["erroneous"] = false;
        state[fieldName]["errorCode"] = "";
        newValues[fieldName] = state[fieldName];
      }
      return { ...state, newValues };
    });
  };

  clearState = () => {
    this.imageRef.current.value = null;
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
      responsibles: [],
      image: null,
      selectedResponsibleId: 0,
    });
  };

  createWorkShop = (e) => {
    e.preventDefault();
    let workshopDataValidationResult = this.validateWorkshopData();
    if (!workshopDataValidationResult.isSuccess) return;
    try {
      this.sendCreateWorkShopPostRequest(async (res) => {
        if (!res.isSuccess) alert("createWorkShopPostRequest unsuccessful");
        else {
          alert("createWorkShopPostRequest successful");
          this.clearState();
        }
      });
    } catch (error) {
      alert(error.message);
      this.clearState();
    }
  };

  validateWorkshopData = () => {
    let validationResult = this.context.Services.Validator.Validate({
      schema: this.context.Services.Validator.Schemas.Workshop,
      data: {
        name: this.state.name.value,
        category: this.state.category.value,
        location: this.state.location.value,
        applicationDeadline: this.state.applicationDeadline.value,
        workshopDate: this.state.workshopDate.value,
        content: this.state.content.value,
      },
    });
    this.updateFormDataByErroneousState(validationResult.errors, [
      "responsibles",
      "image",
      "selectedResponsibleId",
    ]);
    return validationResult;
  };

  sendCreateWorkShopPostRequest = (callback) => {
    const formData = this.getCreateWorkShopPostRequestFormData();
    this.context.Services.RequestSender.SendRequest(
      Constants.HttpMethods.POST,
      config.EndPoints["createWorkShop"],
      callback,
      formData,
      null,
      { "Content-Type": "multipart/form-data" }
    );
  };

  getCreateWorkShopPostRequestFormData = () => {
    const formData = new FormData();
    if (this.state.image !== null)
      formData.append("image", this.state.image, this.state.image.name);
    formData.append("name", this.state.name.value);
    formData.append("content", this.state.content.value);
    formData.append("category", this.state.category.value);
    formData.append(
      "applicationDeadline",
      this.state.applicationDeadline.value
    );
    formData.append("workshopDate", this.state.workshopDate.value);
    formData.append("location", this.state.location.value);
    formData.append("responsibles", JSON.stringify(this.state.responsibles));
    return formData;
  };

  componentDidUpdate(prevProps) {
    let selectedWorkshopChanged =
      prevProps.selectedWorkshop._id !== this.props.selectedWorkshop._id;
    if (!selectedWorkshopChanged) return;

    let creationProcessStarting =
      this.props.selectedWorkshop._id === NEW_WORKSHOP_ID;
    if (creationProcessStarting) this.clearState();
    else
      this.setStateByToBeUpdatedWorkshopValues([
        "image",
        "selectedResponsibleId",
      ]);
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
                  style={
                    this.state.workshopDate.erroneous
                      ? { width: "100%", borderBlockColor: "red" }
                      : { width: "100%" }
                  }
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
                  style={
                    this.state.applicationDeadline.erroneous
                      ? { width: "100%", borderBlockColor: "red" }
                      : { width: "100%" }
                  }
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
                  onChange={(e) => {
                    e.persist();
                    this.setState({
                      selectedResponsibleId: Number(e.target.value),
                    });
                  }}
                >
                  {this.state.responsibles.map((responsible) => {
                    return (
                      <option value={responsible.id}>{responsible.name}</option>
                    );
                  })}
                </select>
                <Row isCentered margins={{ t: 2 }}>
                  <Col>
                    <button
                      className="btn btn-danger float-right"
                      onClick={(e) => {
                        this.setState((state) => ({
                          ...state,
                          responsibles: state.responsibles.filter(
                            (responsible) =>
                              responsible.id !== state.selectedResponsibleId
                          ),
                        }));
                      }}
                    >
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
                      optionalButton={{ name: "Add", onClick: () => {} }}
                      content={
                        <ResponsibleForm
                          addNewResponsible={(responsible) => {
                            this.setState((state) => ({
                              responsibles: [
                                ...state.responsibles,
                                responsible,
                              ],
                            }));
                          }}
                        />
                      }
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
                  handleClick={this.createWorkShop}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
