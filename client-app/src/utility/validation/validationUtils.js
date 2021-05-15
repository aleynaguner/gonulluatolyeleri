const validator = require("validator");
const ErrorCodes = require("./errorCodes");

const validateName = (val) => {
  let errors = [];

  let spaceControl = val.replace(/ /g, "");
  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }
  if (!validator.isAlpha(spaceControl, "tr-TR")) {
    errors.push(ErrorCodes.REQUIRED_NONNUMERIC_FORMAT);
  }
  if (!validator.isLength(val, { max: 25 })) {
    errors.push(ErrorCodes.MAX_LENGTH);
  }

  return { isValid: errors.length <= 0, errors };
};

const validateEmail = (val) => {
  let errors = [];

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (!validator.isEmail(val)) {
    errors.push(ErrorCodes.REQUIRED_FORMAT_FOR_EMAIL);
  }

  return { isValid: errors.length <= 0, errors };
};

const validatePassword = (val) => {
  let errors = [];

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (!validator.isLength(val, { min: 8 })) {
    errors.push(ErrorCodes.MIN_LENGTH);
  }

  return { isValid: errors.length <= 0, errors };
};

const validateContent = (val) => {
  let errors = [];

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (!validator.isLength(val, { min: 50 })) {
    errors.push(ErrorCodes.MIN_LENGTH);
  }

  return { isValid: errors.length <= 0, errors };
};

const validateByContext = (context) => {
  let validationResult = {
    isSuccess: true,
    errors: {},
  };
  for (let toBeValidatedField in context.data) {
    let validateField = context.rules[toBeValidatedField];
    let fieldValidationResult = validateField(context.data[toBeValidatedField]);
    if (!fieldValidationResult.isValid) {
      validationResult.isSuccess = false;
      validationResult.errors[toBeValidatedField] =
        fieldValidationResult.errors;
    }
  }
  return validationResult;
};

module.exports = {
  validateName: validateName,
  validateEmail: validateEmail,
  validatePassword: validatePassword,
  validateContent: validateContent,
  validateByContext: validateByContext,
};
