import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class BlogPostDetailContent extends Component {
  constructor(props) {
    super(props);
    console.log("hi from BlogPostDetailContent", this.props)
    this.detailInfo = this.props.location.state;
  }

  render() {
    return <div>ji</div>;
  }
}

const BlogPostDetail = withRouter((props) => (
    <BlogPostDetailContent {...props} />
  ));
  
  export default BlogPostDetail;