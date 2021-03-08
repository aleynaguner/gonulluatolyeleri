console.log("userService module reading...");

const bcrypt = require("bcrypt");

class UserService {
  constructor(userCollection) {
    this.userCollection = userCollection;
  }

  createUser = async (user) => {
    let hashedPassword = await bcrypt.hash(user.password, 10);

    await this.userCollection.create({
      email: user.email,
      hashedPassword: hashedPassword,
    });
  };

  getAllUsers = async () => {
    return await this.userCollection.find({}).lean();
  };

  getUserByEmail = async (email) => {
    return await this.userCollection.findOne({ email: email }).lean();
  };

  updateTokenByEmail = async (email, token) => {
    await this.userCollection.findOneAndUpdate(
      { email: email },
      { token: token }
    );
  };

  getAllUsersIpAddress = async () => {
    return await this.userCollection
      .findOne({ email: email })
      .select("ipAddress")
      .lean();
  };
}

module.exports = (function () {
  console.log("userService module exported!");
  return UserService;
})();
