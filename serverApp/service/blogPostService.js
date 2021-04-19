console.log("blogPostService module reading...");
const documentConstants = require("../collection/documentsConstants").blogPost;

const utils = require("./utils");

class BlogPostService {
  constructor(blogPostCollection) {
    this.blogPostCollection = blogPostCollection;
  }

  createBlogPost = async (blogPost) => {
    try {
      await this.blogPostCollection.create(blogPost);
    } catch (error) {
      console.error("Error occured when createBlogPost!", error);
      return utils.createProcessResult(false, error.message.toString());
    }
    return utils.createProcessResult(true);
  };

  approveWaitingBlogPost = async (blogPostId) => {
    try {
      await this.blogPostCollection.updateApprovalStatus(blogPostId, documentConstants.ApprovalStatus.Approved);
    } catch (error) {
      console.error("Error occured when rejectWaitingBlogPost!", error);
      return utils.createProcessResult(false, error.message.toString());
    }
    return utils.createProcessResult(true);
  };

  rejectWaitingBlogPost = async (blogPostId) => {
    try {
      await this.blogPostCollection.deleteById(blogPostId);
    } catch (error) {
      console.error("Error occured when rejectWaitingBlogPost!", error);
      return utils.createProcessResult(false, error.message.toString());
    }
    return utils.createProcessResult(true);
  };

  getAllAwaitingApproval = async () => {
    return await this.blogPostCollection.getAllAwaitingApproval();
  };

  getAllBlogPosts = async () => {
    return await this.blogPostCollection.getAllApproved();
  };

  getImageFileNameById = async (id) => {
    let fileName = await this.blogPostCollection.getImageFileNameById(id);
    return fileName;
  };
}

module.exports = (function () {
  console.log("blogPostService module exported!");
  return BlogPostService;
})();
