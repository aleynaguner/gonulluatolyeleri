console.log("middlewareExtension module reading...");

const jwt = require("jsonwebtoken");
const config = require("../config");

const authMiddleware = (request, response, next) => {
  const token = getAuthTokenFromRequest(request);

  if (!token) response.status(401).send();
  else {
    jwt.verify(token, config.secretKey, (error, decoded) => {
      if (error) response.status(401).send();
      else {
        request.decode = decoded;
        next();
      }
    });
  }
};

const getAuthTokenFromRequest = (request) => {
  return (
    getBearerTokenFromRequestHeader(request.headers) ||
    request.body.token ||
    request.query.token
  );
};

const getBearerTokenFromRequestHeader = (header) => {
  if (header.authorization && header.authorization.split(" ")[0] === "Bearer") {
    return header.authorization.split(" ")[1];
  }
};

module.exports = (function () {
  console.log("middlewareExtension module exported!");
  return {
    authMiddleware: authMiddleware,
  };
})();
