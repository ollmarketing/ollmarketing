const {MongoClient} =  require('mongodb');

class Database {
  constructor(url) {
    this._client = new MongoClient(url, {useNewUrlParser: true});
    this._db = null;
  }

  async connect(name){
    await this._client.connect();

    this._db = this._client.db(name);

    return this._db;
  }

  async close(){
    return await this._client.close()
  }

  collection(name){
    return this._db.collection(name);
  }
}

module.exports = Database;
