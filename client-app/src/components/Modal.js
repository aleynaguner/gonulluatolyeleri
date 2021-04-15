import React, { Component } from "react";
import { Row, Col } from "./Grid";
import { hasDefaultValue } from "../utility/Utils";

export class Modal extends Component {
  render() {
    return (
      <div
        className="modal fade bd-example-modal-lg"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {!hasDefaultValue(this.props.imgHeaderSrc) ? (
              <Row isCentered={true} margins={{ t: 5 }}>
                <Col isCentered={true}>
                  <img
                    src={this.props.imgHeaderSrc}
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      width: "50%",
                    }}
                  ></img>
                </Col>
              </Row>
            ) : null}
            <div class="modal-header">
              <h4 class="modal-title">{this.props.heading}</h4>
            </div>

            <div class="modal-body">{this.props.content}</div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
