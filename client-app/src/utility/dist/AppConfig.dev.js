"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppConfig = exports.ConfigureAppAsPromise = exports.ConfigureAppAsAwaitable = void 0;

var _react = _interopRequireDefault(require("react"));

var _config = _interopRequireDefault(require("../config.json"));

var _HttpRequestSender = require("./HttpRequestSender");

var _Utils = require("./Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FormValidator = require("./FormValidator"); //#region Global instances


var RequestSender = new _HttpRequestSender.HttpRequestSender(_config["default"]["BASE_URL"]); //#endregion
//#region Private methods

var clientInfo = undefined;

var getClientInfo = function getClientInfo() {
  var clientLocationInfo;
  return regeneratorRuntime.async(function getClientInfo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(clientInfo === undefined)) {
            _context.next = 9;
            break;
          }

          clientInfo = {};
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _HttpRequestSender.SendRequest)(_Utils.Constants.HttpMethods.GET, confi["CLIENT_INFO_API"]));

        case 4:
          clientLocationInfo = _context.sent;
          clientInfo = clientLocationInfo.responseData;
          return _context.abrupt("return", clientInfo);

        case 9:
          return _context.abrupt("return", clientInfo);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getDefaultConfiguration = function getDefaultConfiguration() {
  return {
    Config: _config["default"],
    ClientInfo: undefined,
    AuthorityInfo: {
      Role: _Utils.Constants.UserRole.User
    },
    Dictionary: {},
    Services: {
      RequestSender: RequestSender,
      FormValidator: FormValidator,
      SendRequest: _HttpRequestSender.SendRequest
    }
  };
};

var getAuthorityInfoByResponseData = function getAuthorityInfoByResponseData(responseData) {
  var userIsAnonymous = responseData.isAnonymous;
  return {
    Role: userIsAnonymous ? _Utils.Constants.UserRole.User : _Utils.Constants.UserRole.Admin,
    Email: !userIsAnonymous ? responseData.email : _Utils.Constants.DefaultValues.String,
    IpAddress: !userIsAnonymous ? responseData.ipAddress : _Utils.Constants.DefaultValues.String
  };
};

var getAuthorityInfo = function getAuthorityInfo(clientToken) {
  var getAuthorityInfoUrl, getAuthorityInfoResponse;
  return regeneratorRuntime.async(function getAuthorityInfo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          getAuthorityInfoUrl = "".concat(_config["default"].BASE_URL).concat(_config["default"].EndPoints.getUserSessionInfo);
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _HttpRequestSender.SendRequest)(_Utils.Constants.HttpMethods.GET, getAuthorityInfoUrl, null, clientToken));

        case 3:
          getAuthorityInfoResponse = _context2.sent;

          if (!getAuthorityInfoResponse.isSuccess) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", getAuthorityInfoByResponseData(getAuthorityInfoResponse.responseData));

        case 8:
          return _context2.abrupt("return", getAuthorityInfoByResponseData({
            isAnonymous: true
          }));

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var configureApp = function configureApp(configurationContext) {
  var configuration, key;
  return regeneratorRuntime.async(function configureApp$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          configuration = getDefaultConfiguration();
          _context3.next = 3;
          return regeneratorRuntime.awrap(getClientInfo());

        case 3:
          configuration.ClientInfo = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(getAuthorityInfo(configurationContext.ClientToken));

        case 6:
          configuration.AuthorityInfo = _context3.sent;

          for (key in _config["default"].CONTENT_DICTIONARY) {
            configuration.Dictionary[key] = _config["default"].CONTENT_DICTIONARY[key][clientInfo.country] === undefined ? _config["default"].CONTENT_DICTIONARY[key]["ENG"] : _config["default"].CONTENT_DICTIONARY[key][clientInfo.country];
          }

          return _context3.abrupt("return", configuration);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
}; //#endregion
//#region Public methods


var ConfigureAppAsAwaitable = function ConfigureAppAsAwaitable(configurationContext) {
  var configuration;
  return regeneratorRuntime.async(function ConfigureAppAsAwaitable$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(configureApp(configurationContext));

        case 3:
          configuration = _context4.sent;
          _context4.next = 10;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          console.error("Error occured when ConfigureAppAsAwaitable", _context4.t0);
          configuration = {};

        case 10:
          return _context4.abrupt("return", configuration);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.ConfigureAppAsAwaitable = ConfigureAppAsAwaitable;

var ConfigureAppAsPromise = function ConfigureAppAsPromise(configurationContext) {
  return new Promise(function _callee(resolve, reject) {
    var configuration;
    return regeneratorRuntime.async(function _callee$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            try {
              configuration = configureApp(configurationContext);
              resolve(configuration);
            } catch (error) {
              reject(error);
            }

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
};

exports.ConfigureAppAsPromise = ConfigureAppAsPromise;

var AppConfig = _react["default"].createContext(undefined); //#endregion


exports.AppConfig = AppConfig;