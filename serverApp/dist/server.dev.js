"use strict";

//#region
var express = require("express");

var bodyParser = require("body-parser");

var path = require("path");

var modelsValidator = require("models-validator");

var cors = require("cors");

var config = require("./config");

var model = require("./model/model");

var service = require("./service/service");

var authRoutes = require("./routes/auth");

var middlewareExtension = require("./host-extension/middlewareExtension"); //#endregion


var connectToMongo = function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(service.mongoDBService.connectToMongo());

        case 3:
          _context.next = 8;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          console.log("Couldn't connect to MongoDB!", _context.t0);

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(service.userService.createUser({
            email: config.adminEmail,
            password: config.adminPassword
          }));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 5]]);
}();

var router = express.Router();

var configureRoutesToBeAuth = function configureRoutesToBeAuth(_router) {
  _router.use("/api/getAllUsers", middlewareExtension.authMiddleware);
};

var configureMiddlewares = function (_router) {
  _router.use(express["static"](path.join(__dirname, "../client-app/build")));

  _router.use(bodyParser());

  _router.use(cors({
    origin: "http://localhost:3000"
  }));

  configureRoutesToBeAuth(_router);

  _router.use(modelsValidator.modelValidatorMiddleware({
    "/api/sendEmail": modelsValidator.createModel(model.emailSendModel.modelName, model.emailSendModel.model),
    "/api/auth/login": modelsValidator.createModel(model.userModel.modelName, model.userModel.model)
  }));
}(router);

var configureClientAppRoute = function configureClientAppRoute(_router) {
  _router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../client-app/build"));
  }); // Yukarıda belirtilen pointler hariç tüm GET requestleri "/" ya yani React app yönlendirir.


  _router.get("*", function (req, res) {
    res.redirect("/");
  });
};

var configureRoutes = function (_router) {
  configureClientAppRoute(_router);

  _router.use("/api/auth", authRoutes);

  _router.post("/api/sendEmail", function _callee2(req, res) {
    var emailServiceResponse;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(service.emailService.sendEmail({
              user: config.senderUser,
              pass: config.senderPass
            }, config.emailService, config.receiverUser, req.body.topic, req.body.message));

          case 2:
            emailServiceResponse = _context2.sent;
            res.status(emailServiceResponse.responseCode).send({
              isSuccess: emailServiceResponse.isSuccess,
              message: emailServiceResponse.message
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  });

  _router.post("/api/getAllUsersIpAddress", function _callee3(req, res) {
    var ipAddresses;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(service.userService.getAllUsersIpAddress());

          case 2:
            ipAddresses = _context3.sent;
            res.status(200).send(ipAddresses);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  });

  _router.post("/api/createUser", function _callee4(req, res) {
    var ipAddresses;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(service.userService.createUser({
              email: req.body.email,
              password: req.body.password,
              ip: req.ip.toString()
            }));

          case 2:
            ipAddresses = _context4.sent;
            res.status(200).send(ipAddresses);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
}(router);

var app = express().use(router).listen(3001, function () {
  return console.log("serverApp listening on 3000!");
});