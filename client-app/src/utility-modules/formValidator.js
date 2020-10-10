const validator = require("validator");

const validate = (values) => {
  let validationResult = [];

  for (let prop in values) {
    if (prop == "name") {
      if (!validateName(values[prop])) {
        validationResult.push(prop);
      }
    } else if (prop == "email") {
      if (!validateEmail(values[prop])) {
        validationResult.push(prop);
      }
    } else if (prop == "topic") {
      if (!validateTopic(values[prop])) {
        validationResult.push(prop);
      }
    } else if (prop == "message") {
      if (!validateMessage(values[prop])) {
        validationResult.push(prop);
      }
    }
  }

  return validationResult;
};

const validateName = (val) =>
  validator.isEmpty(val) && validator.isAlpha(val, ["tr-TR"]);

const validateEmail = (val) => validator.isEmpty(val) && validator.isEmail(val);

const validateTopic = (val) => validator.isEmpty(val);

const validateMessage = (val) => validator.isEmpty(val);

module.exports = {
  validate,
};
