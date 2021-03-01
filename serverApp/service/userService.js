class UserService {
  constructor(userCollection) {
    this.userCollection = userCollection;
  }

  CreateUser = async (user) => {
    await this.userCollection.create(user);
  };

  GetAllUsers = async () => {
    let users = await this.userCollection.find({});
    
    return users;
  };
}

module.exports = UserService;
