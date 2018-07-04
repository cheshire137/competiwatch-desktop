import Database from './Database'

class Account {
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
}

export default Account
