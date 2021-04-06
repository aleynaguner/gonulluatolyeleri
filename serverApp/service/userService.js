console.log("userService module reading...");

const bcrypt = require("bcrypt");
const utils = require("./utils");

class UserService {
  constructor(userCollection) {
    this.userCollection = userCollection;
  }

  createUser = async (user) => {
    let hashedPassword = await bcrypt.hash(user.password, 10);

    try {
      await this.userCollection.insertOne({
        email: user.email,
        hashedPassword: hashedPassword,
        ipAddress: user.ipAddress,
      });
    } catch (error) {
      console.error("Error occured when createUser!", error);
      return utils.createProcessResult(false, error.message.toString());
    }

    return utils.createProcessResult(true);
  };

  getAllUsers = async () => await this.userCollection.getAllUsers();

  getUserByEmail = async (email) =>
    await this.userCollection.getUserByEmail(email);

  updateTokenByEmail = async (email, token) =>
    await this.userCollection.updateTokenByEmail(email, token);

  getAllUsersIpAddress = async () =>
    await this.userCollection.getAllUsersIpAddress();
}

module.exports = (function () {
  console.log("userService module exported!");
  return UserService;
})();
