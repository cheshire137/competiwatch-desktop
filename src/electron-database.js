const path = require('path')
const { ipcMain, app } = require('electron')
const log = require('electron-log')
const Datastore = require('nedb')

const databases = {}
const env = process.env.ELECTRON_START_URL ? 'development' : 'production'

const getDatabaseFilename = name => {
  const dbDir = app.getPath('userData')
  const dbName = `competiwatch-${name}-${env}`

  return path.join(dbDir, `${dbName}.json`)
}

const loadAccountsDatabase = () => {
  const filename = getDatabaseFilename('accounts')
  const db = new Datastore({ filename })

  db.loadDatabase()
  db.ensureIndex({ fieldName: 'battletag', unique: true }, err => {
    if (err) {
      log.error('failed to add accounts.battletag index', err)
    }
  })

  databases.accounts = db
}

const loadMatchesDatabase = () => {
  const filename = getDatabaseFilename('matches')
  const db = new Datastore({ filename })

  db.loadDatabase()

  databases.matches = db
}

const loadSeasonsDatabase = () => {
  const filename = getDatabaseFilename('seasons')
  const db = new Datastore({ filename })

  db.loadDatabase()
  db.ensureIndex({ fieldName: 'number', unique: true }, err => {
    if (err) {
      log.error('failed to add seasons.number index', err)
    }
  })

  databases.seasons = db
}

const loadSettingsDatabase = () => {
  const filename = getDatabaseFilename('settings')
  const db = new Datastore({ filename })

  db.loadDatabase()

  databases.settings = db
}

const databaseFor = name => {
  if (name === 'accounts') {
    if (!databases.accounts) {
      loadAccountsDatabase()
    }
    return databases.accounts
  }
  if (name === 'matches') {
    if (!databases.matches) {
      loadMatchesDatabase()
    }
    return databases.matches
  }
  if (name === 'seasons') {
    if (!databases.seasons) {
      loadSeasonsDatabase()
    }
    return databases.seasons
  }
  if (name === 'settings') {
    if (!databases.settings) {
      loadSettingsDatabase()
    }
    return databases.settings
  }
}

ipcMain.on('get-db-path', (event, dbName) => {
  const dbPath = getDatabaseFilename(dbName)
  event.sender.send('got-db-path', dbPath)
})

ipcMain.on('find-one', (event, dbName, conditions) => {
  const db = databaseFor(dbName)
  if (!db) {
    log.error(dbName, 'database not loaded for find-one')
    event.sender.send('found-one', 'database not loaded')
    return
  }

  db.findOne(conditions, (err, data) => {
    if (err) {
      log.error('find-one error', err)
    }
    event.sender.send('found-one', err, data)
  })
})

ipcMain.on('find-all', (event, dbName, sort, conditions) => {
  const db = databaseFor(dbName)
  if (!db) {
    log.error(dbName, 'database not loaded for find-all')
    event.sender.send('found-all', 'database not loaded')
    return
  }

  db.find(conditions || {}).sort(sort).exec((err, rows) => {
    if (err) {
      log.error('find-all error', err)
    }
    event.sender.send('found-all', err, rows)
  })
})

ipcMain.on('count', (event, dbName, conditions) => {
  const db = databaseFor(dbName)
  if (!db) {
    log.error(dbName, 'database not loaded for count')
    event.sender.send('counted', 'database not loaded')
    return
  }

  db.count(conditions, (err, count) => {
    if (err) {
      log.error('count error', err)
    }
    event.sender.send('counted', err, count)
  })
})

ipcMain.on('delete', (event, dbName, conditions, options) => {
  const db = databaseFor(dbName)
  if (!db) {
    log.error(dbName, 'database not loaded for delete')
    event.sender.send('deleted', 'database not loaded')
    return
  }

  db.remove(conditions, options, (err, numRemoved) => {
    if (err) {
      log.error('delete error', err)
    }
    event.sender.send('deleted', err, numRemoved)
  })
})

ipcMain.on('update', (event, dbName, conditions, update, options) => {
  const db = databaseFor(dbName)
  if (!db) {
    log.error(dbName, 'database not loaded for update')
    event.sender.send('updated', 'database not loaded')
    return
  }

  db.update(conditions, update, options, (err, numReplaced) => {
    if (err) {
      log.error('update error', err)
    }
    event.sender.send('updated', err, numReplaced)
  })
})

ipcMain.on('insert', (event, dbName, rows) => {
  const db = databaseFor(dbName)
  if (!db) {
    log.error(dbName, 'database not loaded for insert')
    event.sender.send('inserted', 'database not loaded')
    return
  }

  db.insert(rows, (err, newRecords) => {
    if (err) {
      log.error('insert error', err)
    }
    event.sender.send('inserted', err, newRecords)
  })
})

ipcMain.on('find-latest', (event, dbName, conditions, sort) => {
  const db = databaseFor(dbName)
  if (!db) {
    log.error(dbName, 'database not loaded for find-latest')
    event.sender.send('found-latest', 'database not loaded')
    return
  }

  db.find(conditions).sort(sort).limit(1).exec((err, rows) => {
    if (err) {
      log.error('find-latest error', err)
    }
    event.sender.send('found-latest', err, rows)
  })
})
