import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class BlogPostDetailContent extends Component {
  constructor(props) {
    super(props);
    this.detailInfo = this.props.location.state;
  }

  render() {
    return <h1>{this.detailInfo._id}</h1>;
  }
}

const BlogPostDetail = withRouter((props) => (
  <BlogPostDetailContent {...props} />
));

export default BlogPostDetail;