//#region
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const modelsValidator = require("models-validator");

const model = require("./model/model");
const Service = require("./service/service");

const authRoutes = require("./routes/auth");
const config = require("./config");
//#endregion

const connectToMongo = (async function () {
  await Service.MongoDBService.ConnectToMongo();
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
      "/api/login": modelsValidator.createModel(
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
  _router.use("/api/auth", authRoutes);

  configureClientAppRoute(_router);

  _router.post("/api/sendEmail", async (req, res) => {
    let emailServiceResponse = await Service.EmailService.sendEmail(
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
    let users = await Service.UserService.GetAllUsers();

    res.statusCode(200).send(users);
  });
})(router);

const app = express().use(router).listen(3000);
