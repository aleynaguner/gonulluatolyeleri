import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid";
import BlogPostCreator from "./components/BlogPostCreator";

export class Blog extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <BlogPostCreator />
          </Col>
        </Row>
      </Container>
    );
  }
}
