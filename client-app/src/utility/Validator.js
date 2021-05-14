const ErrorCodes = require("./validation/errorCodes");
const blogPostValidator = require("./validation/blogPost");
const contactValidator = require("./validation/contact");

const Validators = {
  BlogPost: blogPostValidator,
  Contact: contactValidator,
};

const Schemas = {
  BlogPost: "BlogPost",
  Contact: "Contact",
};

const Validate = (context) => {
  let _validator = Validators[context.schema];
  return _validator.Validate(context.data);
};

module.exports = {
  Validate,
  Schemas,
  ErrorCodes,
};
