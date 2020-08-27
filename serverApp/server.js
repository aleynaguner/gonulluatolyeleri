const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const router = express.Router();

router.use(bodyParser());
router.use(express.static(path.join(__dirname, "../client-app/build")));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client-app/build"));
});

const app = express().use(router).listen(3000);
