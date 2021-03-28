console.log("User module reading...");

class User {
  constructor(email, hashedPassword, token, ipAddress) {
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.token = token;
    this.ipAddress = ipAddress;
  }
}

module.exports = (function () {
  console.log("User module exported!");
  return User;
})();
