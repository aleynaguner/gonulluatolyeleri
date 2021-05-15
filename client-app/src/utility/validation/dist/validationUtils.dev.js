"use strict";

var validator = require("validator");

var ErrorCodes = require("./errorCodes");

var validateName = function validateName(val) {
  var errors = [];
  var spaceControl = val.replace(/ /g, "");

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (!validator.isAlpha(spaceControl, "tr-TR")) {
    errors.push(ErrorCodes.REQUIRED_NONNUMERIC_FORMAT);
  }

  if (!validator.isLength(val, {
    max: 25
  })) {
    errors.push(ErrorCodes.MAX_LENGTH);
  }

  return {
    isValid: errors.length <= 0,
    errors: errors
  };
};

var validateEmail = function validateEmail(val) {
  var errors = [];

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (!validator.isEmail(val)) {
    errors.push(ErrorCodes.REQUIRED_FORMAT_FOR_EMAIL);
  }

  return {
    isValid: errors.length <= 0,
    errors: errors
  };
};

var validatePassword = function validatePassword(val) {
  var errors = [];

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (!validator.isLength(val, {
    min: 8
  })) {
    errors.push(ErrorCodes.MIN_LENGTH);
  }

  return {
    isValid: errors.length <= 0,
    errors: errors
  };
};

var validateDateStringIsValid = function validateDateStringIsValid(val) {
  var errors = [];

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (!checkDateIsFutureDate(val)) {
    errors.push(ErrorCodes.DATE_TIME_MUST_BE_FUTURE_DATE);
  }

  return {
    isValid: errors.length <= 0,
    errors: errors
  };
};

var checkDateIsFutureDate = function checkDateIsFutureDate(dateAsString) {
  var now = new Date().getTime();
  return new Date(dateAsString).getTime() > now;
};

var validateContent = function validateContent(val) {
  var errors = [];

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (!validator.isLength(val, {
    min: 50
  })) {
    errors.push(ErrorCodes.MIN_LENGTH);
  }

  return {
    isValid: errors.length <= 0,
    errors: errors
  };
};

var validateByContext = function validateByContext(context) {
  var validationResult = {
    isSuccess: true,
    errors: {}
  };

  for (var toBeValidatedField in context.data) {
    var validateField = context.rules[toBeValidatedField];
    var fieldValidationResult = validateField(context.data[toBeValidatedField]);

    if (!fieldValidationResult.isValid) {
      validationResult.isSuccess = false;
      validationResult.errors[toBeValidatedField] = fieldValidationResult.errors;
    }
  }

  return validationResult;
};

module.exports = {
  validateName: validateName,
  validateEmail: validateEmail,
  validatePassword: validatePassword,
  validateDateStringIsValid: validateDateStringIsValid,
  validateContent: validateContent,
  validateByContext: validateByContext
};