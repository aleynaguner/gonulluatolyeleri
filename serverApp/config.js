console.log("config module reading...");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (function () {
  console.log("config module exported!");
  return {
    senderUser: process.env.SENDERAUTH_USER,
    senderPass: process.env.SENDERAUTH_PASS,
    receiverUser: process.env.RECEIVER_USER,
    emailService: process.env.EMAIL_SERVICE,
    mongoDBURL: process.env.MONGODB_URL,
    secretKey: process.env.SECRET_KEY,
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
  };
})();
