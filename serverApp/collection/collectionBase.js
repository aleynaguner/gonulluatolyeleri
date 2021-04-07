class CollectionBase {
  collection = undefined;

  constructor(db, collectionName) {
    this.collection = db.collection(collectionName);
  }

  insertOne = async (doc) => {
    await this.collection.insertOne(doc);
  };

  getAll = async () => {
    return this.collection.find();
  };
}

module.exports = CollectionBase;