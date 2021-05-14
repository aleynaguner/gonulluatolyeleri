console.log("workShopCollection module reading...");

const ObjectID = require("mongodb").ObjectID;

const CollectionBase = require("./collectionBase");
const docConstants = require("./documentsConstants").workShop;

const WORK_SHOP_COLLECTION_NAME = "workshop";

const prepareWorkShopToInsert = (doc) => {
  doc.responsibles.forEach((responsible) => {
    responsible.role = docConstants.ResponsibleRole[responsible.role];
  });
};

class WorkShopCollection extends CollectionBase {
  constructor(db) {
    super(db, WORK_SHOP_COLLECTION_NAME);
  }

  insertOne = async (doc, id = null) => {
    prepareWorkShopToInsert(doc);
    if (id !== null) {
      doc["_id"] = new ObjectID(id);
    }
    await this.collection.insertOne(doc);
  };
}

module.exports = (function () {
  console.log("workShopCollection module exported!");
  return WorkShopCollection;
})();
