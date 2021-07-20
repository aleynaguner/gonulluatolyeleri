console.log("workShopService module reading...");
const utils = require("../utilities/utils");
const WorkShopResponsible = require("../model/model").WorkShopResponsible;
const Contants = require("../model/model").Contants;

const logError = (methodName, error) =>
  utils.logError("WorkShopService", methodName, error);

const parseWorkShopResponsiblesJsonString = (responsibles) => {
  return JSON.parse(responsibles).map((responsible) => {
    let email = utils.hasDefaultValue(responsible.email.toString())
      ? Contants.WorkShop.DefaultResponsibleMail
      : responsible.email.toString();
    let role = responsible.role.toUpperCase();
    return new WorkShopResponsible(responsible.name, role, email);
  });
};

const prepareWorkShopSaveRequestToSave = (workShopRequest) => {
  workShopRequest.applicationDeadline = new Date(
    workShopRequest.applicationDeadline
  );
  workShopRequest.workshopDate = new Date(workShopRequest.workshopDate);
  workShopRequest.responsibles = parseWorkShopResponsiblesJsonString(
    workShopRequest.responsibles
  );
  workShopRequest.imageFileName = workShopRequest.imageInfo.fileName;
};

const prepareWorkShopCreateRequestToCreate = (workShopCreateRequest) => {
  prepareWorkShopSaveRequestToSave(workShopCreateRequest);

  let workShopId = workShopRequest.imageInfo.id;
  delete workShopRequest.imageInfo;

  workShopCreateRequest.likeCount = 0;
  workShopCreateRequest.viewCount = 0;
  workShopCreateRequest.participantCount = 0;
  workShopCreateRequest.comments = [];

  return workShopId;
};

const prepareWorkShopUpdateRequestToUpdate = (workShopUpdateRequest) => {
  prepareWorkShopSaveRequestToSave(workShopUpdateRequest);
};

class WorkShopService {
  constructor(workShopCollection) {
    this.workShopCollection = workShopCollection;
  }
  createWorkShop = async (createWorkShopRequest) => {
    try {
      let docId = prepareWorkShopCreateRequestToCreate(createWorkShopRequest);
      await this.workShopCollection.insertOne(createWorkShopRequest, docId);
    } catch (error) {
      console.error(error);
      return utils.createProcessResult(false);
    }
    return utils.createProcessResult(true);
  };

  getAllWorkShops = async () => await this.workShopCollection.getAll();

  getImageFileNameById = async (id) => {
    let fileName = await this.workShopCollection.getImageFileNameById(id);
    return fileName;
  };

  incrementViewCount = async (workshopId) => {
    try {
      await this.workShopCollection.incrementViewCount(workshopId);
    } catch (error) {
      logError("incrementViewCount", error);
      return utils.createProcessResult(false);
    }
    return utils.createProcessResult(true);
  };

  deleteWorkshopById = async (id) => {
    let deleteWorkshopByIdResult = await this.workShopCollection.deleteById(id);
    return deleteWorkshopByIdResult;
  };

  updateWorkShop = async (updateWorkShopRequest) => {
    try {
      prepareWorkShopUpdateRequestToUpdate(updateWorkShopRequest);
      await this.workShopCollection.updateById(
        updateWorkShopRequest.id,
        updateWorkShopRequest
      );
    } catch (error) {
      console.error(error);
      return utils.createProcessResult(false);
    }
    return utils.createProcessResult(true);
  };
}

module.exports = (function () {
  console.log("workShopService module exported!");
  return WorkShopService;
})();
