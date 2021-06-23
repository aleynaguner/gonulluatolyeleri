console.log("userService module reading...");

const bcrypt = require("bcrypt");
const utils = require("../utilities/utils");

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

  getAllUsers = async () => {
    let allUsers = await this.userCollection.getAllUsers();
    return allUsers;
  };

  getUserByEmail = async (email) =>
    await this.userCollection.getUserByEmail(email);

  updateTokenByEmail = async (email, token) =>
    await this.userCollection.updateTokenByEmail(email, token);

  getAllUsersIpAddress = async () =>
    await this.userCollection.getAllUsersIpAddress();

  getUserSessionInfo = (request) => {
    if (
      utils.hasDefaultValue(request.decode) ||
      utils.hasDefaultValue(request.decode.email)
    )
      return { isAnonymous: true };
    else
      return {
        isAnonymous: false,
        email: request.decode.email,
        ipAddress: request.decode.ipAddress,
      };
  };

  deleteUserById = async (id) => {
    let deleteUserByIdResult = await this.userCollection.deleteById(id);
    return deleteUserByIdResult;
  };
}

module.exports = (function () {
  console.log("userService module exported!");
  return UserService;
})();
