"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppConfig = exports.ConfigureApp = void 0;

var _react = _interopRequireDefault(require("react"));

var _config = _interopRequireDefault(require("../config.json"));

var _HttpRequestSender = require("./HttpRequestSender");

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
          return regeneratorRuntime.awrap((0, _HttpRequestSender.SendRequest)("GET", "https://ipapi.co/json/"));

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
//#region Public methods


var ConfigureApp = function ConfigureApp() {
  var configuration, clientInformation, key;
  return regeneratorRuntime.async(function ConfigureApp$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          configuration = {
            Config: _config["default"],
            ClientInfo: undefined,
            Dictionary: {},
            Services: {
              RequestSender: RequestSender,
              FormValidator: FormValidator,
              SendRequest: _HttpRequestSender.SendRequest
            }
          };
          _context2.next = 3;
          return regeneratorRuntime.awrap(getClientInfo());

        case 3:
          clientInformation = _context2.sent;
          configuration.ClientInfo = clientInformation;

          for (key in _config["default"].CONTENT_DICTIONARY) {
            configuration.Dictionary[key] = _config["default"].CONTENT_DICTIONARY[key][clientInfo.country] === undefined ? _config["default"].CONTENT_DICTIONARY[key]["ENG"] : _config["default"].CONTENT_DICTIONARY[key][clientInfo.country];
          }

          return _context2.abrupt("return", configuration);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.ConfigureApp = ConfigureApp;

var AppConfig = _react["default"].createContext(undefined); //#endregion


exports.AppConfig = AppConfig;