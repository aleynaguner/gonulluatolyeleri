"use strict";

var validator = require("validator");

var ErrorCodes = {
  REQUIRED_VALUE: "REQUIRED_VALUE",
  REQUIRED_FORMAT_FOR_EMAIL: "REQUIRED_FORMAT_FOR_EMAIL",
  REQUIRED_NONNUMERIC_FORMAT: "REQUIRED_NONNUMERIC_FORMAT",
  MAX_LENGTH: "MAX_LENGTH",
  MIN_LENGTH: "MIN_LENGTH"
};

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

  return errors;
};

var validateEmail = function validateEmail(val) {
  var errors = [];

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (!validator.isEmail(val)) {
    errors.push(ErrorCodes.REQUIRED_FORMAT_FOR_EMAIL);
  }

  return errors;
};

var validateTopic = function validateTopic(val) {
  var errors = [];
  var spaceControl = val.replace(/ /g, "");

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (!validator.isAlphanumeric(spaceControl, "tr-TR")) {
    errors.push(ErrorCodes.REQUIRED_NONNUMERIC_FORMAT);
  }

  if (validator.isNumeric(val)) {
    errors.push(ErrorCodes.REQUIRED_NONNUMERIC_FORMAT);
  }

  if (!validator.isLength(val, {
    max: 25
  })) {
    errors.push(ErrorCodes.MAX_LENGTH);
  }

  return errors;
};

var validateMessage = function validateMessage(val) {
  var errors = [];

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (validator.isNumeric(val)) {
    errors.push(ErrorCodes.REQUIRED_NONNUMERIC_FORMAT);
  }

  if (!validator.isLength(val, {
    max: 350
  })) {
    errors.push(ErrorCodes.MAX_LENGTH);
  }

  return errors;
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

  return errors;
};

var validatePostContent = function validatePostContent(val) {
  var errors = [];

  if (validator.isEmpty(val)) {
    errors.push(ErrorCodes.REQUIRED_VALUE);
  }

  if (!validator.isLength(val, {
    min: 50
  })) {
    errors.push(ErrorCodes.MIN_LENGTH);
  }

  return errors;
};

var Validate = function Validate(values) {
  var validationResult = {
    isSuccess: true,
    errors: {}
  };

  for (var prop in values) {
    if (prop === "name") {
      var nameValidationResult = validateName(values[prop]);

      if (nameValidationResult.length > 0) {
        validationResult.isSuccess = false;
        validationResult.errors.name = nameValidationResult;
      }
    }

    if (prop === "email") {
      var emailValidationResult = validateEmail(values[prop]);

      if (emailValidationResult.length > 0) {
        validationResult.isSuccess = false;
        validationResult.errors.email = emailValidationResult;
      }
    }

    if (prop === "topic") {
      var topicValidationResult = validateTopic(values[prop]);

      if (topicValidationResult.length > 0) {
        validationResult.isSuccess = false;
        validationResult.errors.topic = topicValidationResult;
      }
    }

    if (prop === "message") {
      var messageValidationResult = validateMessage(values[prop]);

      if (messageValidationResult.length > 0) {
        validationResult.isSuccess = false;
        validationResult.errors.message = messageValidationResult;
      }
    }

    if (prop === "password") {
      var passwordValidationResult = validatePassword(values[prop]);

      if (passwordValidationResult.length > 0) {
        validationResult.isSuccess = false;
        validationResult.errors.password = passwordValidationResult;
      }
    }
  }

  return validationResult;
};

var Post = {
  Validate: function Validate(values) {
    var validationResult = {
      isSuccess: true,
      errors: {}
    };

    for (var prop in values) {
      if (prop === "firstName") {
        var nameValidationResult = validateName(values[prop]);

        if (nameValidationResult.length > 0) {
          validationResult.isSuccess = false;
          validationResult.errors.firstName = nameValidationResult;
        }
      } else if (prop === "lastName") {
        var _nameValidationResult = validateName(values[prop]);

        if (_nameValidationResult.length > 0) {
          validationResult.isSuccess = false;
          validationResult.errors.lastName = _nameValidationResult;
        }
      } else if (prop === "email") {
        var emailValidationResult = validateEmail(values[prop]);

        if (emailValidationResult.length > 0) {
          validationResult.isSuccess = false;
          validationResult.errors.email = emailValidationResult;
        }
      } else if (prop === "header") {
        var headerValidationResult = validateName(values[prop]);

        if (headerValidationResult.length > 0) {
          validationResult.isSuccess = false;
          validationResult.errors.header = headerValidationResult;
        }
      } else if (prop === "content") {
        var contentValidationResult = validatePostContent(values[prop]);

        if (contentValidationResult.length > 0) {
          validationResult.isSuccess = false;
          validationResult.errors.content = contentValidationResult;
        }
      }
    }

    return validationResult;
  }
};
module.exports = {
  Validate: Validate,
  Post: Post,
  ErrorCodes: ErrorCodes
};