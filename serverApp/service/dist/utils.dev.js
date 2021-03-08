"use strict";

var _this = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

console.log("utils module reading...");

var getType = function getType(obj) {
  var type = _typeof(obj);

  if (type !== "object") return type;
  if (obj === null) return "null";
  var ctor = obj.constructor;
  var name = typeof ctor === "function" && ctor.name;
  return typeof name === "string" && name.length > 0 ? name : "object";
};

var getDefaultValue = function getDefaultValue(type) {
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
    var ctor = typeof _this[type] === "function" ? _this[type] : eval(type);
    return new ctor();
  } catch (e) {
    return {};
  }
};

var hasDefaultValue = function hasDefaultValue(obj) {
  var objType = getType(obj);
  var defaultValueOfObj = getDefaultValue(objType);
  return obj === defaultValueOfObj;
};

var testRegularExpression = function testRegularExpression(string, regularExpression) {
  return regularExpression.test(String(string).toLowerCase());
};

var createProcessResult = function createProcessResult(isSuccessful) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var processResult = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  return _objectSpread({
    isSuccessful: isSuccessful,
    message: message
  }, processResult);
};

module.exports = function () {
  console.log("utils module exported!");
  return {
    getType: getType,
    getDefaultValue: getDefaultValue,
    hasDefaultValue: hasDefaultValue,
    testRegularExpression: testRegularExpression,
    createProcessResult: createProcessResult
  };
}();