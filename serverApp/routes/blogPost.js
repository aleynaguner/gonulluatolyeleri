const express = require("express");
const router = express.Router();

const multer = require("multer");
const postImagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../filestore/postimagesbyid/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: postImagesStorage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
  // fileFilter: fileFilter,
});

const blogPostService = require("../service/service").services.getBlogPostService();

router.post(
  "/createBlogPost",
  upload.single("image"),
  async (req, res) => {
    // let createBlogPostResult = await blogPostService.createBlogPost({
    //   ...req.body,
    // });

    // if (createBlogPostResult.isSuccessful) {
    //   res.status(200).send(createBlogPostResult);
    // } else {
    //   res.status(500).send(createBlogPostResult);
    // }
    console.log("hi");
  }
);

module.exports = router;
