console.log("service module reading...");

const config = require("../config");
const collection = require("../collection/collection");
const utils = require("./utils");

const mongoDBService = require("./mongoDBService");
async function createCollections() {
  let gonulluAtolyeleriDbService = new mongoDBService({
    url: config.mongoDBURL,
    dbName: config.gonulluAtolyeleriDbName,
  });

  try {
    await gonulluAtolyeleriDbService.connectToMongo();
  } catch (error) {
    throw Error("Couldn't connect to MongoDB!", error);
  }

  return {
    user: new collection.userCollection(gonulluAtolyeleriDbService.db),
  };
}

const _userService = require("./userService");
let userServiceSingletonInstance = undefined;
function createUserService(userCollection) {
  if (userServiceSingletonInstance === undefined) {
    userServiceSingletonInstance = new _userService(userCollection);
  }
  return userServiceSingletonInstance;
}

const authService = require("./authService");
let authServiceSingletonInstance = undefined;
function createAuthService(userService) {
  if (authServiceSingletonInstance === undefined) {
    authServiceSingletonInstance = new authService({
      userService: userService,
      secretKey: config.secretKey,
    });
  }
  return authServiceSingletonInstance;
}

const emailService = require("./emailService");

let _services = undefined;
async function configure() {
  if (_services !== undefined) return;

  const collections = await createCollections();

  _services = {
    utils: utils,
    userService: createUserService(collections.user),
    emailService: emailService,
  };
  _services.authService = createAuthService(_services.userService);
}

const services = {
  getUtils: () => _services.utils,
  getUserService: () => _services.userService,
  getEmailService: () => _services.emailService,
  getAuthService: () => _services.authService,
};

module.exports = (function () {
  console.log("service module exported!");
  return { configure, services };
})();
