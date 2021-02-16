class UserModel {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

const userValidationModel = {
  modelName: "userModel",
  model: {
    id: "string",
    email: "string",
    password: "string",
  },
};

module.exports = { userValidationModel, UserModel };
