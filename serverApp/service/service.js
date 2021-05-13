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
    let connected = await gonulluAtolyeleriDbService.connectToMongo();
    if (!connected) throw new Error();
  } catch (error) {
    throw Error("Couldn't connect to MongoDB!", error);
  }

  return {
    user: new collection.userCollection(gonulluAtolyeleriDbService.db),
    blogPost: new collection.blogPostCollection(gonulluAtolyeleriDbService.db),
    workShop: new collection.workShopCollection(gonulluAtolyeleriDbService.db),
  };
}

const _userService = require("./userService");
let userServiceSingletonInstance = null;
function createUserService(userCollection) {
  if (userServiceSingletonInstance === null) {
    userServiceSingletonInstance = new _userService(userCollection);
  }
  return userServiceSingletonInstance;
}

const _blogPostService = require("./blogPostService");
let blogPostServiceSingletonInstance = null;
function createBlogPostService(blogPostCollection) {
  if (blogPostServiceSingletonInstance === null) {
    blogPostServiceSingletonInstance = new _blogPostService(blogPostCollection);
  }

  return blogPostServiceSingletonInstance;
}

const _workShopService = require("./workShopService");
let workShopServiceSingletonInstance = null;
function createWorkShopService(workShopCollection) {
  if (workShopServiceSingletonInstance === null) {
    workShopServiceSingletonInstance = new _workShopService(workShopCollection);
  }

  return workShopServiceSingletonInstance;
}

const authService = require("./authService");
let authServiceSingletonInstance = null;
function createAuthService(userService) {
  if (authServiceSingletonInstance === null) {
    authServiceSingletonInstance = new authService({
      userService: userService,
      secretKey: config.secretKey,
    });
  }
  return authServiceSingletonInstance;
}

const emailService = require("./emailService");

let _services = null;
async function configure() {
  if (_services !== null) return;

  const collections = await createCollections();

  _services = {
    utils: utils,
    userService: createUserService(collections.user),
    blogPostService: createBlogPostService(collections.blogPost),
    workShopService: createWorkShopService(collections.workShop),
    emailService: emailService,
  };
  _services.authService = createAuthService(_services.userService);
}

const services = {
  getUtils: () => _services.utils,
  getUserService: () => _services.userService,
  getBlogPostService: () => _services.blogPostService,
  getEmailService: () => _services.emailService,
  getAuthService: () => _services.authService,
  getWorkShopService: () => _services.workShopService,
};

module.exports = (function () {
  console.log("service module exported!");
  return { configure, services };
})();
