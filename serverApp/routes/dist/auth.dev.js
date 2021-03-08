"use strict";

var express = require("express");

var router = express.Router();

var authService = require("../service/service").authService;

router.post("/login", function _callee(req, res) {
  var loginResult;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(authService.login(req.body));

        case 2:
          loginResult = _context.sent;
          res.status(200).send(loginResult);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;