const ObjectID = require("mongodb").ObjectID;
class CollectionBase {
  collection = undefined;

  constructor(db, collectionName) {
    this.collection = db.collection(collectionName);
  }

  insertOne = async (doc, id = null) => {
    if (id !== null) {
      doc["_id"] = new ObjectID(id);
    }
    await this.collection.insertOne(doc);
  };

  updateById = async (id, updatedFields) => {
    await this.collection.updateOne(
      { _id: new ObjectID(id) },
      { $set: updatedFields }
    );
  };

  getAll = async () => {
    let all = await this.collection.find({});
    return all.toArray();
  };

  deleteById = async (id) => {
    let deleted = true;
    try {
      await this.collection.deleteOne({
        _id: new ObjectID(id),
      });
    } catch (error) {
      deleted = false;
    }

    return deleted;
  };
}

module.exports = CollectionBase;
