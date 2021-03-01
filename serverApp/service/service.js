const config = require("../config");

const createUserService = () => {
  const userCollection = require("../collection/userCollection");
  const UserService = require("./userService");

  return new UserService(userCollection);
};

const createMongoDBService = () => {
  const MongoDBService = require("./mongoDBService");

  return new MongoDBService({ url: config.mongoDBURL });
};

module.exports = {
  UserService: createUserService(),
  MongoDBService: createMongoDBService(),
  utils: require("./utils"),
  EmailService: require("./emailService"),
};
