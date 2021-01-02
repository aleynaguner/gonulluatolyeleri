import React from "react";
import config from "../config.json";
import { HttpRequestSender, SendRequest } from "./HttpRequestSender";
const FormValidator = require("./FormValidator");

//#region Global instances
const RequestSender = new HttpRequestSender(config["BASE_URL"]);
//#endregion

//#region Private methods
let clientInfo = undefined;
const getClientInfo = async () => {
  if (clientInfo === undefined) {
    clientInfo = {};

    let clientLocationInfo = await SendRequest("GET", "https://ipapi.co/json/");

    clientInfo = clientLocationInfo.responseData;

    return clientInfo;
  } else {
    return clientInfo;
  }
};
//#endregion

//#region Public methods
export const ConfigureApp = async function () {
  let configuration = {
    Config: config,
    ClientInfo: undefined,
    Dictionary: {},
    Services: {
      RequestSender: RequestSender,
      FormValidator: FormValidator,
      SendRequest: SendRequest,
    },
  };

  let clientInformation = await getClientInfo();

  configuration.ClientInfo = clientInformation;

  for (const key in config.CONTENT_DICTIONARY) {
    configuration.Dictionary[key] =
      config.CONTENT_DICTIONARY[key][clientInfo.country] === undefined
        ? config.CONTENT_DICTIONARY[key]["ENG"]
        : config.CONTENT_DICTIONARY[key][clientInfo.country];
  }

  return configuration;
};

export const AppConfig = React.createContext(undefined);
//#endregion
