console.log("workShopService module reading...");
const utils = require("./utils");
const WorkShopResponsible = require("../model/model").WorkShopResponsible;
const Contants = require("../model/model").Contants;

const prepareWorkShopToInsert = (workShop) => {
  workShop.applicationDeadline = new Date(workShop.applicationDeadline);
  workShop.workshopDate = new Date(workShop.workshopDate);
  workShop.responsibles = JSON.parse(workShop.responsibles).map(
    (responsible) => {
      let email = utils.hasDefaultValue(responsible.email.toString())
        ? Contants.WorkShop.DefaultResponsibleMail
        : responsible.email.toString();
      let role = responsible.role.toUpperCase();
      return new WorkShopResponsible(responsible.name, role, email);
    }
  );
  workShop.likeCount = 0;
  workShop.viewCount = 0;
  workShop.participantCount = 0;
  workShop.comments = [];

  let docId = workShop.imageInfo.id;
  workShop.imageFileName = workShop.imageInfo.imageFileName;
  delete workShop.imageInfo;

  return docId;
};
class WorkShopService {
  constructor(workShopCollection) {
    this.workShopCollection = workShopCollection;
  }
  createWorkShop = async (workShop) => {
    try {
      let docId = prepareWorkShopToInsert(workShop);
      await this.workShopCollection.insertOne(workShop, docId);
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
}

module.exports = (function () {
  console.log("workShopService module exported!");
  return WorkShopService;
})();
