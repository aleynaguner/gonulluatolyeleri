const validateSendEmail = (reqBody) => {
  if (
    !reqBody.hasOwnProperty("subject") ||
    !reqBody.hasOwnProperty("message")
  ) {
    return false;
  }

  return true;
};

module.exports = { validateSendEmail };
