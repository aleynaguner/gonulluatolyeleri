const express = require("express");
const router = express.Router();
const path = require("path");
const config = require("../config");

const workShopService =
  require("../service/service").services.getWorkShopService();

const postimagesbyidPath = path.join(
  config.fileStorePath,
  "workshopimagesbyid"
);

const postImageUploader =
  require("../hostextension/hostextension").imageUploader.createImageUploader({
    storeName: "workshopimagesbyid",
  });

router.post(
  "/createWorkShop",
  postImageUploader.single("image"),
  async (req, res) => {
    let processResult = await workShopService.createWorkShop(req.body);
    // if processResult unsuccessfull delete created file
    res.status(200).send(processResult);
  }
);

router.get("/getAllWorkShops", async (req, res) => {
  let allWorkShops = await workShopService.getAllWorkShops();
  res.status(200).send(allWorkShops);
});

module.exports = router;
