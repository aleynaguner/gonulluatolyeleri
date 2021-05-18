import React from "react";
import BaseComponent from "../utility/BaseComponent";
import { Container, Row, Col } from "../components/Grid";
import Loading from "../components/Loading";
import BlogPostCreator from "./components/BlogPostCreator";
import BlogPostCard from "./components/BlogPostCard";
import componentHelper from "../utility/componentHelper";

export class Blog extends BaseComponent {
  constructor(props) {
    super(props);
    this.loadBlogPosts = componentHelper.createListDataLoader({
      componentReferrer: this,
      listStatePropName: "blogPosts",
      getDataEndpointKey: "getAllBlogPosts",
    });
    this.state = {
      loading: true,
      blogPosts: [],
    };
  }

  async componentDidMount() {
    await this.loadBlogPosts();
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <Container>
        <Row>
          <Col isCentered={true} margins={{ b: 5 }}>
            <h2 style={{ textAlign: "center" }}>
              {this.context.Dictionary?.Blogs}
            </h2>
          </Col>
        </Row>
        <Row margins={{ l: 3, r: 3, b: 5 }}>
          {this.state.blogPosts.map((post) => (
            <BlogPostCard
              postInfo={post}
              responsiveSystem={{ sm: 12, md: 12, lg: 6 }}
              // margins={{ l: 2, r: 2, b: 3 }}
            />
          ))}
        </Row>
        <Row>
          <Col>
            <BlogPostCreator />
          </Col>
        </Row>
      </Container>
    );
  }
}
