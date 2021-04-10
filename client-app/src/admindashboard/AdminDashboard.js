import React from "react";
import { Sidebar } from "./components/Sidebar";
import { Container } from "../components/Grid";
import { BlogPostConfirmation } from "./components/BlogPostConfirmation";
import { AdminUserManagement } from "./components/AdminUserManagement";
import Login from "../home/components/Login";
import BaseComponent from "../utility/BaseComponent";
import { hasDefaultValue } from "../utility/Utils";
import { ConfigureAppAsPromise } from "../utility/AppConfig";

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

    sessionStorage.setItem(authTokenKeyName, JSON.stringify(userToken));

    this.setState({ loggedIn: true }, () => {
      ConfigureAppAsPromise({
        ClientToken: userToken,
      }).then((configuration) => this.context.SetAppConfig(configuration));
    });
  };

  getToken = () => {
    const userToken = JSON.parse(sessionStorage.getItem(authTokenKeyName));
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