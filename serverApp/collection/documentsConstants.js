console.log("documentsConstants module reading...");

const blogPost = {
  ApprovalStatus: {
    Rejected: -1,
    Waiting: 0,
    Approved: 1,
  },
};

module.exports = (function () {
  console.log("documentsConstants module exported!");
  return {
    blogPost: blogPost,
  };
})();
