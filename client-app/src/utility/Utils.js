export const getType = (obj) => {
  var type = typeof obj;

  if (type !== "object") return type;
  if (obj === null) return "null";

  var ctor = obj.constructor;
  var name = typeof ctor === "function" && ctor.name;

  return typeof name === "string" && name.length > 0 ? name : "object";
};

export const getDefaultValue = (type) => {
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

export const hasDefaultValue = (obj) => {
  let objType = getType(obj);

  let defaultValueOfObj = getDefaultValue(objType);

  return obj === defaultValueOfObj;
};

export const testRegularExpression = (string, regularExpression) => {
  return regularExpression.test(String(string).toLowerCase());
};

export const createProcessResult = (
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

export const formatByDynamicValueIfExist = (completeString, dynamicVal) => {
  if (completeString.includes("${DYNAMIC}")) {
    completeString = completeString.replace("${DYNAMIC}", dynamicVal);
  }
  return completeString;
};

export const Constants = {
  HttpMethods: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  },
  DefaultValues: {
    String: "",
  },
  UserRole: {
    User: "User",
    Admin: "Admin",
  },
};
