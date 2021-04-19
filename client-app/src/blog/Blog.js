import React from "react";
import BaseComponent from "../utility/BaseComponent";
import { Constants } from "../utility/Utils";
import config from "../config.json";
import { Container, Row, Col } from "../components/Grid";
import Loading from "../components/Loading";
import BlogPostCreator from "./components/BlogPostCreator";
import BlogPostCard from "./components/BlogPostCard";

export class Blog extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      blogPosts: [],
    };
  }

  loadBlogPosts = async () => {
    this.setState({
      loading: true,
    });

    let allBlogPosts = await this.getAllBlogPosts();

    this.setState(
      {
        loading: false,
        blogPosts: allBlogPosts,
      },
      () => console.log("blogsLoaded", this.state.blogPosts)
    );
  };

  getAllBlogPosts = async () => {
    let getAllBlogPostsResponse = await this.sendAllBlogPostsRequest();
    return getAllBlogPostsResponse.isSuccess
      ? getAllBlogPostsResponse.responseData
      : [];
  };

  sendAllBlogPostsRequest = async () => {
    let response = {
      isSuccess: false,
    };
    try {
      response = await this.context.Services.RequestSender.AwaitableSendRequest(
        Constants.HttpMethods.GET,
        config.EndPoints["getAllBlogPosts"]
      );
    } catch (error) {}

    return response;
  };

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
