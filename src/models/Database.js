import isElectron from 'is-electron'

const getSignature = prefix => {
  return prefix + Math.random().toString(36).substr(2, 9)
}

class Database {
  static findOne(dbName, conditions) {
    return new Promise((resolve, reject) => {
      const replyTo = getSignature('find-one')

      if (isElectron()) {
        window.ipcRenderer.once(replyTo, (event, err, data) => {
          if (err) {
            console.error('failed to look up a record', conditions, err)
            reject(err)
          } else {
            resolve(data)
          }
        })
        window.ipcRenderer.send('find-one', replyTo, dbName, conditions)
      } else {
        reject('not electron')
      }
    })
  }

  static find(dbName, id) {
    const conditions = { _id: id }
    return Database.findOne(dbName, conditions)
  }

  static count(dbName, conditions) {
    return new Promise((resolve, reject) => {
      const replyTo = getSignature('count')

      if (isElectron()) {
        window.ipcRenderer.once(replyTo, (event, err, count) => {
          if (err) {
            console.error('failed to count records', err)
          } else {
            resolve(count)
          }
        })
        window.ipcRenderer.send('count', replyTo, dbName, conditions)
      } else {
        reject('not electron')
      }
    })
  }

  static findAll(dbName, sort, conditions) {
    return new Promise((resolve, reject) => {
      const replyTo = getSignature('find-all')

      if (isElectron()) {
        window.ipcRenderer.once(replyTo, (event, err, rows, val) => {
          if (err) {
            console.error('failed to look up records', dbName, err)
            reject(err)
          } else {
            resolve(rows)
          }
        })
        window.ipcRenderer.send('find-all', replyTo, dbName, sort, conditions)
      } else {
        reject('not electron')
      }
    })
  }

  static delete(dbName, id) {
    const conditions = { _id: id }
    return this.deleteSome(dbName, conditions)
  }

  static deleteSome(dbName, conditions) {
    return new Promise((resolve, reject) => {
      const replyTo = getSignature('delete')

      if (isElectron()) {
        window.ipcRenderer.once(replyTo, (event, err, numRemoved) => {
          if (err) {
            console.error('failed to delete record(s)', dbName, conditions)
            reject()
          } else {
            console.log('deleted', numRemoved, dbName, 'record(s)', conditions)
            resolve()
          }
        })
        const options = {}
        window.ipcRenderer.send('delete', replyTo, dbName, conditions, options)
      } else {
        reject('not electron')
      }
    })
  }

  static update(dbName, data, id) {
    return new Promise((resolve, reject) => {
      const conditions = { _id: id }
      const options = {}
      const update = { $set: data }
      const replyTo = getSignature('update')

      if (isElectron()) {
        window.ipcRenderer.once(replyTo, (event, err, numReplaced) => {
          if (err) {
            console.error('failed to update record', dbName, id, err)
            reject(err)
          } else {
            console.log('updated', numReplaced, 'record', dbName, id)
            resolve({ _id: id })
          }
        })
        window.ipcRenderer.send('update', replyTo, dbName, conditions, update, options)
      } else {
        reject('not electron')
      }
    })
  }

  static insert(dbName, data) {
    return new Promise((resolve, reject) => {
      const replyTo = getSignature('insert')
      const createdDate = new Date()
      data.createdAt = createdDate.toJSON()
      const rows = [data]

      if (isElectron()) {
        window.ipcRenderer.once(replyTo, (event, err, newRecords) => {
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
        window.ipcRenderer.send('insert', replyTo, dbName, rows)
      } else {
        reject('not electron')
      }
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
      const replyTo = getSignature('find-latest')

      if (isElectron()) {
        window.ipcRenderer.once(replyTo, (event, err, rows) => {
          if (err) {
            console.error('failed to load latest record', dbName, err)
            reject(err)
          } else {
            resolve(rows[0])
          }
        })
        window.ipcRenderer.send('find-latest', replyTo, dbName, conditions, sort)
      } else {
        reject('not electron')
      }
    })
  }
}

export default Database
