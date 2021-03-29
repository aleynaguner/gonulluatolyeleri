console.log("mongoDBService module reading...");

const { MongoClient } = require("mongodb");

class MongoDBService {
  db = undefined;

  constructor(mongoDBSettings) {
    this.mongoDBSettings = mongoDBSettings;
  }

  connectToMongo = async () => {
    let connected = false;

    let client = new MongoClient(this.mongoDBSettings.url, {
      useUnifiedTopology: true,
    });
    try {
      await client.connect();
      await client.db(this.mongoDBSettings.dbName).command({ ping: 1 });

      connected = true;

      this.db = client.db(this.mongoDBSettings.dbName);
    } catch (error) {
      await client.close();
      connected = false;
    }
    return connected;
  };
}

module.exports = (function () {
  console.log("mongoDBService module exported!");
  return MongoDBService;
})();
