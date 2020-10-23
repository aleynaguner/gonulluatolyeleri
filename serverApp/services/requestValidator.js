const validateSendEmail = (reqBody) => {
  if (
    !reqBody.hasOwnProperty("topic") ||
    !reqBody.hasOwnProperty("message")
  ) {
    return false;
  }

  return true;
};

module.exports = { validateSendEmail };
