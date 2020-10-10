import React, { Component } from "react";

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
      <form>
        <label>Adınız</label>
        <input
          className="form-control"
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.updateFormValues}
        />
        <label>Mail adresiniz</label>
        <input
          className="form-control"
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.updateFormValues}
        />
        <label>Konu</label>
        <input
          className="form-control"
          type="text"
          name="topic"
          onChange={this.updateFormValues}
        />
        <label>Mesajınız</label>
        <textarea
          class="form-control"
          rows="5"
          name="message"
          value={this.state.message}
          onChange={this.updateFormValues}
        ></textarea>
        <button
          type="submit"
          style={{ backgroundColor: "#397A9A" }}
          class="btn float-right btn-primary mt-3"
          onClick={this.handleSubmit}
        >
          Gönder
        </button>
      </form>
    );
  }
}
