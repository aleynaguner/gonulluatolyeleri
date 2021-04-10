const validator = require("validator");

const ErrorCodes = {
  REQUIRED_VALUE: "REQUIRED_VALUE",
  REQUIRED_FORMAT_FOR_EMAIL: "REQUIRED_FORMAT_FOR_EMAIL",
  REQUIRED_NONNUMERIC_FORMAT: "REQUIRED_NONNUMERIC_FORMAT",
  MAX_LENGTH: "MAX_LENGTH",
  MIN_LENGTH: "MIN_LENGTH",
};

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

  return errors;
};

const validateEmail = (val) => {
  let errors = [];

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (!validator.isEmail(val)) {
    errors.push(ErrorCodes.REQUIRED_FORMAT_FOR_EMAIL);
  }

  return errors;
};

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

  return errors;
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

  return errors;
};

const validatePassword = (val) => {
  let errors = [];

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (!validator.isLength(val, { min: 8 })) {
    errors.push(ErrorCodes.MIN_LENGTH);
  }

  return errors;
};

const Validate = (values) => {
  let validationResult = {
    isSuccess: true,
    errors: {},
  };

  for (let prop in values) {
    if (prop === "name") {
      let nameValidationResult = validateName(values[prop]);

      if (nameValidationResult.length > 0) {
        validationResult.isSuccess = false;
        validationResult.errors.name = nameValidationResult;
      }
    }
    if (prop === "email") {
      let emailValidationResult = validateEmail(values[prop]);

      if (emailValidationResult.length > 0) {
        validationResult.isSuccess = false;
        validationResult.errors.email = emailValidationResult;
      }
    }
    if (prop === "topic") {
      let topicValidationResult = validateTopic(values[prop]);

      if (topicValidationResult.length > 0) {
        validationResult.isSuccess = false;
        validationResult.errors.topic = topicValidationResult;
      }
    }
    if (prop === "message") {
      let messageValidationResult = validateMessage(values[prop]);

      if (messageValidationResult.length > 0) {
        validationResult.isSuccess = false;
        validationResult.errors.message = messageValidationResult;
      }
    }
    if (prop === "password") {
      let passwordValidationResult = validatePassword(values[prop]);

      if (passwordValidationResult.length > 0) {
        validationResult.isSuccess = false;
        validationResult.errors.password = passwordValidationResult;
      }
    }
  }

  return validationResult;
};

module.exports = {
  Validate,
  ErrorCodes,
};
