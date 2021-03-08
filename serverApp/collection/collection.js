console.log("collection module reading...");

const userCollection = require("../collection/userCollection");

module.exports = (function () {
  console.log("collection module exported!");
  return {
    userCollection: userCollection,
  };
})();
