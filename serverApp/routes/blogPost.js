const express = require("express");
const router = express.Router();

const blogPostService = require("../service/service").services.getBlogPostService();

router.post("/createBlogPost", async (req, res) => {
  let createBlogPostResult = await blogPostService.createBlogPost({
    ...req.body,
  });

  if (createBlogPostResult.isSuccessful) {
    res.status(200).send(createBlogPostResult);
  } else {
    res.status(500).send(createBlogPostResult);
  }
});

module.exports = router;
