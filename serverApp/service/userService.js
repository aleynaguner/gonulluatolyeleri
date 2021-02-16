class UserService {
  constructor(userCollection) {
    this.userCollection = userCollection;
  }

  CreateUser = async (user) => {
    await this.userCollection.create(user);
  };
}

module.exports = UserService;
