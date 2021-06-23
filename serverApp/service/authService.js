console.log("authService module reading...");

const utils = require("../utilities/utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const _regularExpressionToCheckEmailRules = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// min 8 letter password, with at least a symbol, upper and lower case letters and a number
const _regularExpressionToCheckPasswordRules = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

class AuthService {
  _checkValueIsDefault = (userModel) => {
    let validationResult = { isValid: false };

    if (utils.hasDefaultValue(userModel.email)) {
      validationResult.message = "EMAIL_HAS_DEFAULT_VALUE";
    } else if (utils.hasDefaultValue(userModel.password)) {
      validationResult.message = "PASSWORD_HAS_DEFAULT_VALUE";
    } else {
      validationResult.isValid = true;
    }

    return validationResult;
  };

  _checkEmailForm = (userModel) => {
    let stringIsEmail = utils.testRegularExpression(
      userModel.email,
      _regularExpressionToCheckEmailRules
    );

    return {
      isValid: stringIsEmail,
      message: !stringIsEmail ? "STRING_IS_NOT_IN_EMAIL_FROM" : "",
    };
  };

  _checkPasswordForm = (userModel) => {
    let passwordIsValidByExpressionRules = utils.testRegularExpression(
      userModel.password,
      _regularExpressionToCheckPasswordRules
    );

    return {
      isValid: passwordIsValidByExpressionRules,
      message: !passwordIsValidByExpressionRules
        ? "PASSWORD_IS_NOT_STRONG"
        : "",
    };
  };

  _userModelValidationRules = [
    this._checkValueIsDefault,
    this._checkEmailForm,
    // this._checkPasswordForm,
  ];

  constructor(authContext) {
    this.userService = authContext.userService;
    this.secretKey = authContext.secretKey;
  }

  login = async (submittedUserInfo) => {
    let userModelValidationResult = this._validateUserModel(submittedUserInfo);
    if (!userModelValidationResult.isValid) {
      return utils.createProcessResult(
        false,
        userModelValidationResult.message
      );
    }

    let submittedUserInfoVerificationResult = await this._verifySubmittedUserInfo(
      submittedUserInfo
    );
    if (!submittedUserInfoVerificationResult.isSuccessful)
      return submittedUserInfoVerificationResult;

    submittedUserInfo = submittedUserInfoVerificationResult.user;

    let token = this._createToken(submittedUserInfo);
    await this.userService.updateTokenByEmail(submittedUserInfo.email, token);

    return utils.createProcessResult(true, "TokenCreatedSuccessfully", {
      token: token,
    });
  };

  _verifySubmittedUserInfo = async (submittedUserInfo) => {
    let user = await this.userService.getUserByEmail(submittedUserInfo.email);
    if (utils.hasDefaultValue(user)) {
      return utils.createProcessResult(false, "NoUserExistsHasThisUsername");
    }

    let isPasswordValid = await this._verifyPassword(
      submittedUserInfo.password,
      user.hashedPassword
    );
    if (!isPasswordValid) {
      return utils.createProcessResult(false, "PasswordIsNotCorrect");
    }

    return utils.createProcessResult(true, "", { user: user });
  };

  _verifyPassword = async (checkedPassword, encryptedReferencePassword) => {
    return await bcrypt.compare(checkedPassword, encryptedReferencePassword);
  };

  _createToken = (user) => {
    const createdToken = jwt.sign(
      this._getTokenPayloadInfo(user),
      this.secretKey,
      {
        expiresIn: "12h",
      }
    );

    return createdToken;
  };

  _getTokenPayloadInfo = (user) => {
    return {
      id: user._id,
      email: user.email,
      ipAddress: user.ipAddress,
    };
  };

  _validateUserModel = (userModel) => {
    let result = {
      isValid: true,
      message: "",
    };

    this._userModelValidationRules.forEach((rule) => {
      result = rule(userModel);

      if (!result.isValid) return;
    });

    return result;
  };
}

module.exports = (function () {
  console.log("authService exported!");

  return AuthService;
})();
