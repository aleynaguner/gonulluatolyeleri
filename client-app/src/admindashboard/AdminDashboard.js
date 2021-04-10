import React from "react";
import { Sidebar } from "./components/Sidebar";
import { Container } from "../components/Grid";
import { BlogPostConfirmation } from "./components/BlogPostConfirmation";
import { AdminUserManagement } from "./components/AdminUserManagement";
import Login from "../home/components/Login";
import BaseComponent from "../utility/BaseComponent";
import { hasDefaultValue } from "../utility/Utils";
import { GetAppConfigurationAsPromise } from "../utility/AppConfig";
import config from "../config.json";

const authTokenKeyName = "authtoken";

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
    const userToken = JSON.parse(
      sessionStorage.getItem(config.ATUH_TOKEN_KEY_NAME)
    );
    return userToken;
  };

  render() {
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
                this.setState({ currentAdminContent: <AdminUserManagement /> }),
            },
          ]}
        >
          <Container>{this.state.currentAdminContent}</Container>
        </Sidebar>
      );
    }
  }
}
