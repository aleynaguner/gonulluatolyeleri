console.log("config module reading...");
const PATHS_TO_BE_VERIFIED = ["/checkAdminHealth", "/api/user/createUser"];

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "/.env") });

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
    gonulluAtolyeleriDbName: process.env.GONULLU_ATOLYELERI_DB_NAME,
    pathsToBeVerified: PATHS_TO_BE_VERIFIED,
    fileStorePath: path.join(__dirname, "./filestore"),
  };
})();
