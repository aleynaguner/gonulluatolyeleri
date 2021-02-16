const config = require("../config");

const createUserService = () => {
  const userCollection = require("../collection/userCollection");
  const UserService = require("./userService");

  return new UserService(userCollection);
};

const createMongoDBService = () => {
  const MongoDBSetting = require("../model/model").mongoDBSetting;
  const MongoDBService = require("./mongoDBService");

  let mongoDBSetting = new MongoDBSetting(config.mongoDBURL);

  return new MongoDBService(mongoDBSetting);
};

module.exports = {
  UserService: createUserService(),
  MongoDBService: createMongoDBService(),
};
