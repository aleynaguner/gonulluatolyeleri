"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createFromValuesUpdater = function createFromValuesUpdater(componentReferrer) {
  return function (e) {
    var _this = this;

    var updatedFormValueName = e.target.name.toString();
    var updateFormValue = e.target.value;
    this.setState(function (state) {
      return _objectSpread({}, state, _defineProperty({}, updatedFormValueName, _objectSpread({}, state[updatedFormValueName], {
        value: updateFormValue
      })));
    }, function () {
      return console.log(_this.state);
    });
  }.bind(componentReferrer);
};

var createStateCleaner = function createStateCleaner(componentReferrer, initalState) {
  var extraJobs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  // TO-DO
  return function () {
    if (extraJobs !== undefined) {
      extraJobs();
    }
  }.bind(componentReferrer);
};

var createStateHandlerByErroneousState = function createStateHandlerByErroneousState(componentReferrer) {
  return function (erroneousData, notProcesseds) {
    var _this2 = this;

    var _loop = function _loop(data) {
      if (notProcesseds.includes(data)) return "continue";
      var dataIsErroneous = erroneousData.hasOwnProperty(data);

      if (dataIsErroneous) {
        _this2.setState(_defineProperty({}, data, {
          value: "",
          erroneous: true,
          errorCode: erroneousData[data][0]
        }));
      } else {
        _this2.setState(function (state) {
          return _defineProperty({}, data, _objectSpread({}, state[data], {
            erroneous: false,
            errorCode: ""
          }));
        });
      }
    };

    for (var data in this.state) {
      var _ret = _loop(data);

      if (_ret === "continue") continue;
    }
  }.bind(componentReferrer);
};

var FormManagement = {
  createFromValuesUpdater: createFromValuesUpdater,
  createStateHandlerByErroneousState: createStateHandlerByErroneousState
};
module.exports = {
  FormManagement: FormManagement
};