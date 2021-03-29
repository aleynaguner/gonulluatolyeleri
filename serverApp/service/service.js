console.log("service module reading...");

const config = require("../config");
const collection = require("../collection/collection");
const utils = require("./utils");

const mongoDBService = require("./mongoDBService");
async function createCollections() {
  let gonulluAtolyeleriDb = new mongoDBService({
    url: config.mongoDBURL,
    dbName: config.gonulluAtolyeleriDbName,
  });

  try {
    await gonulluAtolyeleriDb.connectToMongo();
  } catch (error) {
    throw Error("Couldn't connect to MongoDB!", error);
  }

  return {
    user: new collection.userCollection(gonulluAtolyeleriDb),
  };
}

const _userService = require("./userService");
function createUserService(userCollection) {
  return new _userService(userCollection);
}

const _authService = require("./authService");
function createAuthService(userService) {
  return new _authService({
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
    collections: collections,
    userService: createUserService(collections.user),
    emailService: emailService,
  };
  service.authService = createAuthService(service.userService);

  return service;
}

module.exports = getServices;
