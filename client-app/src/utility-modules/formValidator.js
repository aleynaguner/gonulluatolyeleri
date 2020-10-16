const validator = require("validator");

const errorCodes = {
  REQUIRED_VALUE_FOR_NAME: "REQUIRED_VALUE_FOR_NAME",
  REQUIRED_VALUE_FOR_EMAIL: "REQUIRED_VALUE_FOR_EMAIL",
  REQUIRED_VALUE_FOR_TOPIC: "REQUIRED_VALUE_FOR_TOPIC",
  REQUIRED_VALUE_FOR_MESSAGE: "REQUIRED_VALUE_FOR_MESSAGE",
  REQUIRED_FORMAT_FOR_EMAIL: "REQUIRED_FORMAT_FOR_EMAIL",
  REQUIRED_NONNUMERIC_FORMAT: "REQUIRED_NONNUMERIC_FORMAT",
};

const validate = (values) => {
  let validationResult = {
    isSuccess: true,
    errors: {},
  };

  for (let prop in values) {
    if (prop == "name") {
      let nameValidationResult = validateName(values[prop]);

      if (nameValidationResult.length > 0) {
        validationResult.isSuccess = false;
        validationResult.errors.name = nameValidationResult;
      }
    }
    if (prop == "email") {
      let emailValidationResult = validateEmail(values[prop]);

      if (emailValidationResult.length > 0) {
        validationResult.isSuccess = false;
        validationResult.errors.email = emailValidationResult;
      }
    }
    if (prop == "topic") {
      let topicValidationResult = validateTopic(values[prop]);

      if (topicValidationResult.length > 0) {
        validationResult.isSuccess = false;
        validationResult.errors.topic = topicValidationResult;
      }
    }
    if (prop == "message") {
      let messageValidationResult = validateMessage(values[prop]);

      if (messageValidationResult.length > 0) {
        validationResult.isSuccess = false;
        validationResult.errors.message = messageValidationResult;
      }
    }
  }

  return validationResult;
};

const validateName = (val) => {
  let errors = [];

  if (validator.isEmpty(val)) {
    errors.push(errorCodes.REQUIRED_VALUE_FOR_NAME);
  }

  return errors;
};

const validateEmail = (val) => {
  let errors = [];

  if (validator.isEmpty(val)) {
    errors.push(errorCodes.REQUIRED_VALUE_FOR_EMAIL);
  }

  if(validator.isEmail(val)){
    errors.push(errorCodes.REQUIRED_FORMAT_FOR_EMAIL);
  }

  return errors;
};

const validateTopic = (val) =>  {
  let errors = [];

  if (validator.isEmpty(val)) {
    errors.push(errorCodes.REQUIRED_VALUE_FOR_TOPIC);
  }

  return errors;
};

const validateMessage = (val) =>  {
  let errors = [];

  if (validator.isEmpty(val)) {
    errors.push(errorCodes.REQUIRED_VALUE_FOR_MESSAGE);
  }

  return errors;
};

module.exports = {
  validate,
  errorCodes,
};
