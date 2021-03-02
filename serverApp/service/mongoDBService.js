console.log("mongoDBService module reading...");

const mongoose = require("mongoose");

class MongoDBService {
  constructor(mongoDBSettings) {
    this.mongoDBSettings = mongoDBSettings;
  }

  connectToMongo = async () => {
    await mongoose.connect(this.mongoDBSettings.url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  };
}

module.exports = (function () {
  console.log("mongoDBService module exported!");
  return MongoDBService;
})();
