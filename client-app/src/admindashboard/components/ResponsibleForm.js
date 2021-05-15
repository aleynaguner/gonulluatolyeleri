import React, { Component } from "react";
import { Container, Row, Col } from "../../components/Grid";
import "../style/workshopcreator.css";

export default class ResponsibleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      role: "",
    };
  }
  updateFormValues = (e) => {
    let updatedFormValueId = e.target.id.toString();
    let updateFormValue = e.target.value.toString();
    this.setState((state) => {
      return {
        ...state,
        [updatedFormValueId]: updateFormValue,
      };
    });
  };
  addNewResponsible = (e) => {
    this.props.addNewResponsible({ id: new Date().getTime(), ...this.state });
    this.setState({ name: "", email: "", role: "" });
  };
  render() {
    return (
      <Col>
        <Container>
          <Row margins={{ b: 3 }}>
            <label className="mb-0 small">Name</label>
            <input
              id="name"
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={this.updateFormValues}
            />
          </Row>
          <Row margins={{ b: 3 }}>
            <label className="mb-0 small">Email</label>
            <input
              id="email"
              className="form-control"
              value={this.state.email}
              type="text"
              onChange={this.updateFormValues}
            />
          </Row>
          <Row>
            <Col>
              <label className="mb-0 small" style={{ marginRight: "1em" }}>
                Role
              </label>
              <select
                id="role"
                class="form-select"
                aria-label="Default select example"
              >
                <option value="1">Organizer</option>
                <option value="2">Speaker</option>
              </select>
            </Col>
            <div className="float-end">
              <button className="btn btn-dark" onClick={this.addNewResponsible}>
                Save
              </button>
            </div>
          </Row>
        </Container>
      </Col>
    );
  }
}
