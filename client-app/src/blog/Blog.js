import React from "react";
import BaseComponent from "../utility/BaseComponent";
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
      <div className="container-fluid">
        <div className="row mt-3 mb-3">
          <div className="col">
            <h2 style={{ textAlign: "center" }}>
              {this.context.Dictionary?.Blogs}
            </h2>
          </div>
        </div>
        <div className="row">
          {this.state.blogPosts.map((post) => (
            <BlogPostCard postInfo={post} />
          ))}
        </div>
        <div className="row mt-5">
          <div className="col">
            <BlogPostCreator />
          </div>
        </div>
      </div>
    );
  }
}
