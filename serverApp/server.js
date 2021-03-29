//#region
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const modelsValidator = require("models-validator");
const cors = require("cors");

const config = require("./config");

const model = require("./model/model");
const getServices = require("./service/service");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const middlewareExtension = require("./host-extension/middlewareExtension");
//#endregion

async function main() {
  const service = await getServices();

  console.log("service is: ", service);
  const createAdminUser = (async function () {
    await service.userService.createUser({
      email: config.adminEmail,
      password: config.adminPassword,
    });
    console.log("createAdminUser completed !");
  })();

  console.log("router setted !");
  const router = express.Router();

  const configureRoutesToBeAuth = (_router) => {
    _router.use("/api/getAllUsers", middlewareExtension.authMiddleware);
  };

  const configureMiddlewares = (function (_router) {
    _router.use(express.static(path.join(__dirname, "../client-app/build")));
    _router.use(bodyParser());
    _router.use(cors({ origin: "http://localhost:3000" }));
    configureRoutesToBeAuth(_router);
    _router.use(
      modelsValidator.modelValidatorMiddleware({
        "/api/sendEmail": modelsValidator.createModel(
          model.modelValidatorModels.emailSendModel.modelName,
          model.modelValidatorModels.emailSendModel.model
        ),
        "/api/auth/login": modelsValidator.createModel(
          model.modelValidatorModels.userModel.modelName,
          model.modelValidatorModels.userModel.model
        ),
        "/api/user/createUser": modelsValidator.createModel(
          `${model.modelValidatorModels.userModel.modelName}ForCreateUser`,
          model.modelValidatorModels.userModel.model
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
    _router.use("/api/user", userRoutes);

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

    _router.post("/api/getAllUsersIpAddress", async (req, res) => {
      let ipAddresses = await service.userService.getAllUsersIpAddress();
      res.status(200).send(ipAddresses);
    });

    _router.post("/api/createUser", async (req, res) => {
      let ipAddresses = await service.userService.createUser({
        email: req.body.email,
        password: req.body.password,
        ip: req.ip.toString(),
      });
      res.status(200).send(ipAddresses);
    });
  })(router);

  const app = express()
    .use(router)
    .listen(3001, () => console.log("serverApp listening on 3000!"));
}

main();
