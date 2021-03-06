//#region
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const modelsValidator = require("models-validator");
const cors = require("cors");

const config = require("./config");

const model = require("./model/model");
const _service = require("./service/service");

const hostextension = require("./hostextension/hostextension");
const utils = require("./utilities/utils");
//#endregion

async function main() {
  const service = await (async function () {
    await _service.configure();
    return {
      utils: _service.services.getUtils(),
      userService: _service.services.getUserService(),
      emailService: _service.services.getEmailService(),
      authService: _service.services.getAuthService(),
      validationService: _service.services.getValidationService(),
    };
  })();

  const createAdminUser = await (async function () {
    await service.userService.createUser({
      email: config.adminEmail,
      password: config.adminPassword,
    });
  })();

  const _router = express.Router();

  const configureMiddlewares = (function (router) {
    router.use(express.static(path.join(__dirname, "../client-app/build")));
    router.use(express.static(config.fileStorePath));
    router.use(bodyParser());
    router.use(cors());
    router.use(hostextension.authMiddleware);
    router.use(service.validationService.validationMiddleware);
    router.use(
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
  })(_router);

  const configureClientAppRoute = function (router) {
    router.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../client-app/build"));
    });
    // Yukarıda belirtilen pointler hariç tüm GET requestleri "/" ya yani React app yönlendirir.
    router.get("*", function (req, res) {
      res.redirect("/");
    });
  };

  const configureRoutes = (function (router) {
    const authRoutes = require("./routes/auth");
    const userRoutes = require("./routes/user");
    const blogPostRoutes = require("./routes/blogPost");
    const workShopRouter = require("./routes/workShop");

    router.use("/api/auth", authRoutes);
    router.use("/api/user", userRoutes);
    router.use("/api/blogPost", blogPostRoutes);
    router.use("/api/workshop", workShopRouter);

    router.get("/checkHealth", async (req, res) =>
      res.status(utils.HttpStatus.OK).send("I'm healthy !")
    );

    router.get("/checkAdminHealth", async (req, res) =>
      res.status(utils.HttpStatus.OK).send("I'm healthy !")
    );

    router.post("/api/sendEmail", async (req, res) => {
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

    router.post("/api/getAllUsersIpAddress", async (req, res) => {
      let ipAddresses = await service.userService.getAllUsersIpAddress();
      res.status(200).send(ipAddresses);
    });

    configureClientAppRoute(router);
  })(_router);

  const app = express()
    .use(_router)
    .listen(3001, () => console.log("serverApp listening on 3000!"));
}

main();
