import path from 'path'

const { ipcRenderer, remote } = window.require('electron')

class Database {
  static findOne(dbName, conditions) {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('found-one', (event, err, data) => {
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
      ipcRenderer.once('counted', (event, err, count) => {
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
      ipcRenderer.once('found-all', (event, err, rows, val) => {
        if (err) {
          console.error('failed to look up records', dbName, err)
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
    return this.deleteSome(dbName, conditions)
  }

  static deleteSome(dbName, conditions) {
    return new Promise((resolve, reject) => {
      ipcRenderer.once('deleted', (event, err, numRemoved) => {
        if (err) {
          console.error('failed to delete record(s)', dbName, conditions)
          reject()
        } else {
          console.log('deleted', numRemoved, dbName, 'record(s)', conditions)
          resolve()
        }
      })
      const options = {}
      ipcRenderer.send('delete', dbName, conditions, options)
    })
  }

  static update(dbName, data, id) {
    return new Promise((resolve, reject) => {
      const conditions = { _id: id }
      const options = {}
      const update = { $set: data }

      ipcRenderer.once('updated', (event, err, numReplaced) => {
        if (err) {
          console.error('failed to update record', dbName, id, err)
          reject(err)
        } else {
          console.log('updated', numReplaced, 'record', dbName, id)
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

      ipcRenderer.once('inserted', (event, err, newRecords) => {
        if (err) {
          console.error('failed to create record', dbName, data, err)
          reject(err)
        } else {
          const newRecord = newRecords[0]
          newRecord.createdAt = createdDate
          console.log('created record', dbName, newRecord)
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
      ipcRenderer.once('found-latest', (event, err, rows) => {
        if (err) {
          console.error('failed to load latest record', dbName, err)
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
