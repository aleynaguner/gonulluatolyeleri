"use strict";

console.log("service module reading...");

var config = require("../config");

var collection = require("../collection/collection");

var utils = require("./utils");

var mongoDBService = require("./mongoDBService");

function createMongoDBService() {
  return new mongoDBService({
    url: config.mongoDBURL
  });
}

var _userService = require("./userService");

function createUserService() {
  return new _userService(collection.userCollection);
}

var _authService = require("./authService");

function createAuthService(userService) {
  return new _authService({
    userService: userService,
    secretKey: config.secretKey
  });
}

var emailService = require("./emailService");

module.exports = function () {
  console.log("service module exported!");
  var service = {
    utils: utils,
    mongoDBService: createMongoDBService(),
    userService: createUserService(),
    emailService: emailService
  };
  service.authService = createAuthService(service.userService);
  return service;
}();