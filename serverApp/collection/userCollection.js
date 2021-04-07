console.log("userCollection module reading...");

const CollectionBase = require("./collectionBase");

const USER_COLLECTION_NAME = "user";

class UserCollection extends CollectionBase {
  constructor(db) {
    super(db, USER_COLLECTION_NAME);
    this.collection.createIndex({ email: 1 }, { unique: true });
  }

  getUserByEmail = async (email) => {
    return await this.collection.findOne({ email: email });
  };

  updateTokenByEmail = async (email, token) => {
    await this.collection.updateOne(
      { email: email },
      { $set: { token: token } }
    );
  };

  getAllUsersIpAddress = async () => {
    return await this.collection
      .findOne({})
      .project({ ipAddress: 1 })
      .toArray();
  };
}

module.exports = (function () {
  console.log("userCollection module exported!");
  return UserCollection;
})();
