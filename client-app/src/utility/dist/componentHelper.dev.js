"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Constants = require("../utility/Utils").Constants;

var config = require("../config.json");

var createFromValuesUpdater = function createFromValuesUpdater(componentReferrer) {
  return function (e) {
    var updatedFormValueName = e.target.name.toString();
    var updateFormValue = e.target.value;
    this.setState(function (state) {
      return _objectSpread({}, state, _defineProperty({}, updatedFormValueName, _objectSpread({}, state[updatedFormValueName], {
        value: updateFormValue
      })));
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

var createFormDataUpdaterByErroneousState = function createFormDataUpdaterByErroneousState(componentReferrer) {
  return function (erroneousData, notProcesseds) {
    var _this = this;

    var _loop = function _loop(data) {
      if (notProcesseds.includes(data)) return "continue";
      var dataIsErroneous = erroneousData.hasOwnProperty(data);

      if (dataIsErroneous) {
        _this.setState(_defineProperty({}, data, {
          value: "",
          erroneous: true,
          errorCode: erroneousData[data][0]
        }));
      } else {
        _this.setState(function (state) {
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

var createListDataLoader = function createListDataLoader(context) {
  return function _callee() {
    var _this$setState2;

    var data, getResponse;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            this.setState({
              loading: true
            });
            getResponse = {};
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap(this.context.Services.RequestSender.AwaitableSendRequest(Constants.HttpMethods.GET, config.EndPoints[context.getDataEndpointKey]));

          case 5:
            getResponse = _context.sent;
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            console.error("error", _context.t0);
            getResponse.isSuccess = false;

          case 12:
            _context.prev = 12;
            console.log(getResponse);
            data = getResponse.isSuccess ? getResponse.responseData : [];
            return _context.finish(12);

          case 16:
            this.setState((_this$setState2 = {}, _defineProperty(_this$setState2, context.listStatePropName, data), _defineProperty(_this$setState2, "loading", false), _this$setState2));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, null, this, [[2, 8, 12, 16]]);
  }.bind(context.componentReferrer);
};

var FormManagement = {
  createFromValuesUpdater: createFromValuesUpdater,
  createFormDataUpdaterByErroneousState: createFormDataUpdaterByErroneousState
};
module.exports = {
  FormManagement: FormManagement,
  createListDataLoader: createListDataLoader
};