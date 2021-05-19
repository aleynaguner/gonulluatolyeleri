const Constants = require("../utility/Utils").Constants;
const config = require("../config.json");

const createFromValuesUpdater = (componentReferrer) => {
  return function (e) {
    let updatedFormValueName = e.target.name.toString();
    let updateFormValue = e.target.value;
    this.setState((state) => ({
      ...state,
      [updatedFormValueName]: {
        ...state[updatedFormValueName],
        value: updateFormValue,
      },
    }));
  }.bind(componentReferrer);
};

const createStateCleaner = (
  componentReferrer,
  initalState,
  extraJobs = undefined
) => {
  // TO-DO
  return function () {
    if (extraJobs !== undefined) {
      extraJobs();
    }
  }.bind(componentReferrer);
};

const createFormDataUpdaterByErroneousState = (componentReferrer) => {
  return function (erroneousData, notProcesseds) {
    for (const data in this.state) {
      if (notProcesseds.includes(data)) continue;

      let dataIsErroneous = erroneousData.hasOwnProperty(data);
      if (dataIsErroneous) {
        this.setState({
          [data]: {
            value: "",
            erroneous: true,
            errorCode: erroneousData[data][0],
          },
        });
      } else {
        this.setState((state) => ({
          [data]: {
            ...state[data],
            erroneous: false,
            errorCode: "",
          },
        }));
      }
    }
  }.bind(componentReferrer);
};

const createListDataLoader = (context) => {
  return async function () {
    this.setState({
      loading: true,
    });
    let data;
    let getResponse = {};
    try {
      getResponse =
        await this.context.Services.RequestSender.AwaitableSendRequest(
          Constants.HttpMethods.GET,
          config.EndPoints[context.getDataEndpointKey]
        );
    } catch (error) {
      getResponse.isSuccess = false;
    } finally {
      console.log(getResponse);
      data = getResponse.isSuccess ? getResponse.responseData : [];
    }
    this.setState({
      [context.listStatePropName]: data,
      loading: false,
    });
  }.bind(context.componentReferrer);
};

const FormManagement = {
  createFromValuesUpdater: createFromValuesUpdater,
  createFormDataUpdaterByErroneousState: createFormDataUpdaterByErroneousState,
};

module.exports = { FormManagement, createListDataLoader };
