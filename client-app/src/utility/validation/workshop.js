const validationUtils = require("./validationUtils");
const validator = require("validator");
const ErrorCodes = require("./errorCodes");

const validateContent = (val) => {
  let errors = [];
  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }
  if (!validator.isLength(val, { min: 20 })) {
    errors.push(ErrorCodes.MIN_LENGTH);
  }
  return { isValid: errors.length <= 0, errors };
};

const Validate = (data) =>
  validationUtils.validateByContext({
    data: data,
    rules: {
      name: validationUtils.validateName,
      category: validationUtils.validateName,
      location: validationUtils.validateName,
      content: validateContent,
      applicationDeadline: validationUtils.validateDateStringIsValid,
      workshopDate: validationUtils.validateDateStringIsValid,
    },
  });

module.exports = { Validate };
