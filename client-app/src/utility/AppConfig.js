import config from "../config.json";
import { HttpRequestSender, SendRequest } from "./HttpRequestSender";

const RequestSender = new HttpRequestSender(config["BASE_URL"]);

export function AppConfig() {
  this.RequestSender = RequestSender;
  this.Config = config;
  this.ClientInfo = {};
  this.Dictionary = {};
  this.SendRequest = SendRequest;
}

AppConfig.prototype.ConfigureApp = async function () {
  let clientInformation = await getClintInfo();

  this.ClientInfo = clientInformation;

  for (const key in config.CONTENT_DICTIONARY) {
    this.Dictionary[key] =
      config.CONTENT_DICTIONARY[key][clientInfo.country] === undefined
        ? config.CONTENT_DICTIONARY[key]["ENG"]
        : config.CONTENT_DICTIONARY[key][clientInfo.country];
  }
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
