class CollectionBase {
  collection = undefined;

  constructor(db, collectionName) {
    this.collection = db.collection(collectionName);
  }

  insertOne = async (doc) => {
    await this.collection.insertOne(doc);
  };

  getAll = async () => {
    let all = await this.collection.find({});
    return all.toArray();
  };

  deleteById = async (id) => {
    let deleted = true;
    try {
      let deleteResult = await this.collection.deleteOne({
        _id: id,
      });
    } catch (error) {
      deleted = false;
    }

    return deleted;
  };
}

module.exports = CollectionBase;
