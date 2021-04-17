console.log("blogPostCollection module reading...");

const ObjectID = require("mongodb").ObjectID;

const CollectionBase = require("./collectionBase");
const constants = require("./documentsConstants").blogPost;

const BLOG_POST_COLLECTION_NAME = "blogpost";

class BlogPostCollection extends CollectionBase {
  constructor(db) {
    super(db, BLOG_POST_COLLECTION_NAME);
  }

  create = async (blogPost) => {
    await this.collection.insertOne(
      {
        approvalStatus: constants.ApprovalStatus.Waiting,
        senderInfo: {
          firstName: blogPost.senderInfo.firstName,
          lastName: blogPost.senderInfo.lastName,
          email: blogPost.senderInfo.email,
        },
        header: blogPost.header,
        content: blogPost.content,
        imageFileName: blogPost.imageInfo.fileName,
      },
      blogPost.imageInfo.id
    );
  };

  updateApprovalStatus = async (blogPostId, isApproved) => {
    let newStatus = isApproved
      ? constants.ApprovalStatus.Approved
      : constants.ApprovalStatus.Rejected;
    await this.collection.updateOne(
      { _id: blogPostId },
      {
        $set: {
          approvalStatus: newStatus,
        },
      }
    );
  };

  getImageFileNameById = async (id) => {
    let blogPostImageFileInfo = await this.collection.findOne(
      { _id: new ObjectID(id) },
      { projection: { imageFileName: 1 } }
    );

    return blogPostImageFileInfo["imageFileName"];
  };

  getAllAwaitingApproval = async () => {
    let allAwaitingApproval = await this.collection.find(
      { approvalStatus: constants.ApprovalStatus.Waiting },
      { projection: { _id: 1, senderInfo: 1, header: 1, content: 1 } }
    );
    return allAwaitingApproval.toArray();
  };

  getAllApproved = async () => {
    let allApproved = await this.collection.find(
      { approvalStatus: constants.ApprovalStatus.Approved },
      { projection: { _id: 1, senderInfo: 1, header: 1, content: 1 } }
    );
    return allApproved.toArray();
  };
}

module.exports = (function () {
  console.log("blogPostCollection module exported!");
  return BlogPostCollection;
})();
