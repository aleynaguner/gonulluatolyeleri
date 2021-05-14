const validationUtils = require("./validationUtils");

const Validate = (data) =>
  validationUtils.validateByContext({
    data: data,
    rules: {
      firstName: validationUtils.validateName,
      lastName: validationUtils.validateName,
      email: validationUtils.validateEmail,
      header: validationUtils.validateName,
      content: validationUtils.validateContent,
    },
  });

module.exports = { Validate };
