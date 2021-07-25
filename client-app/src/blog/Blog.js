import React from "react";
import BaseComponent from "../utility/BaseComponent";
import Loading from "../components/Loading";
import BlogPostCreator from "./components/BlogPostCreator";
import BlogPostCard from "./components/BlogPostCard";
import componentHelper from "../utility/componentHelper";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class BlogContent extends BaseComponent {
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

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  goToDetail = (postInfo) => {
    this.props.history.push({
      pathname: `/blog/${postInfo._id}`,
      state: postInfo,
    });
  };

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
            <BlogPostCard postInfo={post} goToDetail={this.goToDetail} />
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

const Blog = withRouter((props) => <BlogContent {...props} />);

export default Blog;
