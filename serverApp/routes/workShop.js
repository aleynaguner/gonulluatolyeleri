const express = require("express");
const router = express.Router();
const path = require("path");

const config = require("../config");

const workShopService =
  require("../service/service").services.getWorkShopService();

const workshopimagesbyidPath = path.join(
  config.fileStorePath,
  "postimagesbyid"
);
const imageUploader =
  require("../hostextension/hostextension").imageUploader.createImageUploader({
    storeName: "workshopimagesbyid",
  });

router.post(
  "/createWorkShop",
  imageUploader.single("image"),
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

router.get("/getImageById/:id", async (req, res) => {
  let imageFileName = await workShopService.getImageFileNameById(
    req.params.id.trim()
  );
  res.sendFile(imageFileName, {
    root: workshopimagesbyidPath,
    dotfiles: "allow",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  });
});

module.exports = router;
