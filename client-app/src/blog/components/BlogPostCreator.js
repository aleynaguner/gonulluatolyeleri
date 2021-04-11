import React from "react";
import BaseComponent from "../../utility/BaseComponent";
import { Container, Row, Col } from "../../components/Grid";
import { FormItem } from "../../contactus/components/FormItem";
import { CommonButton } from "../../components/CommonButton";

export default class BlogPostCreator extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
      lastName: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
      email: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
      header: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
      content: {
        value: "",
        erroneous: false,
        errorCode: "",
      },
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

  sendPost = (e) => {
    e.preventDefault();

    let postInfoValidationResult = this.validatePostInfo();
  };

  validatePostInfo = () => {
    let validationResult = this.context.Services.FormValidator.Post.Validate({
      firstName: this.state.firstName.value,
      lastName: this.state.lastName.value,
      email: this.state.email.value,
      header: this.state.header.value,
      content: this.state.content.value,
    });

    this.setPostInfoAfterValidationByErroneousState(validationResult.errors);

    return validationResult;
  };

  setPostInfoAfterValidationByErroneousState = (erroneousData) => {
    for (const data in this.state) {
      let dataIsErroneous = erroneousData.hasOwnProperty(data);

      if (dataIsErroneous) {
        this.setState((state) => {
          return {
            ...state,
            [data]: {
              value: "",
              erroneous: true,
              errorCode: erroneousData[data][0],
            },
          };
        });
      } else {
        this.setState((state) => {
          return {
            ...state,
            [data]: {
              ...state[data],
              erroneous: false,
              errorCode: "",
            },
          };
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col responsiveSystem={{ sm: 1, md: 2, lg: 2, xl: 2 }} />
          <Col>
            <Row>
              <Col margins={{ t: 2, b: 2 }}>
                <h2 style={{ textAlign: "center" }}>
                  {this.context.Dictionary?.SendBlogPost}
                </h2>
              </Col>
            </Row>
            <Row>
              <Col responsiveSystem={{ sm: 12, md: 6 }}>
                <FormItem
                  itemType="input"
                  tag="First Name"
                  name="firstName"
                  erroneous={this.state.firstName.erroneous}
                  errorCode={
                    this.state.firstName.erroneous
                      ? this.state.firstName.errorCode
                      : null
                  }
                  onChange={this.updateFormValues}
                />
              </Col>
              <Col responsiveSystem={{ sm: 12, md: 6 }}>
                <FormItem
                  itemType="input"
                  tag="Last Name"
                  name="lastName"
                  erroneous={this.state.lastName.erroneous}
                  errorCode={
                    this.state.lastName.erroneous
                      ? this.state.lastName.errorCode
                      : null
                  }
                  onChange={this.updateFormValues}
                />
              </Col>
            </Row>
            <Row>
              <Col responsiveSystem={{ sm: 12, md: 6 }}>
                <FormItem
                  itemType="input"
                  tag="Email"
                  name="email"
                  erroneous={this.state.email.erroneous}
                  errorCode={
                    this.state.email.erroneous
                      ? this.state.email.errorCode
                      : null
                  }
                  onChange={this.updateFormValues}
                />
              </Col>
              <Col responsiveSystem={{ sm: 12, md: 6 }}>
                <FormItem
                  itemType="input"
                  tag="Header"
                  name="header"
                  erroneous={this.state.header.erroneous}
                  errorCode={
                    this.state.header.erroneous
                      ? this.state.header.errorCode
                      : null
                  }
                  onChange={this.updateFormValues}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem
                  itemType="textarea"
                  name="content"
                  tag={"Content"}
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
            <Row>
              <Col>
                <CommonButton
                  text={this.context.Dictionary?.Send}
                  customStyle={{ float: "right", width: "8%" }}
                  handleClick={this.sendPost}
                />
                <CommonButton
                  text={this.context.Dictionary?.UploadPhoto}
                  customStyle={{
                    float: "right",
                    width: "15%",
                    marginRight: "0.5em",
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col responsiveSystem={{ sm: 1, md: 2, lg: 2, xl: 2 }} />
        </Row>
      </Container>
    );
  }
}
