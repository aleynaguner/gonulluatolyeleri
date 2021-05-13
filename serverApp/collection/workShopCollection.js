console.log("workShopCollection module reading...");

const ObjectID = require("mongodb").ObjectID;

const CollectionBase = require("./collectionBase");

const WORK_SHOP_COLLECTION_NAME = "workshop";

class WorkShopCollection extends CollectionBase {
  constructor(db) {
    super(db, WORK_SHOP_COLLECTION_NAME);
  }
}

module.exports = (function () {
  console.log("workShopCollection module exported!");
  return WorkShopCollection;
})();
