const express = require("express");
const router = express.Router();
const path = require("path");

const config = require("../config");
const blogPostService = require("../service/service").services.getBlogPostService();

const postimagesbyidPath = path.join(config.fileStorePath, "postimagesbyid");

const postImageUploader = require("../hostextension/hostextension").imageUploader.createImageUploader(
  { storeName: "postimagesbyid" }
);

router.post(
  "/createBlogPost",
  postImageUploader.single("image"),
  async (req, res) => {
    req.body.senderInfo = JSON.parse(req.body.senderInfo);

    let createBlogPostResult = await blogPostService.createBlogPost({
      ...req.body,
    });

    if (createBlogPostResult.isSuccessful) {
      res.status(200).send(createBlogPostResult);
    } else {
      res.status(500).send(createBlogPostResult);
    }
  }
);

router.get("/getAllBlogPosts", async (req, res) => {
  let allBlogPosts = await blogPostService.getAllBlogPosts();
  res.status(200).send(allBlogPosts);
});

router.get("/getImageById/:id", async (req, res) => {
  let imageFileName = await blogPostService.getImageFileNameById(
    req.params.id.trim()
  );
  res.sendFile(imageFileName, {
    root: postimagesbyidPath,
    dotfiles: "allow",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  });
});

module.exports = router;
