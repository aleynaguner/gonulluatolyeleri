console.log("utils module reading...");

const getType = (obj) => {
  var type = typeof obj;

  if (type !== "object") return type;
  if (obj === null) return "null";

  var ctor = obj.constructor;
  var name = typeof ctor === "function" && ctor.name;

  return typeof name === "string" && name.length > 0 ? name : "object";
};

const getDefaultValue = (type) => {
  if (typeof type !== "string") throw new TypeError("Type must be a string.");

  switch (type) {
    case "boolean":
      return false;
    case "function":
      return function () {};
    case "null":
      return null;
    case "number":
      return 0;
    case "object":
      return {};
    case "string":
      return "";
    case "symbol":
      return Symbol();
    case "undefined":
      return void 0;
  }

  try {
    var ctor = typeof this[type] === "function" ? this[type] : eval(type);

    return new ctor();
  } catch (e) {
    return {};
  }
};

const hasDefaultValue = (obj) => {
  let objType = getType(obj);

  let defaultValueOfObj = getDefaultValue(objType);

  return obj === defaultValueOfObj;
};

const testRegularExpression = (string, regularExpression) => {
  return regularExpression.test(String(string).toLowerCase());
};

const createProcessResult = (
  isSuccessful,
  message = "",
  processResult = undefined
) => {
  return {
    isSuccessful: isSuccessful,
    message: message,
    ...processResult,
  };
};

const HttpStatus = {
  OK: 200,
};

module.exports = (function () {
  console.log("utils module exported!");
  return {
    getType,
    getDefaultValue,
    hasDefaultValue,
    testRegularExpression,
    createProcessResult,
    HttpStatus,
  };
})();
