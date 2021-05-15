"use strict";

var ErrorCodes = require("./validation/errorCodes");

var blogPostValidator = require("./validation/blogPost");

var contactValidator = require("./validation/contact");

var workshopValidator = require("./validation/workshop");

var Validators = {
  BlogPost: blogPostValidator,
  Contact: contactValidator,
  Workshop: workshopValidator
};
var Schemas = {
  BlogPost: "BlogPost",
  Contact: "Contact",
  Workshop: "Workshop"
};

var Validate = function Validate(context) {
  var _validator = Validators[context.schema];
  return _validator.Validate(context.data);
};

module.exports = {
  Validate: Validate,
  Schemas: Schemas,
  ErrorCodes: ErrorCodes
};