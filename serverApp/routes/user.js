const express = require("express");
const router = express.Router();

const userService = require("../service/service").services.getUserService();

router.post("/createUser", async (req, res) => {
  let createUserResult = await userService.createUser({
    ...req.body,
    ipAddress: req.ip,
  });

  if (createUserResult.isSuccessful) {
    res.status(200).send(createUserResult);
  } else {
    res.status(500).send(createUserResult);
  }
});

router.get("/getUserSessionInfo", async (req, res) => {
  let userSessionInfo = userService.getUserSessionInfo(req);
  res.status(200).send(userSessionInfo);
});

module.exports = router;
