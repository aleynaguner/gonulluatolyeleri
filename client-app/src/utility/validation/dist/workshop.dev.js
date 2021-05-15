"use strict";

var validationUtils = require("./validationUtils");

var validator = require("validator");

var ErrorCodes = require("./errorCodes");

var validateContent = function validateContent(val) {
  var errors = [];

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (!validator.isLength(val, {
    min: 20
  })) {
    errors.push(ErrorCodes.MIN_LENGTH);
  }

  return {
    isValid: errors.length <= 0,
    errors: errors
  };
};

var Validate = function Validate(data) {
  return validationUtils.validateByContext({
    data: data,
    rules: {
      name: validationUtils.validateName,
      category: validationUtils.validateName,
      location: validationUtils.validateName,
      content: validateContent,
      applicationDeadline: validationUtils.validateDateStringIsValid,
      workshopDate: validationUtils.validateDateStringIsValid
    }
  });
};

module.exports = {
  Validate: Validate
};