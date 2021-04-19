import React from "react";
import BaseComponent from "../../utility/BaseComponent";
import { Container, Row, Col } from "../../components/Grid";
import { FormItem } from "../../contactus/components/FormItem";
import { BasicCommonButton } from "../../components/BasicCommonButton";
import { Constants } from "../../utility/Utils";
import config from "../../config.json";

export default class BlogPostCreator extends BaseComponent {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();

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

  sendPost = (e) => {
    e.preventDefault();

    let postInfoValidationResult = this.validatePostInfo();
    if (!postInfoValidationResult.isSuccess) return;

    try {
      this.sendCreateBlogPostRequest(async (res) => {
        // will be changed
        if (!res.isSuccess) alert("createBlogPost unsuccessful");
        else {
          alert("createBlogPost successful");
          this.clearBlogPostData();
        }
      });
    } catch (error) {
      alert(error.message);
      this.clearBlogPostData();
    }
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
        this.setState({
          [data]: {
            value: "",
            erroneous: true,
            errorCode: erroneousData[data][0],
          },
        });
      } else {
        this.setState((state) => {
          return {
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

  sendCreateBlogPostRequest = (callback) => {
    const formData = this.getCreateBlogPostRequestFormData();

    this.context.Services.RequestSender.SendRequest(
      Constants.HttpMethods.POST,
      config.EndPoints["createBlogPost"],
      callback,
      formData,
      null,
      { "Content-Type": "multipart/form-data" }
    );
  };

  getCreateBlogPostRequestFormData = () => {
    const formData = new FormData();
    if (this.state.image !== null)
      formData.append("image", this.state.image, this.state.image.name);

    let senderInfo = JSON.stringify({
      firstName: this.state.firstName.value,
      lastName: this.state.lastName.value,
      email: this.state.email.value,
    });
    formData.append("senderInfo", senderInfo);
    formData.append("header", this.state.header.value);
    formData.append("content", this.state.content.value);

    return formData;
  };

  clearBlogPostData = () => {
    this.imageRef.current.value = null;

    this.setState({
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
    });
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
                  value={this.state.firstName.value}
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
                  value={this.state.lastName.value}
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
                  value={this.state.email.value}
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
                  value={this.state.header.value}
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
            <Row isCentered={true}>
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
                responsiveSystem={{ sm: 3, md: 3, lg: 2, xl: 2 }}
              >
                <BasicCommonButton
                  text={this.context.Dictionary?.Send}
                  customStyle={{ height: "3em" }}
                  handleClick={this.sendPost}
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
