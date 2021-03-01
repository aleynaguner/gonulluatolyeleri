const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
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

module.exports = router;
