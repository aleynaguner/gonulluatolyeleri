const Axios = require("axios");

export class HttpRequestSender {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  AwaitableSendRequest = async (method, endpoint, data = null) => {
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

  SendRequest = (
    method,
    endpoint,
    callback = null,
    data = null,
    bearerToken = null,
    extraHeaderInfo = null
  ) => {
    let res = {
      isSuccess: false,
      responseData: null,
    };

    let request = {
      method: method,
      url: `${this.baseUrl}${endpoint}`,
      data: data,
    };

    if (bearerToken !== null) {
      request.headers = {
        Authorization: `Bearer ${bearerToken}`,
      };
    }

    if (extraHeaderInfo !== null) {
      request.headers = {
        ...request.headers,
        ...extraHeaderInfo,
      };
    }

    Axios.request(request)
      .then(function (response) {
        res.isSuccess = response.status >= 200 && response.status < 300;
        res.responseData = response.data;

        if (callback !== null) callback(res);
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

export const SendRequest = async (method, url, data, bearerToken = null) => {
  let response = {
    isSuccess: false,
    responseData: null,
  };

  try {
    let request = {
      method: method,
      url: url,
      data: data,
    };
    if (bearerToken !== null) {
      request.headers = {
        Authorization: `Bearer ${bearerToken}`,
      };
    }

    let responseFromWebService = await Axios.request(request);

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
