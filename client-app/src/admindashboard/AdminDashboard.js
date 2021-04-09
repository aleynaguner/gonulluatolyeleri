import React from "react";
import { Sidebar } from "./components/Sidebar";
import { Container } from "../components/Grid";
import { BlogPostConfirmation } from "./components/BlogPostConfirmation";
import { AdminUserManagement } from "./components/AdminUserManagement";
import Login from "../home/components/Login";
import BaseComponent from "../utility/BaseComponent";
import { hasDefaultValue } from "../utility/Utils";
import { ConfigureAppAsPromise } from "../utility/AppConfig";

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

    sessionStorage.setItem("authtoken", JSON.stringify(userToken));

    this.setState({ loggedIn: true }, () => {
      ConfigureAppAsPromise({
        ClientToken: userToken,
      }).then((configuration) => this.context.SetAppConfig(configuration));
    });
  };

  getToken = () => {
    const authToken = sessionStorage.getItem("authtoken");
    const userToken = JSON.parse(authToken);
    return userToken;
  };

  render() {
    let token = this.getToken();

    if (token === null || token === undefined) {
      return (
        <Login
          setToken={this.setToken}
          setContext={(ctx) => {
            this.context = ctx;
            console.log(this.context);
          }}
        />
      );
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
