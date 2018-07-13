import Database from './Database'
import Match from './Match'

class Account {
  static setupDatabase(env) {
    const db = Database.load(`accounts${env}`)
    db.ensureIndex({ fieldName: 'battletag', unique: true }, err => {
      if (err) {
        console.error('failed to add accounts.battletag index', err)
      }
    })
    return db
  }

  static findAll(db) {
    const sort = { battletag: 1 }
    return Database.findAll(db, sort)
                   .then(rows => rows.map(data => new Account(data)))
  }

  static find(db, id) {
    return Database.find(db, id).then(data => new Account(data))
  }

  constructor(data) {
    this.battletag = data.battletag
    this._id = data._id
  }

  latestMatch(dbMatches, season) {
    const conditions = { accountID: this._id, season: season }
    const sort = { date: -1, createdAt: -1 }
    return new Promise((resolve, reject) => {
      dbMatches.find(conditions).sort(sort).limit(1).exec((err, rows) => {
        if (err) {
          console.error('failed to load latest match', err)
          reject(err)
        } else {
          const data = rows[0]
          if (data) {
            resolve(new Match(data))
          } else {
            resolve()
          }
        }
      })
    })
  }

  hasMatches(dbMatches) {
    const conditions = { accountID: this._id }
    return Database.count(dbMatches, conditions).then(count => count > 0)
  }

  save(db) {
    const data = { battletag: this.battletag }
    return Database.upsert(db, data, this._id).then(newAccount => {
      this._id = newAccount._id
      if (newAccount.createdAt) {
        this.createdAt = newAccount.createdAt
      }
      return this
    })
  }

  delete(db) {
    return Database.delete(db, this._id, 'account')
  }
}

export default Account
