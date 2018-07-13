import Datastore from 'nedb'
import path from 'path'

const remote = window.require('electron').remote

class Database {
  static load(name) {
    const dbDir = remote.app.getPath('userData')
    const filename = path.join(dbDir, `competiwatch-${name}.db`)
    const db = new Datastore({ filename, autoload: true })
    console.log('loading database', filename)
    db.loadDatabase()
    return db
  }

  static findOne(db, conditions) {
    return new Promise((resolve, reject) => {
      db.findOne(conditions, (err, data) => {
        if (err) {
          console.error('failed to look up a record', conditions, err)
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  static find(db, id) {
    const conditions = { _id: id }
    return Database.findOne(db, conditions)
  }

  static count(db, conditions) {
    return new Promise((resolve, reject) => {
      db.count(conditions, (err, count) => {
        if (err) {
          console.error('failed to count records', err)
        } else {
          resolve(count)
        }
      })
    })
  }

  static findAll(db, sort, conditions) {
    return new Promise((resolve, reject) => {
      db.find(conditions || {}).sort(sort).exec((err, rows) => {
        if (err) {
          console.error('failed to look up records', err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  static delete(db, id, type) {
    return new Promise((resolve, reject) => {
      const options = {}
      db.remove({ _id: id }, options, (err, numRemoved) => {
        if (err) {
          console.error(`failed to delete ${type}`, id)
          reject()
        } else {
          console.log('deleted', numRemoved, `${type}(s)`, id)
          resolve()
        }
      })
    })
  }

  static update(db, data, id) {
    return new Promise((resolve, reject) => {
      const options = {}
      const update = { $set: data }

      db.update({ _id: id }, update, options, (err, numReplaced) => {
        if (err) {
          console.error('failed to update record', id, err)
          reject(err)
        } else {
          console.log('updated', numReplaced, 'record', id)
          resolve({ _id: id })
        }
      })
    })
  }

  static insert(db, data) {
    return new Promise((resolve, reject) => {
      const createdDate = new Date()
      data.createdAt = createdDate.toJSON()

      db.insert([data], (err, newRecord) => {
        if (err) {
          console.error('failed to create record', data, err)
          reject(err)
        } else {
          console.log('created record', newRecord, data.createdAt)
          newRecord.createdAt = createdDate
          resolve(newRecord)
        }
      })
    })
  }

  static upsert(db, data, id) {
    return new Promise((resolve, reject) => {
      if (id) {
        this.update(db, data, id).then(resolve, reject)
      } else {
        this.insert(db, data).then(resolve, reject)
      }
    })
  }
}

export default Database
