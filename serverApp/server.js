const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const config = require("./config");

const emailService = require("./services/emailService");
const requestValidator = require("./services/requestValidator");

const router = express.Router();

router.use(bodyParser());
router.use(express.static(path.join(__dirname, "../client-app/build")));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client-app/build"));
});

router.post("/sendEmail", (req, res) => {
  let validationResult = requestValidator.validateSendEmail(req.body);

  if (!validationResult)
    res.status(400).send({
      requestValidation: false,
      message: "Send subject and message information correctly!",
    });
  else {
    let emailServiceResponse = emailService.sendEmail(
      {
        user: config.senderUser,
        pass: config.senderPass,
      },
      config.emailService,
      config.receiverUser,
      req.body.subjet,
      req.body.message
    );

    res.status(200).send({
      isSuccess: emailServiceResponse.isSuccess,
      message: emailServiceResponse.message,
    });
  }
});

const app = express().use(router).listen(3000);
