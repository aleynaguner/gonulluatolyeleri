"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppConfig = exports.ConfigureAppAsPromise = exports.ConfigureApp = exports.UserRole = void 0;

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
          return regeneratorRuntime.awrap((0, _HttpRequestSender.SendRequest)(_Utils.Constants.HttpMethods.GET, "https://ipapi.co/json/"));

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
}; //#endregion


var UserRole = {
  User: "User",
  Admin: "Admin"
};
exports.UserRole = UserRole;

var getDefaultConfiguration = function getDefaultConfiguration() {
  return {
    Config: _config["default"],
    ClientInfo: undefined,
    AuthorityInfo: {
      Role: UserRole.User
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
    Role: userIsAnonymous ? UserRole.User : UserRole.Admin,
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
          console.log("getAuthorityInfoResponse", getAuthorityInfoResponse);

          if (!getAuthorityInfoResponse.isSuccess) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", getAuthorityInfoByResponseData(getAuthorityInfoResponse.responseData));

        case 9:
          return _context2.abrupt("return", getAuthorityInfoByResponseData({
            isAnonymous: true
          }));

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //#region Public methods


var ConfigureApp = function ConfigureApp() {
  var clientToken,
      configuration,
      key,
      _args3 = arguments;
  return regeneratorRuntime.async(function ConfigureApp$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          clientToken = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : null;
          configuration = getDefaultConfiguration();
          _context3.next = 4;
          return regeneratorRuntime.awrap(getClientInfo());

        case 4:
          configuration.ClientInfo = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(getAuthorityInfo(clientToken));

        case 7:
          configuration.AuthorityInfo = _context3.sent;

          for (key in _config["default"].CONTENT_DICTIONARY) {
            configuration.Dictionary[key] = _config["default"].CONTENT_DICTIONARY[key][clientInfo.country] === undefined ? _config["default"].CONTENT_DICTIONARY[key]["ENG"] : _config["default"].CONTENT_DICTIONARY[key][clientInfo.country];
          }

          return _context3.abrupt("return", configuration);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.ConfigureApp = ConfigureApp;

var ConfigureAppAsPromise = function ConfigureAppAsPromise(configurationContext) {
  return new Promise(function _callee(resolve, reject) {
    var configuration, key;
    return regeneratorRuntime.async(function _callee$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            configuration = getDefaultConfiguration();
            _context4.prev = 1;
            _context4.next = 4;
            return regeneratorRuntime.awrap(getClientInfo());

          case 4:
            configuration.ClientInfo = _context4.sent;
            _context4.next = 7;
            return regeneratorRuntime.awrap(getAuthorityInfo(configurationContext.ClientToken));

          case 7:
            configuration.AuthorityInfo = _context4.sent;

            for (key in _config["default"].CONTENT_DICTIONARY) {
              configuration.Dictionary[key] = _config["default"].CONTENT_DICTIONARY[key][clientInfo.country] === undefined ? _config["default"].CONTENT_DICTIONARY[key]["ENG"] : _config["default"].CONTENT_DICTIONARY[key][clientInfo.country];
            }

            resolve(configuration);
            _context4.next = 15;
            break;

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](1);
            reject(_context4.t0);

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 12]]);
  });
};

exports.ConfigureAppAsPromise = ConfigureAppAsPromise;

var AppConfig = _react["default"].createContext(undefined); //#endregion


exports.AppConfig = AppConfig;