const validator = require("validator");
const utils = require("../utils");
const validationErrorCodes = require("./validationErrorCodes");

const createValidationResult = (
  isValid = true,
  validationErrorCode = "",
  invalidField = ""
) => {
  return {
    isValid: isValid,
    validationErrorCode: validationErrorCode,
    invalidField: invalidField,
  };
};

const createUnsuccessfulValidationResult = (validationErrorCode) =>
  createValidationResult(false, validationErrorCode);

const checkDateStringIsValid = (dateString) => {
  if (utils.hasDefaultValue(dateString))
    return createUnsuccessfulValidationResult(
      validationErrorCodes.REQUIRED_VALUE
    );
  if (!validator.isDate(dateString))
    return createUnsuccessfulValidationResult(
      validationErrorCodes.MUST_BE_DATE_VALUE
    );
  if (!checkDateIsFutureDate(dateString))
    return createUnsuccessfulValidationResult(
      validationErrorCodes.DATE_TIME_MUST_BE_FUTURE_DATE
    );
  return createValidationResult();
};

const checkDateIsFutureDate = (dateAsString) => {
  let now = new Date().getTime();
  return new Date(dateAsString).getTime() > now;
};

const validateEmail = (email) => {
  if (!validator.isEmail(email))
    return createUnsuccessfulValidationResult(
      validationErrorCodes.INVALID_EMAIL_VALUE
    );
  return createValidationResult();
};

const prepareDataForValidation = (data) => {
  for (let field in data) {
    if (utils.getType(data[field]) === "string") {
      data[field] = data[field].trim();
    }
  }
};

const createValidationContext = (data, rules) => {
  return { data: data, rules: rules };
};

const validateByContext = (context) => {
  let validationResult = createValidationResult();
  for (let toBeValidatedField in context.data) {
    let validateField = context.rules[toBeValidatedField];
    let fieldValidationResult = validateField(context.data[toBeValidatedField]);
    if (!fieldValidationResult.isValid) {
      validationResult = createValidationResult(
        false,
        fieldValidationResult.validationErrorCode,
        !utils.hasDefaultValue(fieldValidationResult.invalidField)
          ? fieldValidationResult.invalidField
          : toBeValidatedField
      );
      break;
    }
  }
  return validationResult;
};

module.exports = {
  createValidationResult: createValidationResult,
  createUnsuccessfulValidationResult: createUnsuccessfulValidationResult,
  checkDateStringIsValid: checkDateStringIsValid,
  validateEmail: validateEmail,
  prepareDataForValidation: prepareDataForValidation,
  createValidationContext: createValidationContext,
  validateByContext: validateByContext,
};
