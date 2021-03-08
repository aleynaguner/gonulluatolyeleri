console.log("service module reading...");

const config = require("../config");
const collection = require("../collection/collection");
const utils = require("./utils");

const mongoDBService = require("./mongoDBService");
function createMongoDBService() {
  return new mongoDBService({ url: config.mongoDBURL });
}

const _userService = require("./userService");
function createUserService() {
  return new _userService(collection.userCollection);
}

const _authService = require("./authService");
function createAuthService(userService) {
  return new _authService({
    userService: userService,
    secretKey: config.secretKey,
  });
}

const emailService = require("./emailService");

module.exports = (function () {
  console.log("service module exported!");
  let service = {
    utils: utils,
    mongoDBService: createMongoDBService(),
    userService: createUserService(),
    emailService: emailService,
  };
  service.authService = createAuthService(service.userService);

  return service;
})();
