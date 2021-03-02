//#region
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const modelsValidator = require("models-validator");

const config = require("./config");

const model = require("./model/model");
const service = require("./service/service");
const authRoutes = require("./routes/auth");
//#endregion

const connectToMongo = (async function () {
  try {
    await service.mongoDBService.connectToMongo();
  } catch (error) {
    console.log("Couldn't connect to MongoDB!", error);
  }
  await service.userService.createUser({
    email: config.adminEmail,
    password: config.adminPassword,
  });
})();
const router = express.Router();

const configureMiddlewares = (function (_router) {
  _router.use(bodyParser());
  _router.use(express.static(path.join(__dirname, "../client-app/build")));
  _router.use(
    modelsValidator.modelValidatorMiddleware({
      "/api/sendEmail": modelsValidator.createModel(
        model.emailSendModel.modelName,
        model.emailSendModel.model
      ),
      "/api/auth/login": modelsValidator.createModel(
        model.userModel.modelName,
        model.userModel.model
      ),
    })
  );
})(router);

const configureClientAppRoute = function (_router) {
  _router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client-app/build"));
  });
  // Yukarıda belirtilen pointler hariç tüm GET requestleri "/" ya yani React app yönlendirir.
  _router.get("*", function (req, res) {
    res.redirect("/");
  });
};

const configureRoutes = (function (_router) {
  configureClientAppRoute(_router);

  _router.use("/api/auth", authRoutes);

  _router.post("/api/sendEmail", async (req, res) => {
    let emailServiceResponse = await service.emailService.sendEmail(
      {
        user: config.senderUser,
        pass: config.senderPass,
      },
      config.emailService,
      config.receiverUser,
      req.body.topic,
      req.body.message
    );

    res.status(emailServiceResponse.responseCode).send({
      isSuccess: emailServiceResponse.isSuccess,
      message: emailServiceResponse.message,
    });
  });

  _router.post("/api/getAllUsers", async (req, res) => {
    let users = await service.userService.getAllUsers();
    console.log(users);
    res.statusCode(200).send(users);
  });
})(router);

const app = express()
  .use(router)
  .listen(3000, () => console.log("serverApp listening on 3000!"));
