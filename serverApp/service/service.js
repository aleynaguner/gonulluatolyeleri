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
function createUserService(userCollection) {
  return new _userService(userCollection);
}

const authService = require("./authService");
function createAuthService(userService) {
  return new authService({
    userService: userService,
    secretKey: config.secretKey,
  });
}

const emailService = require("./emailService");

async function getServices() {
  console.log("service module exported!");

  const collections = await createCollections();
  let service = {
    utils: utils,
    userService: createUserService(collections.user),
    emailService: emailService,
  };
  service.authService = createAuthService(service.userService);

  return service;
}

module.exports = getServices;
