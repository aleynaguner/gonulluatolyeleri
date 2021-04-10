import React from "react";
import BaseComponent from "../../utility/BaseComponent";
import { Container, Row, Col } from "../../components/Grid";
import Loading from "../../components/Loading";
import { Constants } from "../../utility/Utils";
import config from "../../config.json";
import { FormItem } from "../../contactus/components/FormItem";
import { CommonButton } from "../../components/CommonButton";

export class AdminUserManagement extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      adminsLoading: true,
      admins: [],
      selectedAdminId: "",
      newAdminInfo: {
        email: {
          value: "",
          erroneous: false,
          errorCode: "",
        },
        password: {
          value: "",
          erroneous: false,
          errorCode: "",
        },
      },
    };
  }

  loadAdmins = async () => {
    this.setState({ adminsLoading: true });
    let getAdminsResponse = await this.getAdmins();
    this.setState({ admins: getAdminsResponse.responseData }, () => {
      this.setState({ adminsLoading: false });
    });
  };

  getAdmins = async () => {
    let admins = await this.context.Services.RequestSender.AwaitableSendRequest(
      Constants.HttpMethods.GET,
      config.EndPoints["getAllUsers"]
    );
    return admins;
  };

  setSelectedAdmin = (e) => {
    this.setState({ selectedAdminId: e.target.id });
  };

  deleteUser = (e) => {
    let toBeDeletedUserId = this.state.selectedAdminId;
    if (alert("Are you sure ?")) {
      this.sendDeleteUserByIdRequest(toBeDeletedUserId);
    }
  };

  sendDeleteUserByIdRequest = (id) => {
    this.context.Services.RequestSender.SendRequest(
      Constants.HttpMethods.DELETE,
      `${config.EndPoints["deleteUserById"]}/${id}`,
      (res) => {
        // will be changed
        if (!res.isSuccess) alert("deleteUserById unsuccessful");
        else {
          if (alert("deleteUserById successful")) this.clearNewUserInfoData();
        }
      },
      this.context.AuthorityInfo.Token
    );
  };

  updateNewAdminInfo = (e) => {
    this.setState({
      newAdminInfo: {
        ...this.state.newAdminInfo,
        [e.target.name]: {
          ...this.state.newAdminInfo[e.target.name],
          value: e.target.value,
        },
      },
    });
  };

  createUserHandler = (e) => {
    e.preventDefault();

    let newAdminInfoValidation = this.validateNewAdminInfo();
    if (!newAdminInfoValidation.isSuccess) return;

    this.sendCreateUserRequest();
  };

  validateNewAdminInfo = () => {
    let validationResult = this.context.Services.FormValidator.Validate({
      email: this.state.newAdminInfo.email.value,
      password: this.state.newAdminInfo.password.value,
    });

    this.setNewAdminInfoAfterValidationByErroneousState(
      validationResult.errors
    );

    return validationResult;
  };

  setNewAdminInfoAfterValidationByErroneousState = (erroneousData) => {
    for (const adminInfoData in this.state.newAdminInfo) {
      let adminInfoDataIsErroneous = erroneousData.hasOwnProperty(
        adminInfoData
      );

      if (adminInfoDataIsErroneous) {
        this.setNewAdminInfoData(adminInfoData.toString(), {
          value: "",
          erroneous: true,
          errorCode: erroneousData[adminInfoData][0],
        });
      } else {
        this.setNewAdminInfoData(adminInfoData.toString(), {
          ...this.state.newAdminInfo[adminInfoData.toString()],
          erroneous: false,
          errorCode: "",
        });
      }
    }
  };

  setNewAdminInfoData = (dataKeyToSet, data) => {
    this.setState((state) => {
      return {
        newAdminInfo: {
          ...state.newAdminInfo,
          [dataKeyToSet]: data,
        },
      };
    });
  };

  sendCreateUserRequest = () => {
    this.context.Services.RequestSender.SendRequest(
      Constants.HttpMethods.POST,
      config.EndPoints["createUser"],
      (res) => {
        // will be changed
        if (!res.isSuccess) alert("createUser unsuccessful");
        else {
          if (alert("createUser successful")) this.clearNewUserInfoData();
        }
      },
      {
        email: this.state.newAdminInfo.email.value,
        password: this.state.newAdminInfo.password.value,
      },
      this.context.AuthorityInfo.Token
    );
  };

  clearNewUserInfoData = () => {
    this.setState((state) => {
      return {
        newAdminInfo: {
          email: {
            value: "",
            erroneous: false,
            errorCode: "",
          },
          password: {
            value: "",
            erroneous: false,
            errorCode: "",
          },
        },
      };
    });
  };

  async componentDidMount() {
    await this.loadAdmins();
  }

  render() {
    if (this.state.adminsLoading) {
      return <Loading />;
    }

    return (
      <Container>
        <Row>
          <Col>
            <Row>
              <Col margins={{ t: 2, b: 2 }}>
                <h2>Current Admins</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <div
                  className="list-group"
                  style={{
                    overflow: "scroll",
                    overflowX: "hidden",
                    height: "400px",
                  }}
                >
                  {this.state.admins.map((admin) => {
                    return (
                      <button
                        id={admin._id}
                        type="button"
                        className="list-group-item list-group-item-action"
                        style={{
                          backgroundColor: "#80C08C",
                          borderColor: "#F7F7F7",
                        }}
                        onClick={this.setSelectedAdmin}
                      >
                        {admin.email}
                      </button>
                    );
                  })}
                </div>
              </Col>
            </Row>
            <Row>
              <Col margins={{ t: 2, r: 2 }}>
                <button
                  className="btn btn-danger float-right"
                  style={{ width: "20%" }}
                  onClick={this.deleteUser}
                >
                  Remove
                </button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col margins={{ t: 2, b: 2 }}>
                <h2>Create Admin</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem
                  itemType="input"
                  tag="Email"
                  name="email"
                  value={this.state.newAdminInfo.email.value}
                  erroneous={this.state.newAdminInfo.email.erroneous}
                  errorCode={
                    this.state.newAdminInfo.email.erroneous
                      ? this.state.newAdminInfo.email.errorCode
                      : null
                  }
                  onChange={this.updateNewAdminInfo}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormItem
                  itemType="input"
                  tag="Password"
                  name="password"
                  value={this.state.newAdminInfo.password.value}
                  erroneous={this.state.newAdminInfo.password.erroneous}
                  errorCode={
                    this.state.newAdminInfo.password.erroneous
                      ? this.state.newAdminInfo.password.errorCode
                      : null
                  }
                  onChange={this.updateNewAdminInfo}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <CommonButton
                  text="Create"
                  customStyle={{
                    width: "10em",
                    height: "auto",
                    float: "right",
                  }}
                  handleClick={this.createUserHandler}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
