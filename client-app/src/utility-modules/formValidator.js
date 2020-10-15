const validator = require("validator");

const errorCodes = {
  REQUIRED_VALUE: "REQUIRED_VALUE",
  CONTAINS_NUMERIC: "CONTAINS_NUMERIC",
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
  }

  debugger;
  return validationResult;
};

const validateName = (val) => {
  let errors = [];

  if (validator.isEmpty(val)) {
    errors.push(errorCodes.REQUIRED_VALUE);
  }
  if (validator.isAlpha(val, ["tr-TR"])) {
    errors.push(errorCodes.CONTAINS_NUMERIC);
  }

  return errors;
};

const validateEmail = (val) => validator.isEmpty(val) && validator.isEmail(val);

const validateTopic = (val) => validator.isEmpty(val);

const validateMessage = (val) => validator.isEmpty(val);

module.exports = {
  validate,
  errorCodes,
};
