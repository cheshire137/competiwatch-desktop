import Datastore from 'nedb'
import path from 'path'

const { ipcRenderer, remote } = window.require('electron')

class Database {
  static findOne(dbName, conditions) {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('found-one', (err, data) => {
        if (err) {
          console.error('failed to look up a record', conditions, err)
          reject(err)
        } else {
          resolve(data)
        }
      })
      ipcRenderer.send('find-one', dbName, conditions)
    })
  }

  static find(dbName, id) {
    const conditions = { _id: id }
    return Database.findOne(dbName, conditions)
  }

  static count(dbName, conditions) {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('counted', (err, count) => {
        if (err) {
          console.error('failed to count records', err)
        } else {
          resolve(count)
        }
      })
      ipcRenderer.send('count', dbName, conditions)
    })
  }

  static findAll(dbName, sort, conditions) {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('found-all', (err, rows) => {
        if (err) {
          console.error('failed to look up records', err)
          reject(err)
        } else {
          resolve(rows)
        }
      })
      ipcRenderer.send('find-all', dbName, sort, conditions)
    })
  }

  static delete(dbName, id) {
    const conditions = { _id: id }
    return this.deleteSome(conditions)
  }

  static deleteSome(dbName, conditions) {
    return new Promise((resolve, reject) => {
      const options = {}
      ipcRenderer.once('deleted', (err, numRemoved) => {
        if (err) {
          console.error('failed to delete record(s)', conditions)
          reject()
        } else {
          console.log('deleted', numRemoved, 'record(s)', conditions)
          resolve()
        }
      })
      ipcRenderer.send('delete', dbName, conditions, options)
    })
  }

  static update(dbName, data, id) {
    return new Promise((resolve, reject) => {
      const conditions = { _id: id }
      const options = {}
      const update = { $set: data }

      ipcRenderer.once('updated', (err, numReplaced) => {
        if (err) {
          console.error('failed to update record', id, err)
          reject(err)
        } else {
          console.log('updated', numReplaced, 'record', id)
          resolve({ _id: id })
        }
      })
      ipcRenderer.send('update', dbName, conditions, update, options)
    })
  }

  static insert(dbName, data) {
    return new Promise((resolve, reject) => {
      const createdDate = new Date()
      data.createdAt = createdDate.toJSON()
      const rows = [data]

      ipcRenderer.once('inserted', (err, newRecords) => {
        if (err) {
          console.error('failed to create record', data, err)
          reject(err)
        } else {
          const newRecord = newRecords[0]
          newRecord.createdAt = createdDate
          console.log('created record', newRecord)
          resolve(newRecord)
        }
      })
      ipcRenderer.send('insert', dbName, rows)
    })
  }

  static upsert(dbName, data, id) {
    return new Promise((resolve, reject) => {
      if (id) {
        this.update(dbName, data, id).then(resolve, reject)
      } else {
        this.insert(dbName, data).then(resolve, reject)
      }
    })
  }

  static latest(dbName, conditions, sort) {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('found-latest', (err, rows) => {
        if (err) {
          console.error('failed to load latest record', err)
          reject(err)
        } else {
          resolve(rows[0])
        }
      })
      ipcRenderer.send('find-latest', dbName, conditions, sort)
    })
  }
}

export default Database
