import React from "react";
import config from "../config.json";
import { HttpRequestSender, SendRequest } from "./HttpRequestSender";

const RequestSender = new HttpRequestSender(config["BASE_URL"]);

export const ConfigureApp = async function () {
  let configuration = {
    Config: config,
    ClientInfo: undefined,
    Dictionary: {},
    RequestSender: RequestSender,
    SendRequest: SendRequest,
  };

  let clientInformation = await getClintInfo();

  configuration.ClientInfo = clientInformation;

  for (const key in config.CONTENT_DICTIONARY) {
    configuration.Dictionary[key] =
      config.CONTENT_DICTIONARY[key][clientInfo.country] === undefined
        ? config.CONTENT_DICTIONARY[key]["ENG"]
        : config.CONTENT_DICTIONARY[key][clientInfo.country];
  }

  return configuration;
};

let clientInfo = undefined;
const getClintInfo = async () => {
  if (clientInfo === undefined) {
    clientInfo = {};

    let clientLocationInfo = await SendRequest("GET", "https://ipapi.co/json/");

    clientInfo = clientLocationInfo.responseData;

    return clientInfo;
  } else {
    return clientInfo;
  }
};

export const AppConfig = React.createContext(undefined);
