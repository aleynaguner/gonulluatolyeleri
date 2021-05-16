const express = require("express");

const router = express.Router();

const workShopService =
  require("../service/service").services.getWorkShopService();
const postImageUploader =
  require("../hostextension/hostextension").imageUploader.createImageUploader({
    storeName: "workshopimagesbyid",
  });

router.post(
  "/createWorkShop",
  postImageUploader.single("image"),
  async (req, res) => {
    let processResult = await workShopService.createWorkShop(req.body);
    // TO-DO: imageInfo dan doc id si almak yerine file name update yapalım.
    // Eğer processResult.isSuccessful değilse file ı silelim.
    res.status(200).send(processResult);
  }
);

router.get("/getAllWorkShops", async (req, res) => {
  let allWorkShops = await workShopService.getAllWorkShops();
  res.status(200).send(allWorkShops);
});

module.exports = router;
