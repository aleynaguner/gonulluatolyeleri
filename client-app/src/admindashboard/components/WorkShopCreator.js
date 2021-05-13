import React from "react";
import BaseComponent from "../../utility/BaseComponent";
import { Container, Row, Col } from "../../components/Grid";
import { FormItem } from "../../contactus/components/FormItem";
import { BasicCommonButton } from "../../components/BasicCommonButton";

export default class WorkShopCreator extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
      content: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
      image: null,
    };
  }

  updateFormValues = (e) => {
    let updatedFormValueName = e.target.name.toString();
    let updateFormValue = e.target.value.toString();
    this.setState((state) => {
      return {
        ...state,
        [updatedFormValueName]: {
          ...state[updatedFormValueName],
          value: updateFormValue,
        },
      };
    });
  };

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
                />
              </Col>
              <Col responsiveSystem={{ sm: 12, md: 6 }}></Col>
            </Row>
            <Row>
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
                  handleClick={this.sendPost}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
