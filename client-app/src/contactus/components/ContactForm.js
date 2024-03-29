import React from "react";
import { FormItem } from "./FormItem";
import "../style/contactForm.css";
import Loading from "../../components/Loading";
import { Container, Row, Col } from "../../components/Grid";
import BaseComponent from "../../utility/BaseComponent";
import { BasicCommonButton } from "../../components/BasicCommonButton";

export class ContactForm extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        name: "",
        email: "",
        topic: "",
        message: "",
      },
      inputsWithError: {},
      loading: false,
      sendEmailSuccessful: false,
      showSendEmailMessage: false,
    };

    this.formInputs = [
      {
        name: "name",
        tag: "Adınız",
        itemType: "input",
      },
      {
        name: "email",
        tag: "E-mail",
        itemType: "input",
      },
      {
        name: "topic",
        tag: "Konu",
        itemType: "input",
      },
    ];
  }

  updateFormValues = (event) => {
    event.persist();
    this.setState((state) => {
      state.formData[event.target?.name] = event.target?.value;

      return state;
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    let validationResult = this.context.Services.Validator.Validate({
      schema: this.context.Services.Validator.Schemas.Contact,
      data: this.state.formData,
    });

    this.setState({
      inputsWithError: validationResult.errors,
    });

    if (validationResult.isSuccess) {
      let response = await this.sendEmail();

      this.executeAfterSendEmail(response.isSuccess);
    }
  };

  sendEmail = async () => {
    this.setState({
      loading: true,
    });

    let response = await this.context.Services.RequestSender.SendRequest(
      "post",
      "api/sendEmail",
      this.state.formData
    );

    this.setState({
      loading: false,
    });

    return response;
  };

  executeAfterSendEmail = (isSuccess) => {
    if (isSuccess) {
      this.executeAfterSuccessfulSendEmail();
    } else {
      this.executeAfterUnsuccessfulSendEmail();
    }
  };

  executeAfterSuccessfulSendEmail = () => {
    this.setState({
      formData: {
        name: "",
        email: "",
        topic: "",
        message: "",
      },
      sendEmailSuccessful: true,
      showSendEmailMessage: true,
    });

    setTimeout(
      () =>
        this.setState({
          showSendEmailMessage: false,
        }),
      1500
    );
  };

  executeAfterUnsuccessfulSendEmail = () => {
    this.setState({
      sendEmailSuccessful: false,
      showSendEmailMessage: true,
    });

    setTimeout(
      () =>
        this.setState({
          showSendEmailMessage: false,
        }),
      1500
    );
  };

  createSendEmailResponseMessage = (isSuccess) => {
    let message = isSuccess
      ? "Mesajınız gönderildi !"
      : "Bir hata oluştu... Daha sonra deneyin !";
    let className = `alert alert-${isSuccess ? "success" : "alert"}`;

    return (
      <Row isCentered={true}>
        <div className={className} role="alert">
          {" "}
          {message}{" "}
        </div>{" "}
      </Row>
    );
  };

  valHasError = (val) => this.state.inputsWithError.hasOwnProperty(val);

  getErrorCode = (val) =>
    this.valHasError(val) ? this.state.inputsWithError[val][0] : null;

  render() {
    return (
      <React.Fragment>
        <Container>
          {" "}
          {this.state.loading && (
            <Col>
              <Loading />
            </Col>
          )}{" "}
          {!this.state.loading &&
            this.state.showSendEmailMessage &&
            this.createSendEmailResponseMessage(
              this.state.sendEmailSuccessful
            )}{" "}
          <fieldset disabled={this.state.loading}>
            <form>
              <div className="row justify-content-center m-2">
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  {" "}
                  {this.formInputs.map((item, i) => (
                    <FormItem
                      key={i}
                      name={item.name}
                      itemType={item.itemType}
                      tag={item.tag}
                      erroneous={this.valHasError(item.name)}
                      errorCode={this.getErrorCode(item.name)}
                      value={this.state.formData[item.name]}
                      onChange={this.updateFormValues}
                    />
                  ))}{" "}
                </div>{" "}
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <FormItem
                    name="message"
                    itemType="textarea"
                    tag={"Mesajınız"}
                    erroneous={this.valHasError("message")}
                    errorCode={this.getErrorCode("message")}
                    value={this.state.formData["message"]}
                    onChange={this.updateFormValues}
                    customAttributes={{
                      id: "messageTextArea",
                      rows: "5",
                    }}
                  />{" "}
                  <div
                    style={{
                      display: "flex",
                      width: "25%",
                      float: "right",
                      height: "15%",
                    }}
                  >
                    <BasicCommonButton
                      text={this.context.Dictionary?.Send}
                      handleClick={this.handleSubmit}
                    />{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </form>{" "}
          </fieldset>{" "}
        </Container>{" "}
      </React.Fragment>
    );
  }
}
