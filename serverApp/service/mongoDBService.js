const mongoose = require("mongoose");
class MongoDBService {
  constructor(mongoDBSettings) {
    this.mongoDBSettings = mongoDBSettings;
  }

  ConnectToMongo = async () => {
    await mongoose.connect(this.mongoDBSettings.url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  };
}

module.exports = MongoDBService;
