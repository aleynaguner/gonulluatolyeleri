const createFromValuesUpdater = (componentReferrer) => {
  return function (e) {
    let updatedFormValueName = e.target.name.toString();
    let updateFormValue = e.target.value;
    this.setState(
      (state) => ({
        ...state,
        [updatedFormValueName]: {
          ...state[updatedFormValueName],
          value: updateFormValue,
        },
      }),
      () => console.log(this.state)
    );
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

const createStateHandlerByErroneousState = (componentReferrer) => {
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

const FormManagement = {
  createFromValuesUpdater: createFromValuesUpdater,
  createStateHandlerByErroneousState: createStateHandlerByErroneousState,
};

module.exports = { FormManagement };
