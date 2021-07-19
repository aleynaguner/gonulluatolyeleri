import React from "react";
import { Sidebar } from "./components/Sidebar";
import { Container } from "../components/Grid";
import { BlogPostConfirmation } from "./components/BlogPostConfirmation";
import { AdminUserManagement } from "./components/AdminUserManagement";
import WorkShopManagement from "./components/WorkShopManagement";
import Login from "../home/components/Login";
import BaseComponent from "../utility/BaseComponent";
import { hasDefaultValue } from "../utility/Utils";
import { GetAppConfigurationAsPromise } from "../utility/AppConfig";
import config from "../config.json";

const authTokenKeyName = "authtoken";
const COMPUTER_SCREEN_MIN_WIDTH = 1224;

export default class AdminDashboard extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentAdminContent: undefined,
    };
  }

  setToken = (userToken) => {
    if (hasDefaultValue(userToken)) return;

    sessionStorage.setItem(
      config.ATUH_TOKEN_KEY_NAME,
      JSON.stringify(userToken)
    );

    this.setState({ loggedIn: true }, () => {
      GetAppConfigurationAsPromise({
        ClientToken: userToken,
      }).then((configuration) => {
        configuration.AuthorityInfo = {
          ...configuration.AuthorityInfo,
          Token: userToken,
        };
        this.context.SetAppConfig(configuration);
      });
    });
  };

  getToken = () => {
    return JSON.parse(sessionStorage.getItem(config.ATUH_TOKEN_KEY_NAME));
  };

  render() {
    let clienIsNotPc = window.innerWidth < COMPUTER_SCREEN_MIN_WIDTH;

    if (clienIsNotPc) {
      return (
        <div className="d-flex justify-content-center mt-5">
          <h6>
            {this.context?.Dictionary["ADMIN_PANEL_PC_CONSTRAINT_MESSAGE"]}
          </h6>
        </div>
      );
    } else {
      let userToken = this.getToken();

      if (hasDefaultValue(userToken)) {
        return <Login setToken={this.setToken} />;
      } else {
        return (
          <Sidebar
            heading="Admin Dashboard"
            links={[
              {
                text: "Blog Post Approval",
                onClick: () =>
                  this.setState({
                    currentAdminContent: <BlogPostConfirmation />,
                  }),
              },
              {
                text: "Admin User Management",
                onClick: () =>
                  this.setState({
                    currentAdminContent: <AdminUserManagement />,
                  }),
              },
              {
                text: "Work Shop Management",
                onClick: () =>
                  this.setState({
                    currentAdminContent: <WorkShopManagement />,
                  }),
              },
            ]}
          >
            <Container>{this.state.currentAdminContent}</Container>
          </Sidebar>
        );
      }
    }
  }
}
