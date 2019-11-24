import {
  findOne,
  count,
  findAll,
  deleteSome,
  update,
  insert,
  findLatest
} from "../utils/electronUtils";

class Database {
  static findOne(dbName: string, conditions: any) {
    return findOne(dbName, conditions);
  }

  static find(dbName: string, id: string) {
    const conditions = { _id: id };
    return Database.findOne(dbName, conditions);
  }

  static count(dbName: string, conditions: any): Promise<number> {
    return count(dbName, conditions);
  }

  static findAll(dbName: string, sort: any, conditions: any): Promise<any[]> {
    return findAll(dbName, sort, conditions);
  }

  static delete(dbName: string, id: string) {
    const conditions = { _id: id };
    return this.deleteSome(dbName, conditions);
  }

  static deleteSome(dbName: string, conditions: any) {
    return deleteSome(dbName, conditions);
  }

  static update(dbName: string, data: any, id: string) {
    return update(dbName, data, id);
  }

  static insert(dbName: string, data: any) {
    return insert(dbName, data);
  }

  static upsert(dbName: string, data: any, id: string) {
    return new Promise((resolve, reject) => {
      if (id) {
        this.update(dbName, data, id).then(resolve, reject);
      } else {
        this.insert(dbName, data).then(resolve, reject);
      }
    });
  }

  static latest(dbName: string, conditions: any, sort: any) {
    return findLatest(dbName, conditions, sort);
  }
}

export default Database;
