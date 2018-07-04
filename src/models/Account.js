import Database from './Database'

class Account {
  static setupDatabase() {
    const db = Database.load('accounts')
    db.ensureIndex({ fieldName: 'battletag', unique: false }, err => {
      if (err) {
        console.error('failed to add accounts.battletag index', err)
      }
    })
    return db
  }

  static findAll(db) {
    return Database.findAll(db, 'account').
      then(rows => rows.map(data => new Account(data)))
  }

  constructor(data) {
    this.battletag = data.battletag
    this._id = data._id
  }

  save(db) {
    const data = { battletag: this.battletag }
    Database.upsert(db, data, this._id, 'account').then(newAccount => {
      this._id = newAccount._id
    })
  }

  delete(db) {
    const options = {}
    db.remove({ _id: this._id }, options, (err, numRemoved) => {
      if (err) {
        console.error('failed to delete account', this._id)
      } else {
        console.log('deleted', numRemoved, 'account(s)')
      }
    })
  }
}

export default Account
