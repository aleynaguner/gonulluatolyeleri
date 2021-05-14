console.log("workShopService module reading...");
const utils = require("./utils");
const WorkShopResponsible = require("../model/model").WorkShopResponsible;
const Contants = require("../model/model").Contants;

const prepareWorkShopToInsert = (workShop) => {
  workShop.applicationDeadline = new Date(workShop.applicationDeadline);
  workShop.workshopDate = new Date(workShop.workshopDate);
  workShop.responsibles = workShop.responsibles.map((responsible) => {
    let name = utils.hasDefaultValue(responsible.name.toString())
      ? Contants.WorkShop.DefaultResponsibleName
      : responsible.name.toString();
    let mail = utils.hasDefaultValue(responsible.mail.toString())
      ? Contants.WorkShop.DefaultResponsibleMail
      : responsible.mail.toString();

    let role =
      responsible.role.toString() === Contants.WorkShop.ResponsibleRoles.SPEAKER
        ? Contants.WorkShop.ResponsibleRoles.SPEAKER
        : Contants.WorkShop.DefaultResponsibleRole;

    return new WorkShopResponsible(name, role, mail);
  });
  workShop.likeCount = 0;
  workShop.viewCount = 0;
  workShop.participantCount = 0;
  workShop.comments = [];
};
class WorkShopService {
  constructor(workShopCollection) {
    this.workShopCollection = workShopCollection;
  }
  createWorkShop = async (workShop) => {
    try {
      prepareWorkShopToInsert(workShop);
      await this.workShopCollection.insertOne(workShop);
    } catch (error) {
      return utils.createProcessResult(false, error.message);
    }
    return utils.createProcessResult(true);
  };
  getAllWorkShops = async () => await this.workShopCollection.getAll();
}

module.exports = (function () {
  console.log("workShopService module exported!");
  return WorkShopService;
})();
