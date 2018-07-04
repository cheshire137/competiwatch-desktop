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

  static find(db, id, type) {
    return new Promise((resolve, reject) => {
      db.findOne({ _id: id }, (err, data) => {
        if (err) {
          console.error(`failed to load ${type}`, id, err)
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  static findAll(db, type) {
    const conditions = {}
    return new Promise((resolve, reject) => {
      db.find(conditions, (err, rows) => {
        if (err) {
          console.error(`failed to look up ${type}s`, err)
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

  static upsert(db, data, id, type) {
    return new Promise((resolve, reject) => {
      if (id) {
        const options = {}
        db.update({ _id: id }, data, options, (err, numReplaced) => {
          if (err) {
            console.error(`failed to update ${type}`, this._id, err)
            reject(err)
          } else {
            console.log('updated', numReplaced, `${type}(s)`, this._id)
            resolve()
          }
        })
      } else {
        db.insert([data], (err, newAccount) => {
          if (err) {
            console.error(`failed to create ${type}`, data, err)
            reject(err)
          } else {
            console.log(`created ${type}`, newAccount)
            resolve(newAccount)
          }
        })
      }
    })
  }
}

export default Database
