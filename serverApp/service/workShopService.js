console.log("workShopService module reading...");

class WorkShopService {
  constructor(workShopCollection) {
    this.workShopCollection = workShopCollection;
  }

  getAllWorkShops = async () => await this.workShopCollection.getAll();
}

module.exports = (function () {
  console.log("workShopService module exported!");
  return WorkShopService;
})();
