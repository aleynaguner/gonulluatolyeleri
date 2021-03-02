console.log("service module reading...");

const config = require("../config");

const userCollection = require("../collection/userCollection");

const utils = require("./utils");
const mongoDBService = require("./mongoDBService");

const _userService = require("./userService");
const userService = new _userService(userCollection);

const _authService = require("./authService");
const authService = new _authService({
  userService: userService,
  secretKey: config.secretKey,
});

const emailService = require("./emailService");

module.exports = (function () {
  console.log("service module exported!");
  return {
    utils: utils,
    mongoDBService: new mongoDBService({ url: config.mongoDBURL }),
    userService: userService,
    authService: authService,
    emailService: emailService,
  };
})();
