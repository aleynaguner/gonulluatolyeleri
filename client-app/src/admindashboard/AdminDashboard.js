import React, { Component } from "react";
import { Sidebar } from "./components/Sidebar";
import { Container } from "../components/Grid";

import { BlogPostConfirmation } from "./components/BlogPostConfirmation";
import { AdminUserManagement } from "./components/AdminUserManagement";

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAdminContent: undefined,
    };
  }
  render() {
    return (
      <Sidebar
        heading="Admin Dashboard"
        links={[
          {
            text: "Blog Post Approval",
            onClick: () =>
              this.setState({ currentAdminContent: <BlogPostConfirmation /> }),
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
