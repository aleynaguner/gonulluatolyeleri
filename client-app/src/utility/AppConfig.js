import React from "react";
import config from "../config.json";
import { HttpRequestSender, SendRequest } from "./HttpRequestSender";
import { Constants } from "./Utils";
const FormValidator = require("./FormValidator");

//#region Global instances
const RequestSender = new HttpRequestSender(config["BASE_URL"]);
//#endregion

//#region Private methods
let clientInfo = undefined;
const getClientInfo = async () => {
  if (clientInfo === undefined) {
    clientInfo = {};

    let clientLocationInfo = await SendRequest(
      Constants.HttpMethods.GET,
      confi["CLIENT_INFO_API"]
    );

    clientInfo = clientLocationInfo.responseData;

    return clientInfo;
  } else {
    return clientInfo;
  }
};

const getDefaultConfiguration = () => {
  return {
    Config: config,
    ClientInfo: undefined,
    AuthorityInfo: {
      Role: Constants.UserRole.User,
    },
    Dictionary: {},
    Services: {
      RequestSender: RequestSender,
      FormValidator: FormValidator,
      SendRequest: SendRequest,
    },
  };
};

const getAuthorityInfoByResponseData = (responseData) => {
  let userIsAnonymous = responseData.isAnonymous;
  return {
    Role: userIsAnonymous ? Constants.UserRole.User : Constants.UserRole.Admin,
    Email: !userIsAnonymous
      ? responseData.email
      : Constants.DefaultValues.String,
    IpAddress: !userIsAnonymous
      ? responseData.ipAddress
      : Constants.DefaultValues.String,
  };
};

const getAuthorityInfo = async (clientToken) => {
  const getAuthorityInfoUrl = `${config.BASE_URL}${config.EndPoints.getUserSessionInfo}`;
  let getAuthorityInfoResponse = await SendRequest(
    Constants.HttpMethods.GET,
    getAuthorityInfoUrl,
    null,
    clientToken
  );

  if (getAuthorityInfoResponse.isSuccess) {
    return getAuthorityInfoByResponseData(
      getAuthorityInfoResponse.responseData
    );
  } else {
    return getAuthorityInfoByResponseData({ isAnonymous: true });
  }
};

const configureApp = async (configurationContext) => {
  let configuration = getDefaultConfiguration();

  configuration.ClientInfo = await getClientInfo();
  configuration.AuthorityInfo = await getAuthorityInfo(
    configurationContext.ClientToken
  );

  for (const key in config.CONTENT_DICTIONARY) {
    configuration.Dictionary[key] =
      config.CONTENT_DICTIONARY[key][clientInfo.country] === undefined
        ? config.CONTENT_DICTIONARY[key]["ENG"]
        : config.CONTENT_DICTIONARY[key][clientInfo.country];
  }
  return configuration;
};
//#endregion

//#region Public methods
export const ConfigureAppAsAwaitable = async function (configurationContext) {
  let configuration;
  try {
    configuration = await configureApp(configurationContext);
  } catch (error) {
    console.error("Error occured when ConfigureAppAsAwaitable", error);
    configuration = {};
  }
  return configuration;
};

export const ConfigureAppAsPromise = (configurationContext) => {
  return new Promise(async function (resolve, reject) {
    try {
      let configuration = configureApp(configurationContext);
      resolve(configuration);
    } catch (error) {
      reject(error);
    }
  });
};

export const AppConfig = React.createContext(undefined);
//#endregion
