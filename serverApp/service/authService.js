const userService = require("./service").UserService;
const utils = require("./service").utils;

const RegularExpressionToCheckEmailRules = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// min 8 letter password, with at least a symbol, upper and lower case letters and a number
const RegularExpressionToCheckPasswordRules = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const Login = (user) => {
  let userModelValidationResult = validateUserModel(user);
  if (!userModelValidationResult.isValid) {
    return { isSuccessful: false, message: userModelValidationResult.message };
  }
};

const userModelValidationRules = [
  checkValueIsDefault,
  checkEmailForm,
  checkPasswordForm,
];
const validateUserModel = (userModel) => {
  let result = {
    isValid: true,
    message: "",
  };

  userModelValidationRules.forEach((rule) => {
    result = rule(userModel);

    if (!result.isValid) return;
  });

  return result;
};

const checkValueIsDefault = (userModel) => {
  let validationResult = { isValid: false };

  if (utils.HasDefaultValue(userModel.email)) {
    result.message = "EMAIL_HAS_DEFAULT_VALUE";
  } else if (utils.HasDefaultValue(userModel.password)) {
    result.message = "PASSWORD_HAS_DEFAULT_VALUE";
  } else {
    result.isValid = true;
  }

  return validationResult;
};

const checkEmailForm = (userModel) => {
  let stringIsEmail = utils.TestRegularExpression(
    userModel.email,
    RegularExpressionToCheckEmailRules
  );

  return {
    isValid: stringIsEmail,
    message: !stringIsEmail ? "STRING_IS_NOT_IN_EMAIL_FROM" : "",
  };
};

const checkPasswordForm = (userModel) => {
  let passwordIsValidByExpressionRules = utils.TestRegularExpression(
    userModel.password,
    RegularExpressionToCheckPasswordRules
  );

  return {
    isValid: passwordIsValidByExpressionRules,
    message: !passwordIsValidByExpressionRules ? "PASSWORD_IS_NOT_STRONG" : "",
  };
};
