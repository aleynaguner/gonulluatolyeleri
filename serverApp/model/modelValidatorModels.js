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

const workShopModel = {
  modelName: "workShopModel",
  model: {
    name: "string",
    content: "string",
    category: "string",
    workshopDate: "string",
    applicationDeadline: "string",
    responsibles: "array",
    location: "string",
  },
};

module.exports = {
  emailSendModel: emailSendModel,
  userModel: userModel,
  workShopModel: workShopModel,
};
