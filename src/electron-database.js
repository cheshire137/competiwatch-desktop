const Datastore = require('nedb')
const path = require('path')
const { ipcMain, app } = require('electron')

const databases = {}

const getDatabaseFilename = name => {
  const dbDir = app.getPath('userData')
  const env = process.env.NODE_ENV
  const dbName = `competiwatch-${name}-${env}`
  return path.join(dbDir, `${dbName}.json`)
}

ipcMain.on('load-accounts-db', event => {
  const filename = getDatabaseFilename('accounts')
  const db = new Datastore({ filename })

  db.loadDatabase()
  db.ensureIndex({ fieldName: 'battletag', unique: true }, err => {
    if (err) {
      console.error('failed to add accounts.battletag index', err)
    }
  })

  databases.accounts = db
  event.sender.send('accounts-db-loaded')
})

ipcMain.on('load-settings-db', event => {
  const filename = getDatabaseFilename('settings')
  const db = new Datastore({ filename })

  db.loadDatabase()

  databases.settings = db
  event.sender.send('settings-db-loaded')
})

ipcMain.on('load-seasons-db', event => {
  const filename = getDatabaseFilename('seasons')
  const db = new Datastore({ filename })

  db.loadDatabase()
  db.ensureIndex({ fieldName: 'number', unique: true }, err => {
    if (err) {
      console.error('failed to add seasons.number index', err)
    }
  })

  databases.seasons = db
  event.sender.send('seasons-db-loaded')
})

ipcMain.on('load-matches-db', event => {
  const filename = getDatabaseFilename('matches')
  const db = new Datastore({ filename })

  db.loadDatabase()

  databases.matches = db
  event.sender.send('matches-db-loaded')
})

ipcMain.on('find-one', (event, dbName, conditions) => {
  const db = databases[dbName]
  db.findOne(conditions, (err, data) => {
    event.sender.send('found-one', err, data)
  })
})

ipcMain.on('find-all', (event, dbName, sort, conditions) => {
  const db = databases[dbName]
  db.find(conditions || {}).sort(sort).exec((err, rows) => {
    event.sender.send('found-all', err, rows)
  })
})

ipcMain.on('count', (event, dbName, conditions) => {
  const db = databases[dbName]
  db.count(conditions, (err, count) => {
    event.sender.send('counted', err, count)
  })
})

ipcMain.on('delete', (event, dbName, conditions, options) => {
  const db = databases[dbName]
  db.remove(conditions, options, (err, numRemoved) => {
    event.sender.send('deleted', err, numRemoved)
  })
})

ipcMain.on('update', (event, dbName, conditions, update, options) => {
  const db = databases[dbName]
  db.update(conditions, update, options, (err, numReplaced) => {
    event.sender.send('updated', err, numReplaced)
  })
})

ipcMain.on('insert', (event, dbName, rows) => {
  const db = databases[dbName]
  db.insert(rows, (err, newRecords) => {
    event.sender.send('inserted', err, newRecords)
  })
})

ipcMain.on('find-latest', (event, dbName, conditions, sort) => {
  const db = databases[dbName]
  db.find(conditions).sort(sort).limit(1).exec((err, rows) => {
    event.sender.send('found-latest', err, rows)
  })
})
