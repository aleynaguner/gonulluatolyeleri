console.log("collection module reading...");

const userCollection = require("../collection/userCollection");
const blogPostCollection = require("./blogPostCollection");
const workShopCollection = require("./workShopCollection");

module.exports = (function () {
  console.log("collection module exported!");
  return {
    userCollection: userCollection,
    blogPostCollection: blogPostCollection,
    workShopCollection: workShopCollection,
  };
})();
