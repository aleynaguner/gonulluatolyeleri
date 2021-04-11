console.log("blogPostCollection module reading...");

const CollectionBase = require("./collectionBase");

const BLOG_POST_COLLECTION_NAME = "blogpost";

class BlogPostCollection extends CollectionBase {
  constructor(db) {
    super(db, BLOG_POST_COLLECTION_NAME);
  }
}

module.exports = (function () {
  console.log("blogPostCollection module exported!");
  return BlogPostCollection;
})();
