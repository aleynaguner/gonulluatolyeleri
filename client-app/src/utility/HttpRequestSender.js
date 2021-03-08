const Axios = require("axios");

export class HttpRequestSender {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  AwaitableSendRequest = async (method, endpoint, data) => {
    let response = {
      isSuccess: false,
      responseData: null,
    };

    try {
      let responseFromWebService = await Axios.request({
        method: method,
        url: `${this.baseUrl}${endpoint}`,
        data: data,
      });

      response.isSuccess =
        responseFromWebService.status >= 200 &&
        responseFromWebService.status < 300;
      response.responseData = responseFromWebService.data;
    } catch (err) {
      response.isSuccess = false;
      response.responseData = err;
    }

    return response;
  };

  SendRequest = (method, endpoint, data, callback) => {
    let res = {
      isSuccess: false,
      responseData: null,
    };

    Axios.request({
      method: method,
      url: `${this.baseUrl}/${endpoint}`,
      data: data,
    })
      .then(function (response) {
        res.isSuccess = response.status >= 200 && response.status < 300;
        res.responseData = response.data;

        callback(res);
      })
      .catch(function (error) {
        console.log(error);

        res.isSuccess = false;
        res.responseData = error;
      })
      .then(function () {
        // always executed
      });

    return res;
  };
}

export const SendRequest = async (method, url, data) => {
  let response = {
    isSuccess: false,
    responseData: null,
  };

  try {
    let responseFromWebService = await Axios.request({
      method: method,
      url: url,
      data: data,
    });

    response.isSuccess =
      responseFromWebService.status >= 200 &&
      responseFromWebService.status < 300;
    response.responseData = responseFromWebService.data;
  } catch (err) {
    response.isSuccess = false;
    response.responseData = err;
  }

  return response;
};
