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

router.get("/getAllUsers", async (req, res) => {
  let allUsers = await userService.getAllUsers();
  res.status(200).send(allUsers);
});

router.delete("/deleteUserById/:id", async (req, res) => {
  let toBeDeletedUserId = req.params["id"];
  let deleteResult = await userService.deleteUserById(toBeDeletedUserId);
  res.status(200).send(deleteResult);
});

module.exports = router;
