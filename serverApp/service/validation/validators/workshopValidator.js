const validator = require("validator");
const validationUtils = require("../validationUtils");
const utils = require("../../../utilities/utils");
const validationErrorCodes = require("../validationErrorCodes");
const modelConstants = require("../../../model/model").Contants.WorkShop;

const validateName = (name) => {
  if (utils.hasDefaultValue(name))
    return validationUtils.createUnsuccessfulValidationResult(
      validationErrorCodes.REQUIRED_VALUE
    );
  if (!validator.isLength(name, { min: 5 }))
    return validationUtils.createUnsuccessfulValidationResult(
      validationErrorCodes.MIN_CHAR_LENGTH
    );
  return validationUtils.createValidationResult();
};
const validateContent = (content) => {
  if (utils.hasDefaultValue(content))
    return validationUtils.createUnsuccessfulValidationResult(
      validationErrorCodes.REQUIRED_VALUE
    );
  if (!validator.isLength(content, { min: 10 }))
    return validationUtils.createUnsuccessfulValidationResult(
      validationErrorCodes.MIN_CHAR_LENGTH
    );
  return validationUtils.createValidationResult();
};
const validateCategory = (category) => {
  if (utils.hasDefaultValue(category))
    return validationUtils.createUnsuccessfulValidationResult(
      validationErrorCodes.REQUIRED_VALUE
    );
  if (!validator.isLength(category, { min: 5 }))
    return validationUtils.createUnsuccessfulValidationResult(
      validationErrorCodes.MIN_CHAR_LENGTH
    );
  return validationUtils.createValidationResult();
};
const validateApplicationDeadline = (applicationDeadline) => {
  return validationUtils.checkDateStringIsValid(applicationDeadline);
};
const validateWorkshopDate = (workshopDate) => {
  return validationUtils.checkDateStringIsValid(workshopDate);
};
const validateLocation = (location) => {
  if (utils.hasDefaultValue(location))
    return validationUtils.createUnsuccessfulValidationResult(
      validationErrorCodes.REQUIRED_VALUE
    );
  if (!validator.isLength(location, { min: 5 }))
    return validationUtils.createUnsuccessfulValidationResult(
      validationErrorCodes.MIN_CHAR_LENGTH
    );
  return validationUtils.createValidationResult();
};
const validateResponsibles = (responsibles) => {
  for (let responsible of responsibles) {
    let nameValidationResult = validateName(responsible.name);
    if (!nameValidationResult.isValid) return nameValidationResult;

    let emailValidationResult =
      !utils.hasDefaultValue(responsible.email) &&
      validationUtils.validateEmail(responsible.email);
    if (!emailValidationResult.isValid) return emailValidationResult;

    let isRoleValid = modelConstants.ResponsibleRoles.hasOwnProperty(
      responsible.role.toUpperCase()
    );
    if (!isRoleValid) {
      return validationUtils.createValidationResult(
        false,
        validationErrorCodes.INVALID_VALUE,
        "responsible.role"
      );
    }
  }
  return validationUtils.createValidationResult();
};

const Validate = (data) => {
  const validationContext = validationUtils.createValidationContext(data, {
    name: validateName,
    content: validateContent,
    category: validateCategory,
    applicationDeadline: validateApplicationDeadline,
    workshopDate: validateWorkshopDate,
    location: validateLocation,
    responsibles: validateResponsibles,
  });
  return validationUtils.validateByContext(validationContext);
};

module.exports = { Validate };
