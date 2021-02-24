import React, { Component } from "react";
import { Modal } from "../../components/Modal";

export class BlogPostConfirmation extends Component {
  render() {
    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>markotto@gmail.com</td>
            <td>
              <button
                type="button"
                class="btn btn-dark"
                data-toggle="modal"
                data-target=".bd-example-modal-lg"
              >
                Read
              </button>
              <Modal
                heading="Heading"
                content="Burayada yazı gelcek işte kenks !"
              />
            </td>
            <td>
              <button
                type="button"
                class="btn btn-danger"
                style={{ marginRight: "0.5em" }}
              >
                Reject
              </button>
              <button type="button" class="btn btn-success">
                Approve
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
