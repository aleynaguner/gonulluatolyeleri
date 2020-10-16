import React, { Component } from "react";
import "./style/contactForm.css";

var formValidator = require("../utility-modules/formValidator");

const errorMessages = {
  REQUIRED_VALUE_FOR_NAME: "Ad alanı boş bırakılamaz !",
  REQUIRED_VALUE_FOR_EMAIL: "Email alanı boş bırakılamaz !",
  REQUIRED_VALUE_FOR_TOPIC: "Konu alanı boş bırakılamaz !",
  REQUIRED_VALUE_FOR_MESSAGE: "Mesaj alanı boş bırakılamaz !",
  REQUIRED_FORMAT_FOR_EMAIL: "Email formatında yazınız. 'example@example.com'",
};

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

  render() {
    return (
      <form method="post" className="m-5 mx-auto">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="mb-0 small">
                Adınız
                {/* Error Message */}
                <span
                  className="badge badge-danger"
                  style={{
                    display: `${
                      this.state.inputsWithError.hasOwnProperty("name")
                        ? "block"
                        : "none"
                    }`,
                  }}
                >
                  {this.state.inputsWithError.hasOwnProperty("name")
                    ? errorMessages[this.state.inputsWithError.name[0]]
                    : ""}
                </span>
                {/* Error Message */}
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.updateFormValues}
                placeholder="Adınız"
              />
            </div>
            <div className="form-group">
              <label className="mb-0 small">
                E-mail
                {/* Error Message */}
                <span
                  className="badge badge-danger"
                  style={{
                    display: `${
                      this.state.inputsWithError.hasOwnProperty("email")
                        ? "block"
                        : "none"
                    }`,
                  }}
                >
                  {this.state.inputsWithError.hasOwnProperty("email")
                    ? errorMessages[this.state.inputsWithError.email[0]]
                    : ""}
                </span>
                {/* Error Message */}
              </label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.updateFormValues}
                placeholder="E-mail adresiniz"
              />
            </div>
            <div className="form-group">
              <label className="mb-0 small">
                Konu
                {/* Error Message */}
                <span
                  className="badge badge-danger"
                  style={{
                    display: `${
                      this.state.inputsWithError.hasOwnProperty("topic")
                        ? "block"
                        : "none"
                    }`,
                  }}
                >
                  {this.state.inputsWithError.hasOwnProperty("topic")
                    ? errorMessages[this.state.inputsWithError.topic[0]]
                    : ""}
                </span>
                {/* Error Message */}
              </label>
              <input
                className="form-control"
                type="text"
                name="topic"
                onChange={this.updateFormValues}
                placeholder="Konu"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="mb-0 small">
                Mesaj
                {/* Error Message */}
                <span
                  className="badge badge-danger"
                  style={{
                    display: `${
                      this.state.inputsWithError.hasOwnProperty("message")
                        ? "block"
                        : "none"
                    }`,
                  }}
                >
                  {this.state.inputsWithError.hasOwnProperty("message")
                    ? errorMessages[this.state.inputsWithError.message[0]]
                    : ""}
                </span>
                {/* Error Message */}
              </label>
              <textarea
                id="messageTextArea"
                className="form-control"
                rows="5"
                name="message"
                value={this.state.message}
                onChange={this.updateFormValues}
                placeholder="Mesajınız"
              ></textarea>
            </div>
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
