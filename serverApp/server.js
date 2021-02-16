const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const modelsValidator = require("models-validator");
const model = require("./model/model");

const config = require("./config");

const emailService = require("./service/emailService");

const router = express.Router();

router.use(bodyParser());
router.use(express.static(path.join(__dirname, "../client-app/build")));
router.use(
  modelsValidator.modelValidatorMiddleware({
    "/api/sendEmail": modelsValidator.createModel(
      model.emailSendModel.modelName,
      model.emailSendModel.model
    ),
  })
);

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client-app/build"));
});

router.post("/api/sendEmail", async (req, res) => {
  let emailServiceResponse = await emailService.sendEmail(
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

// Yukarıda belirtilen pointler hariç tüm GET requestleri "/" ya yani React app yönlendirir.
router.get("*", function (req, res) {
  res.redirect("/");
});

const app = express().use(router).listen(3000);
