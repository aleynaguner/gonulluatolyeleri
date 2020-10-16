const Axios = require("axios");

export class HttpRequestSender {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  SendRequest = async (method, endpoint, data) => {
    let response = {
      isSuccess: false,
      responseData: null,
    };

    try {
      let responseFromWebService = await Axios.request({
        method: method,
        url: `${this.baseUrl}/${endpoint}`,
        data: data,
      });

      response.isSuccess =
        responseFromWebService.status >= 200 &&
        responseFromWebService.status < 300;
      response.responseData = responseFromWebService.data;
    } catch (err) {
      response.isSuccess = false;
      response.responseData = null;
    }

    return response;
  };
}
