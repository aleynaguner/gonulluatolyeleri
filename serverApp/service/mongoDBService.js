class MongoDBService {
  constructor(mongoDBSetting) {
    this.mongoDBSetting = mongoDBSetting;
  }

  ConnectToMongo = async () => {
    await mongoose.connect(mongoDBSetting.url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  };
}

module.exports = MongoDBService;
