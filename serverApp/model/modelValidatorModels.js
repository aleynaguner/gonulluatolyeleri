const emailSendModel = {
  modelName: "emailSendModel",
  model: {
    topic: "string",
    message: "string",
  },
};

const userModel = {
  modelName: "userModel",
  model: {
    email: "string",
    password: "string",
  },
};

module.exports = {
  emailSendModel: emailSendModel,
  userModel: userModel,
};
