console.log("blogPostService module reading...");

const utils = require("./utils");

class BlogPostService {
  constructor(blogPostCollection) {
    this.blogPostCollection = blogPostCollection;
  }

  createBlogPost = async (blogPost) => {
    try {
      await this.blogPostCollection.insertOne({
        senderInfo: {
          firstName: blogPost.senderInfo.firstName,
          lastName: blogPost.senderInfo.lastName,
          email: blogPost.senderInfo.email,
        },
        header: blogPost.header,
        image: "blabla",
        content: blogPost.content,
      });
    } catch (error) {
      console.error("Error occured when createBlogPost!", error);
      return utils.createProcessResult(false, error.message.toString());
    }

    return utils.createProcessResult(true);
  };
}

module.exports = (function () {
  console.log("blogPostService module exported!");
  return BlogPostService;
})();
