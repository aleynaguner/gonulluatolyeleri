import React, { Component } from "react";
import { Sidebar } from "./components/Sidebar";
import { Container } from "../components/Grid";

import { BlogPostConfirmation } from "./components/BlogPostConfirmation";
import { AdminUserManagement } from "./components/AdminUserManagement";
import Login from "../home/components/Login";

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAdminContent: undefined,
    };
  }

  setToken = (userToken) => {
    sessionStorage.setItem("authtoken", JSON.stringify(userToken));
  };

  getToken = () => {
    const authToken = sessionStorage.getItem("authtoken");
    const userToken = JSON.parse(authToken);
    return userToken;
  };

  render() {
    let token = this.getToken();

    if (token === null || token === undefined) {
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
