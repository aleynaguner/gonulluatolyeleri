const config = require("../../config");
const validationUtils = require("./validationUtils");
const workshopValidator = require("./validators/workshopValidator");

const validators = {
  WorkshopValidator: workshopValidator,
};

const Schemas = {
  WorkshopValidator: "WorkshopValidator",
};

const validationMiddleware = async (request, response, next) => {
  let validationSchema = config.validationSchemasByEndPoints[request.path];
  if (validationSchema === undefined) await next();
  else {
    let validationResult = Validate({
      schema: validationSchema,
      data: request.body,
    });
    if (!validationResult.isValid) {
      response.status(400).send(validationResult);
    } else {
      await next();
    }
  }
};

const Validate = (context) => {
  let _validator = validators[context.schema];
  if (_validator === undefined) return validationUtils.createValidationResult();
  validationUtils.prepareDataForValidation(context.data);
  return _validator.Validate(context.data);
};

module.exports = { Validate, validationMiddleware };
