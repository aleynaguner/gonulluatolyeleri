const validator = require("validator");
const validationUtils = require("./validationUtils");
const ErrorCodes = require("./errorCodes");

const validateTopic = (val) => {
  let errors = [];

  let spaceControl = val.replace(/ /g, "");

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (!validator.isAlphanumeric(spaceControl, "tr-TR")) {
    errors.push(ErrorCodes.REQUIRED_NONNUMERIC_FORMAT);
  }

  if (validator.isNumeric(val)) {
    errors.push(ErrorCodes.REQUIRED_NONNUMERIC_FORMAT);
  }

  if (!validator.isLength(val, { max: 25 })) {
    errors.push(ErrorCodes.MAX_LENGTH);
  }

  return { isValid: errors.length <= 0, errors };
};

const validateMessage = (val) => {
  let errors = [];

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (validator.isNumeric(val)) {
    errors.push(ErrorCodes.REQUIRED_NONNUMERIC_FORMAT);
  }

  if (!validator.isLength(val, { max: 350 })) {
    errors.push(ErrorCodes.MAX_LENGTH);
  }

  return { isValid: errors.length <= 0, errors };
};

const Validate = (data) =>
  validationUtils.validateByContext({
    data: data,
    rules: {
      name: validationUtils.validateName,
      email: validationUtils.validateEmail,
      topic: validateTopic,
      message: validateMessage,
    },
  });

module.exports = { Validate };
