const express = require("express");
const router = express.Router();

const authService = require("../service/service").authService;

router.post("/login", async (req, res) => {
  let loginResult = await authService.login(req.body);

  res.status(200).send(loginResult);
});

module.exports = router;
