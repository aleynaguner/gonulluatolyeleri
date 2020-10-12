import React, { Component } from "react";
import "./style/contactForm.css";

var formValidator = require("../utility-modules/formValidator");

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
    };
  }

  updateFormValues = (event) => {
    event.persist();
    this.setState((state) => {
      state.formData[event.target?.name] = event.target?.value;
      return state;
    });
  };

  handleSubmit = () => {
    debugger;
    let validationResult = formValidator.formValidator(this.state.formData);
  };

  render() {
    return (
      <form method="post" className="m-5 mx-auto">
        <div class="row">
          <div className="col-md-2"></div>
          <div class="col-md-4">
            <div class="form-group">
              <label className="mb-0 small">Ad - Soyad</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.updateFormValues}
                placeholder="Adınız"
              />
            </div>
            <div class="form-group">
              <label className="mb-0 small">E-mail</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.updateFormValues}
                placeholder="E-mail adresiniz"
              />
            </div>
            <div class="form-group">
              <label className="mb-0 small">Konu</label>
              <input
                className="form-control"
                type="text"
                name="topic"
                onChange={this.updateFormValues}
                placeholder="Konu"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label className="mb-0 small">Mesaj</label>
              <textarea
                id="messageTextArea"
                class="form-control"
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
                class="btn text-white float-right"
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
