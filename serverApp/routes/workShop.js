const express = require("express");
const router = express.Router();
const path = require("path");

const config = require("../config");
const workShopService =
  require("../service/service").services.getWorkShopService();

router.get("/getAllWorkShops", async (req, res) => {
  let allWorkShops = await workShopService.getAllWorkShops();
  res.status(200).send(allWorkShops);
});

module.exports = router;
