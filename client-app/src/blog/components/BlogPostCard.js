import React from "react";
import BaseComponent from "../../utility/BaseComponent";
import ReadMoreButton from "./ReadMoreButton";
import "../style/blogpostcard.css";
import { withRouter } from "react-router-dom";

const prepareContent = (content) => {
  if (content.length >= 300) {
    return `${content?.substring(0, 300)}...`;
  } else {
    content += `...${" ".repeat(300 - content.length)}`;
    return content;
  }
};

class BlogPostCardContent extends BaseComponent {
  goToDetail = () => {
    console.log("BlogPostCardContent")
    this.props.history.push({
      pathname: `/blog/${this.props.postInfo._id}`,
      state: this.props.postInfo,
    });
  };

  render() {
    return (
      <div className="col-6 mt-3">
        <div id="card-container" className="container">
          <div className="row">
            <div className="col">
              <h3>{this.props.postInfo.header}</h3>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p style={{ wordWrap: "break-word", fontSize: "100%" }}>
                {prepareContent(this.props.postInfo.content)}
              </p>
            </div>
          </div>
          <div className="row">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                marginLeft: "0.8em",
              }}
            >
              <ReadMoreButton
                customStyle={{ marginRight: "1.5em" }}
                handleClick={this.goToDetail}
              />
              <strong style={{ whiteSpace: "nowrap" }}>No Comment</strong>
            </div>
            <div className="mx-auto"></div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <a href="#" className="fa fa-lg fa-twitter"></a>
              <a href="#" className="fa fa-lg fa-instagram"></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Blog = withRouter((props) => <BlogPostCardContent {...props} />);

export default Blog;