console.log("hostextension module reading...");

const authMiddleware = require("./authMiddleware");
const imageUploader = require("./imageUploader");

module.exports = (function () {
  console.log("hostextension module exported!");
  return {
    authMiddleware: authMiddleware,
    imageUploader: imageUploader,
  };
})();
