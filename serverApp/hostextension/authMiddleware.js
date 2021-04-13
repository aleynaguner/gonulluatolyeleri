console.log("middlewareExtension module reading...");

const jwt = require("jsonwebtoken");
const config = require("../config");
const utils = require("../service/utils");

const authMiddleware = async (request, response, next) => {
  const token = getAuthTokenFromRequest(request);
  const pathToBeVerified =
    utils.hasDefaultValue(token) &&
    !config.pathsToBeVerified.includes(request.path);

  if (pathToBeVerified) {
    await next();
    return;
  }

  await jwt.verify(token, config.secretKey, async (error, decoded) => {
    if (error) response.status(401).send();
    else {
      request.decode = decoded;
      await next();
    }
  });
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
