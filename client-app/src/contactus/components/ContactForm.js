import React, { Component } from "react";
import { FormItem } from "./FormItem";
import "../style/contactForm.css";
import { HttpRequestSender } from "../../utility-modules/HttpRequestSender";
import config from "../../config.json";

const formValidator = require("../../utility-modules/formValidator");

export class ContactForm extends Component {
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
    };
  }

  formInputs = [
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

  updateFormValues = (event) => {
    event.persist();
    this.setState((state) => {
      state.formData[event.target?.name] = event.target?.value;

      return state;
    });
  };

  executeAfterSuccessfulSendEmail = () => {
    alert("is-success");
    this.setState({
      formData: { name: "", email: "", topic: "", message: "" },
    });
  };

  executeAfterUnsuccessfulSendEmail = () => {
    alert("is-failed");
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    let validationResult = formValidator.validate(this.state.formData);

    this.setState({
      ...this.state,
      inputsWithError: validationResult.errors,
    });

    if (validationResult.isSuccess) {
      const requestSender = new HttpRequestSender(config.BASE_URL);
      let response = await requestSender.SendRequest(
        "post",
        "api/sendEmail",
        this.state.formData
      );
      console.log(response);
      if (response.isSuccess) {
        this.executeAfterSuccessfulSendEmail();
      } else {
        this.executeAfterUnsuccessfulSendEmail();
      }
    }
  };

  valHasError = (val) => this.state.inputsWithError.hasOwnProperty(val);

  getErrorCode = (val) =>
    this.valHasError(val) ? this.state.inputsWithError[val][0] : null;

  render() {
    return (
      <form method="post" className="m-5 mx-auto">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-4">
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
            ))}
          </div>
          <div className="col-md-4">
            <FormItem
              name="message"
              itemType="textarea"
              tag={"Mesajınız"}
              erroneous={this.valHasError("message")}
              errorCode={this.getErrorCode("message")}
              value={this.state.formData["message"]}
              onChange={this.updateFormValues}
              customAttributes={{ id: "messageTextArea", rows: "5" }}
            />
            <div className="mt-3">
              <button
                id="sendBtn"
                className="btn text-white float-right"
                type="submit"
                onClick={this.handleSubmit}
              >
                Gönder
              </button>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </form>
    );
  }
}
