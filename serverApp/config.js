const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  senderUser: process.env.SENDERAUTH_USER,
  senderPass: process.env.SENDERAUTH_PASS,
  receiverUser: process.env.RECEIVER_USER,
  emailService: process.env.EMAIL_SERVICE,
  mongoDBURL: process.env.MONGODB_URL,
};
