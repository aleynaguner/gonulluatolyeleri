import React, { Component } from "react";
import "../style/contactForm.css";
import { FormItem } from "./FormItem";

var formValidator = require("../../utility-modules/formValidator");

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

  updateFormValues = (event) => {
    event.persist();
    this.setState((state) => {
      state.formData[event.target?.name] = event.target?.value;

      return state;
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let validationResult = formValidator.validate(this.state.formData);

    if (validationResult.isSuccess) {
      // /api/sendEmail request
    } else {
      this.setState({
        ...this.state,
        inputsWithError: validationResult.errors,
      });
    }
  };

  valHasError = (val) => this.state.inputsWithError.hasOwnProperty(val);

  formInputs = [
    {
      tag: "Adınız",
      valName: "name",
      itemType: "input",
    },
    {
      tag: "E-mail",
      valName: "email",
      itemType: "input",
    },
    {
      tag: "Konu",
      valName: "topic",
      itemType: "input",
    },
  ];

  render() {
    return (
      <form method="post" className="m-5 mx-auto">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-4">
            {this.formInputs.map((item, i) => (
              <FormItem
                key={i}
                tag={item.tag}
                itemType={item.itemType}
                valName={item.valName}
                erroneous={this.valHasError(item.valName)}
                errorCode={
                  this.valHasError(item.valName)
                    ? this.state.inputsWithError[item.valName][0]
                    : null
                }
                value={this.state.formData[item.valName]}
                onChange={this.updateFormValues}
              />
            ))}
          </div>
          <div className="col-md-4">
            <FormItem
              tag={"Mesajınız"}
              itemType="textarea"
              valName="message"
              erroneous={this.valHasError("message")}
              errorCode={
                this.valHasError("message")
                  ? this.state.inputsWithError["message"][0]
                  : null
              }
              value={this.state.formData["message"]}
              onChange={this.updateFormValues}
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
