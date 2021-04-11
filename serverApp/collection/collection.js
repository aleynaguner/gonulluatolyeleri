console.log("collection module reading...");

const userCollection = require("../collection/userCollection");
const blogPostCollection = require("./blogPostCollection");

module.exports = (function () {
  console.log("collection module exported!");
  return {
    userCollection: userCollection,
    blogPostCollection: blogPostCollection,
  };
})();
