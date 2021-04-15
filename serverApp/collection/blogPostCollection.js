console.log("blogPostCollection module reading...");

const ObjectID = require("mongodb").ObjectID;

const CollectionBase = require("./collectionBase");

const BLOG_POST_COLLECTION_NAME = "blogpost";

class BlogPostCollection extends CollectionBase {
  constructor(db) {
    super(db, BLOG_POST_COLLECTION_NAME);
  }

  getImageFileNameById = async (id) => {
    let blogPostImageFileInfo = await this.collection.findOne(
      { _id: new ObjectID(id) },
      { projection: { imageFileName: 1 } }
    );

    return blogPostImageFileInfo["imageFileName"];
  };

  getAll = async () => {
    let all = await this.collection.find(
      {},
      { projection: { _id: 1, senderInfo: 1, header: 1, content: 1 } }
    );
    return all.toArray();
  };
}

module.exports = (function () {
  console.log("blogPostCollection module exported!");
  return BlogPostCollection;
})();
