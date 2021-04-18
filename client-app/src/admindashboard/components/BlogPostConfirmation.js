import React from "react";
import { Modal } from "../../components/Modal";
import Loading from "../../components/Loading";
import BaseComponent from "../../utility/BaseComponent";
import { Constants } from "../../utility/Utils";
import config from "../../config.json";

export class BlogPostConfirmation extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      posts: [],
    };
  }

  getAllAwaitingApproval = async () => {
    let getAllAwaitingApprovalResponse = await this.context.Services.RequestSender.AwaitableSendRequest(
      Constants.HttpMethods.GET,
      config.EndPoints["getAllAwaitingApproval"]
    );

    return getAllAwaitingApprovalResponse.isSuccess
      ? getAllAwaitingApprovalResponse.responseData
      : [];
  };

  handleBlogPostApprovalStatusChange = (e, isApproved) => {
    e.preventDefault();
    let currentPosts = this.state.posts.filter(
      (post) => post["_id"] !== e.target.value
    );
    this.setState({
      posts: currentPosts,
    });
    try {
      this.sendUpdateBlogPostApprovalStatusRequest(e.target.value, isApproved);
    } catch (error) {
      alert(error.message);
    }
  };

  sendUpdateBlogPostApprovalStatusRequest = (blogPostId, isApproved) => {
    debugger
    let targetEndPoint = `${
      isApproved
        ? config.EndPoints["approveWaitingBlogPost"]
        : config.EndPoints["rejectWaitingBlogPost"]
    }/${blogPostId}`;
    this.context.Services.RequestSender.SendRequest(
      Constants.HttpMethods.POST,
      targetEndPoint,
      null,
      null,
      this.context.AuthorityInfo.Token
    );
  };

  createBlogPostImgSourceLinkById = (postId) => {
    return `${config.BASE_URL}${config.EndPoints["getImageById"]}/${postId}`;
  };

  async componentDidMount() {
    let posts = await this.getAllAwaitingApproval();
    this.setState({
      posts: posts,
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {this.state.posts.map((post) => {
            return (
              <tr key={post["_id"]}>
                <th scope="row">1</th>
                <td>{post.senderInfo.firstName}</td>
                <td>{post.senderInfo.lastName}</td>
                <td>{post.senderInfo.email}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-dark"
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg"
                  >
                    Read
                  </button>
                  <Modal
                    imgHeaderSrc={this.createBlogPostImgSourceLinkById(
                      post["_id"]
                    )}
                    heading={post.header}
                    content={post.content}
                  />
                </td>
                <td>
                  <button
                    value={post["_id"]}
                    onClick={(e) =>
                      this.handleBlogPostApprovalStatusChange(e, false)
                    }
                    type="button"
                    class="btn btn-danger"
                    style={{ marginRight: "0.5em" }}
                  >
                    Reject
                  </button>
                  <button
                    value={post["_id"]}
                    onClick={(e) =>
                      this.handleBlogPostApprovalStatusChange(e, true)
                    }
                    type="button"
                    class="btn btn-success"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
